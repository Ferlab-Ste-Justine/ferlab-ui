import React from 'react';
import { TransferItem } from 'antd/lib/transfer';

import { ISqonGroupFilter } from '../../data/sqon/types';
import { findSqonValueByField } from '../../data/sqon/utils';

import OntologyTreeTitle from './OntologyTreeTitle';
import { ILegacyOntologyTreeData, IOntologyDataNode, IOntologyTreeData } from './type';

export const EXCLUDED_KEYS = ['(MONDO:0042489)', '(HP:0000001)'];
export const MATCH_SPECIAL_CHARACTERS_REGEX = /[\\^$*+?.()|[\]{}]/g;
export const TITLE_AND_CODE_REGEX = /^(.+?)\s*(\([Mondo:|HP:][^)]+\))/gi;
export const CODE_REGEX = /(MONDO:|HP:)/g;
export const CODE_PREFIX_REGEX = /(MONDO|HP)/gi;
export const HP_CODE = 'hp:';
export const MONDO_CODE = 'mondo:';
export const ROOT_NODE_CODE = /(MONDO:0000001|HP:0000118)/g;

/**
 * Map server's responsive to contains both parent and child reference
 * @param data
 * @returns
 */
export const legacyToNewOntologyTreeData = (data: ILegacyOntologyTreeData[]): IOntologyTreeData[] => {
    const result: IOntologyTreeData[] = [];
    data.forEach((parent) => {
        if (EXCLUDED_KEYS.some((excludedKey) => parent.key.includes(excludedKey))) {
            return;
        }

        const children: string[] = [];
        data.forEach((child) => {
            if (child.top_hits.parents.includes(parent.key)) {
                children.push(child.key);
            }
        });

        result.push({
            doc_count: parent.doc_count,
            filter_by_term: parent.filter_by_term,
            key: parent.key,
            top_hits: {
                children,
                parents: parent.top_hits.parents,
            },
        });
    });

    return result;
};

/**
 * Recursive algorithm to create a compatible Tree compatible node list
 * @param data
 * @returns
 */
export const ontologyTreeDataToOntologyDataNode = (data: IOntologyTreeData[]): IOntologyDataNode[] => {
    const rootOntologyNode = data.find((node) => node.key.search(ROOT_NODE_CODE) != -1);
    if (!rootOntologyNode) {
        return [];
    }

    const recursiveNodeCreate = (node: IOntologyTreeData, parentNodePath: string): IOntologyDataNode[] => {
        const result: IOntologyDataNode[] = [];
        node.top_hits.children.forEach((key) => {
            const child = data.find((e) => e.key === key);
            if (!child) return;

            const participantsCount = child.doc_count ?? 0;
            const participantsWithExactTerm = child.filter_by_term?.doc_count ?? 0;
            const nodePath =
                parentNodePath.length > 0 ? cleanNodeKey(`${parentNodePath}-${child.key}`) : cleanNodeKey(child.key);

            result.push({
                children: recursiveNodeCreate(child, nodePath),
                key: nodePath,
                name: child.key,
                participantsCount,
                participantsWithExactTerm,
                path: parentNodePath ?? '',
                title: (
                    <OntologyTreeTitle
                        name={child.key}
                        participantsCount={participantsCount}
                        participantsWithExactTerm={participantsWithExactTerm}
                    />
                ),
            });
        });
        return result;
    };

    const participantsCount = rootOntologyNode.doc_count ?? 0;
    const participantsWithExactTerm = rootOntologyNode.filter_by_term?.doc_count ?? 0;
    const rootNode = {
        children: recursiveNodeCreate(rootOntologyNode, cleanNodeKey(rootOntologyNode.key)),
        key: cleanNodeKey(rootOntologyNode.key),
        name: rootOntologyNode.key,
        participantsCount,
        participantsWithExactTerm,
        path: '',
        title: (
            <OntologyTreeTitle
                name={rootOntologyNode.key}
                participantsCount={participantsCount}
                participantsWithExactTerm={participantsWithExactTerm}
            />
        ),
    } as IOntologyDataNode;

    return [rootNode];
};

/**
 * Recursive algorithm to create a compatible Transfer compatible item list
 * @param data
 * @returns
 */
export const ontologyTreeToTransferData = (data: IOntologyTreeData[]): TransferItem[] => {
    const rootOntologyNode = data.find((node) => node.key.search(ROOT_NODE_CODE) != -1);
    if (!rootOntologyNode) {
        return [];
    }

    const transferData: TransferItem[] = [];

    const recursive = (node: IOntologyTreeData, parentNodePath: string): IOntologyDataNode[] => {
        const result: IOntologyDataNode[] = [];
        node.top_hits.children.forEach((key) => {
            const child = data.find((e) => e.key === key);
            if (!child) return;
            const nodePath =
                parentNodePath.length > 0 ? cleanNodeKey(`${parentNodePath}-${child.key}`) : cleanNodeKey(child.key);

            // Transfer Data
            transferData.push({
                key: nodePath,
                title: child.key,
            });

            recursive(child, nodePath);
        });
        return result;
    };

    recursive(rootOntologyNode, cleanNodeKey(rootOntologyNode.key));
    transferData.push({
        key: cleanNodeKey(rootOntologyNode.key),
        title: rootOntologyNode.key,
    });

    return transferData;
};

/**
 * sqonValues only contains the node keys, we needs to children to mark them as checked
 * @param rootNode
 * @param sqonValues
 * @returns
 */
export const getSqonValuesChildrenKeys = (rootNode: IOntologyDataNode, sqonValues: string[]): string[] => {
    const result: string[] = [];
    sqonValues.forEach((key) => {
        result.push(key);
        getChildrenKeysByKey(rootNode, key).forEach((childrenKey) => {
            result.push(childrenKey);
        });
    });

    return result;
};

/**
 * Recursive algorithm in 2 steps
 * 1. Create an index with all node that has the query in his name
 * 2. Add parent of those nodes to the result
 * 3. Remove all unmatching nodes
 * @param rootNode
 * @param query
 * @returns
 */
export const searchInOntologyTree = (
    rootNode: IOntologyDataNode,
    query: string,
): {
    tree: IOntologyDataNode[];
    keys: string[];
    selectedCount: number;
} => {
    const cleanSearchText = query.replace(MATCH_SPECIAL_CHARACTERS_REGEX, '').replace(/\s+/g, '\\s*');
    const searchRegex = new RegExp('(\\b\\w*' + cleanSearchText.split(' ').join('\\s*\\w*') + '\\w*\\b)', 'gi');
    const keys: string[] = [];
    const tree: IOntologyDataNode[] = [];

    const allNodeKeys: string[] = [];
    let matchingAll: string[] = [];
    const matchingNodePaths: string[] = [];
    const matchingNodes: string[] = [];
    let matchingExact = 0;

    const recursiveSearch = (node: IOntologyDataNode): IOntologyDataNode[] => {
        const results: IOntologyDataNode[] = [];
        allNodeKeys.push(node.key);
        node.children.forEach((child) => {
            const hasSearchTerm = child.key.search(searchRegex) >= 0;
            if (hasSearchTerm) {
                keys.push(child.key);
                matchingNodes.push(child.key);
            }

            results.push({
                ...child,
                children: recursiveSearch(child),
            });
        });

        return results;
    };

    const recursiveIndexSearch = (node: IOntologyDataNode): IOntologyDataNode[] => {
        const results: IOntologyDataNode[] = [];
        allNodeKeys.push(node.key);
        node.children.forEach((child) => {
            const [before, term, after] = cleanNodeKey(child.name).split(searchRegex);

            if (term) {
                matchingExact += 1;
            }

            results.push({
                ...child,
                children: recursiveIndexSearch(child),
                hasSearchTerm: matchingAll.includes(child.key),
                title: (
                    <OntologyTreeTitle
                        name={child.name}
                        participantsCount={child.participantsCount}
                        participantsWithExactTerm={child.participantsWithExactTerm}
                        searchTerm={term ? { after, before, query, regex: cleanSearchText, term } : undefined}
                    />
                ),
            });
        });

        return results.filter((result) => result.hasSearchTerm);
    };

    // Populate index with matching node
    recursiveSearch(rootNode);

    // Add all node path to the search results
    matchingNodes.forEach((nodeKey) => {
        const nodePaths = nodeKey.split('-');
        nodePaths.pop();
        const currentNodePath: string[] = [];

        nodePaths.forEach((path) => {
            currentNodePath.push(path);
            const result = allNodeKeys.find((node) => node === currentNodePath.join('-'));
            if (result) {
                matchingNodePaths.push(result);
                keys.push(result);
            }
        });
    });

    // Concat both results
    matchingAll = matchingNodes.concat(matchingNodePaths);

    if (matchingAll.length === 0) {
        return {
            keys: [],
            selectedCount: 0,
            tree: [rootNode],
        };
    }

    // Update tree with matching index
    const [before, term, after] = rootNode.name.split(searchRegex);
    keys.push(rootNode.key);
    tree.push({
        ...rootNode,
        children: recursiveIndexSearch(rootNode),
        title: (
            <OntologyTreeTitle
                name={rootNode.name}
                participantsCount={rootNode.participantsCount}
                participantsWithExactTerm={rootNode.participantsWithExactTerm}
                searchTerm={term ? { after, before, query, regex: cleanSearchText, term } : undefined}
            />
        ),
    });

    return {
        keys,
        selectedCount: matchingExact,
        tree,
    };
};

/**
 * Recursive algorithme that disabled all checked nodes except the one in the transfer component
 * @param rootNode
 * @param disabledKeys
 * @param enabledKeys
 * @returns
 */
export const disableNodesInTree = (
    rootNode: IOntologyDataNode,
    disabledKeys: string[],
    enabledKeys: string[],
): IOntologyDataNode[] => {
    if (!rootNode) {
        return [];
    }

    const recursive = (node: IOntologyDataNode): IOntologyDataNode[] => {
        const results: IOntologyDataNode[] = [];
        node.children.forEach((child) => {
            if (disabledKeys.includes(child.key) && !enabledKeys.includes(child.key)) {
                results.push({
                    ...child,
                    children: recursive(child),
                    disableCheckbox: true,
                    disabled: true,
                });
                return;
            }
            results.push({
                ...child,
                children: recursive(child),
                disableCheckbox: false,
                disabled: false,
            });
        });

        return results;
    };

    return [
        {
            ...rootNode,
            children: recursive(rootNode),
        },
    ];
};

/**
 * To sync both Transfer and Tree, a Recursive algorithm must be used to get all
 * the child key of node
 * @param node
 * @returns
 */
export const getChildrenKeysByNode = (node: IOntologyDataNode): string[] => {
    if (!node) return [];
    const keys: string[] = [];
    const recursive = (node: IOntologyDataNode) => {
        keys.push(node.key);

        node.children.forEach((child) => {
            recursive(child);
        });
    };

    node.children.forEach((child) => {
        recursive(child);
    });

    return keys;
};

/**
 * When removing a node from a Transfert component, we lost the node's reference. It must found in the
 * Tree structure to call getChildrenKeysByNode
 * @param rootNode
 * @param key
 * @returns
 */
export const getChildrenKeysByKey = (rootNode: IOntologyDataNode, key: string): string[] => {
    if (!rootNode) return [];
    if (rootNode.key === key) return getChildrenKeysByNode(rootNode);

    let targetNode: IOntologyDataNode;
    let result: string[] = [];

    const recursive = (node: IOntologyDataNode) => {
        if (node.key === key) {
            targetNode = node;
            result = getChildrenKeysByNode(targetNode);
            return;
        }

        if (!targetNode && result.length === 0) {
            node.children.forEach((child) => {
                recursive(child);
            });
        }
    };

    rootNode.children.forEach((child) => {
        recursive(child);
    });

    return result;
};

/**
 * Filter transfer keys
 * @param keys
 * @param node
 * @param childrenKeys
 * @returns
 */
export const filterTransferTargetKeys = (keys: string[], node: IOntologyDataNode, childrenKeys: string[]): string[] => {
    if (keys.includes(node.key)) {
        return keys.filter((key) => key != node.key);
    }

    const keysToRemove: string[] = [];
    keys.forEach((key) => {
        if (childrenKeys.includes(key)) {
            keysToRemove.push(key);
        }
    });

    return [...keys.filter((key) => !keysToRemove.includes(key)), node.key];
};

/**
 * Convert transfert key to a search query friendly array
 * @param keys
 * @returns
 */
export const flattenTransferTargetKeys = (keys: string[]): string[] => {
    const result: string[] = [];
    keys.map((key) => {
        const phenotype = key.split('-').pop();
        if (phenotype) {
            result.push(rebuildNodeKey(phenotype));
        }
    });

    return result;
};

/**
 * Extract title and code
 * e.g. Abnormal nervous system physiology (HP:0012638)
 * title: Abnormal nervous system physiology
 * code: (HP:0012638)
 * @param value
 * @returns
 */
export const extractCodeAndTitle = (value: string): { code: string; title: string } => {
    const result = value.split(TITLE_AND_CODE_REGEX).filter((v) => v.length > 0);
    return {
        code: result[1],
        title: result[0],
    };
};

/**
 * Remove special character
 * e.g. Abnormal nervous system physiology (HP:0012638)
 * result: Abnormal nervous system physiology HP:0012638
 * @param key
 * @returns
 */
export const cleanNodeKey = (key: string): string => key.replaceAll(MATCH_SPECIAL_CHARACTERS_REGEX, '');

/**
 * Rebuild key from xxxxx-xxxx to xxxxx (xxxxx)
 * @param key
 */
export const rebuildNodeKey = (key: string): string => {
    const codeIndex = key.search(CODE_REGEX);
    return `${key.slice(0, codeIndex)}(${key.slice(codeIndex)})`;
};

/**
 * @param sqon
 * @param field
 * @returns
 */
export const getOntologySqonValues = (data: IOntologyTreeData[], sqon: ISqonGroupFilter, field: string): string[] => {
    const defaultTransferData = ontologyTreeToTransferData(data);
    const result: string[] = [];
    const sqonTransferKeys = (findSqonValueByField(`${field}.name`, sqon) ?? []).map((key: string) =>
        cleanNodeKey(key),
    ) as string[];

    defaultTransferData.forEach((transferData) => {
        sqonTransferKeys.forEach((sqonTransferKey) => {
            if (cleanNodeKey(transferData.title ?? '') === sqonTransferKey) {
                result.push(transferData.key ?? '');
            }
        });
    });

    return result;
};
