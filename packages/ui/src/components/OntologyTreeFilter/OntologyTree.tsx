import React, { Key, useState } from 'react';
import { BranchesOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip, Transfer, Tree } from 'antd';
import { debounce, isEmpty } from 'lodash';

import Empty from '../Empty';

import { IOntologyDataNode, IOntologyTreeData } from './type';
import {
    disableNodesInTree,
    filterChildrenKeysFromSelectedKeys as filterChildrenKeysFromTransferKeys,
    getChildrenKeysByKey,
    getChildrenTransferKeyByNode as getChildrenTransferKeyByNode,
    getKeysByTransferKeys,
    getSqonKeysAndChildrenKeys,
    ontologyTreeDataToOntologyDataNode,
    ontologyTreeToTransferData,
    searchInOntologyTree,
} from './utils';

import styles from './index.module.css';

enum Status {
    PRISTINE,
    SEARCHING,
}

export const DEFAULT_ONTOLOGY_TREE_DICTIONARY = {
    emptySelection: 'Select items from the left-hand panel in order to add to your query.',
    matchingCount: (count: number): string => `${count} matching items`,
    participantsCountTooltip: 'Participants with this exact term',
    participantsWithExactTermTooltip: 'Participants including descendant terms',
    searchPlaceholder: 'Search for ontology term  - Min 3 characters',
    selectedCount: (count: number): string => `${count} unique items`,
};

const DEBOUNCE_TIMEOUT = 200;
const MIN_SEARCH_TEXT_LENGTH = 3;

export type TreeNode = {
    title: string;
    key: string;
    hasChildren?: boolean;
    children: TreeNode[];
    results?: number;
    combinedResults?: number;
    exactTagCount?: number;
    hidden?: boolean;
    depth?: number;
    disabled?: boolean;
    value?: number;
    valueText: number;
    name: React.ReactElement | string;
};

export type TOntologyTreeDictionary = {
    participantsCountTooltip?: string;
    participantsWithExactTermTooltip?: string;
    searchPlaceholder?: string;
    emptySelection?: string;
    selectedCount?: (count: number) => string;
    matchingCount?: (count: number) => string;
};

type TOntologyTree = {
    total: number;
    data: IOntologyTreeData[];
    transferTargetKeys: string[];
    setTransferTargetKeys: (transferTargetKeys: string[]) => void;
    sqonTransferKeys: string[];
    dictionary?: TOntologyTreeDictionary;
};

/**
 * OntologyTree manage 2 data structures
 * - Transfer: An unique set of keys, all flatten and duplicate removed
 * - Tree: Contains all data and their unique node path (parent-chid relations)
 */
export const OntologyTree = ({
    data,
    dictionary = DEFAULT_ONTOLOGY_TREE_DICTIONARY,
    setTransferTargetKeys,
    sqonTransferKeys,
    total,
    transferTargetKeys,
}: TOntologyTree): JSX.Element => {
    const defaultTransferData = ontologyTreeToTransferData(data);
    const defaultTreeData = ontologyTreeDataToOntologyDataNode(data);
    const sqonValuesKeys = getKeysByTransferKeys(defaultTreeData[0], sqonTransferKeys);
    const sqonValuesChildrenKeys = getSqonKeysAndChildrenKeys(defaultTreeData[0], sqonValuesKeys);
    const [currentTreeData, setCurrentTreeData] = useState<IOntologyDataNode[]>(
        disableNodesInTree(defaultTreeData[0], sqonValuesChildrenKeys, sqonValuesKeys),
    );
    const rootNode = currentTreeData[0];
    const [treeExpandedKeys, setTreeExpandedKeys] = useState<string[]>(rootNode ? [rootNode.key] : []);
    const [treeTargetKeys, setTreeTargetKeys] = useState<Key[]>(sqonValuesChildrenKeys as Key[]);
    const [transferSelectedCount, setTransferSelectedCount] = useState<number>(total);
    const [status, setStatus] = useState<Status>(Status.PRISTINE);

    const onSearch = debounce((_, value) => {
        const transferKeysNodepath = getKeysByTransferKeys(currentTreeData[0], transferTargetKeys);
        if (value && value.length >= MIN_SEARCH_TEXT_LENGTH) {
            const results = searchInOntologyTree(defaultTreeData[0], value);
            setCurrentTreeData(disableNodesInTree(results.tree[0], treeTargetKeys as string[], transferKeysNodepath));
            setTreeExpandedKeys(results.keys);
            setTransferSelectedCount(results.selectedCount);
            setStatus(Status.SEARCHING);
            return;
        }
        setTreeExpandedKeys([rootNode.key]);
        setCurrentTreeData(disableNodesInTree(defaultTreeData[0], treeTargetKeys as string[], transferKeysNodepath));
        setTransferSelectedCount(total);
        setStatus(Status.PRISTINE);
    }, DEBOUNCE_TIMEOUT);

    const onTreeAction = (node: IOntologyDataNode) => {
        // Transfer update
        // Node.checked can be misleading since a parent can be "checked" but not in the transferKeys list
        // Transfer keys are managed with id e.g "furunculosis MONDO:0025419"
        const checked = !transferTargetKeys.some((key) => key === node.transferKey);
        const nodeChildrenTransferKeys = getChildrenTransferKeyByNode(node);
        let newTransferKeys = transferTargetKeys;
        if (checked) {
            newTransferKeys.push(node.transferKey);
        } else {
            newTransferKeys = newTransferKeys.filter((key) => key != node.transferKey);
        }
        // remove child of node
        newTransferKeys = newTransferKeys.filter((key) => !nodeChildrenTransferKeys.includes(key));

        // Tree update
        // Tree needs the complete key
        // "disease or disorder MONDO:0000001"{Separator}...{Separator}"furunculosis MONDO:0025419"
        const transferKeysNodepath = getKeysByTransferKeys(currentTreeData[0], newTransferKeys);
        const newTreeTargetKeys = filterChildrenKeysFromTransferKeys(transferKeysNodepath, node, checked);

        const checkedPath: string[] = [];
        newTreeTargetKeys.forEach((key) => {
            checkedPath.push(key);
            getChildrenKeysByKey(currentTreeData[0], key).forEach((childKey) => {
                checkedPath.push(childKey);
            });
        });

        // update state
        setCurrentTreeData(disableNodesInTree(rootNode, checkedPath as string[], transferKeysNodepath));
        setTreeTargetKeys(checkedPath);
        setTransferTargetKeys(newTransferKeys);
    };

    return (
        <Transfer
            className={styles.transfer}
            dataSource={defaultTransferData}
            locale={{
                notFoundContent: <Empty description={dictionary.emptySelection} imageType="grid" />,
                searchPlaceholder: dictionary.searchPlaceholder,
            }}
            onChange={(newTargetKeys: string[], _, moveKeys: string[]) => {
                // Since we only allow a single node to be deleted at the time
                const movedNodeKeys = getKeysByTransferKeys(currentTreeData[0], [moveKeys[0]])[0];
                const newTargetNodePath = getKeysByTransferKeys(currentTreeData[0], newTargetKeys);
                const selectedKeys = [movedNodeKeys, ...getChildrenKeysByKey(rootNode, movedNodeKeys)] as Key[];
                setTransferTargetKeys(newTargetKeys);
                const filteredTreeTargetKeys = treeTargetKeys.filter((e) => !selectedKeys.includes(e));
                setTreeTargetKeys(filteredTreeTargetKeys);
                setCurrentTreeData(disableNodesInTree(rootNode, filteredTreeTargetKeys as string[], newTargetNodePath));
            }}
            onSearch={onSearch}
            oneWay
            operationStyle={{ visibility: 'hidden', width: '5px' }}
            render={(item) => item.title!}
            selectAllLabels={[
                (_) => (
                    <>
                        {status === Status.PRISTINE &&
                            dictionary?.selectedCount &&
                            dictionary.selectedCount(transferSelectedCount)}
                        {status === Status.SEARCHING &&
                            dictionary?.matchingCount &&
                            dictionary.matchingCount(transferSelectedCount)}
                    </>
                ),
            ]}
            showSearch={!isEmpty(defaultTreeData)}
            showSelectAll={false}
            targetKeys={transferTargetKeys}
        >
            {({ direction }) => {
                if (direction === 'left') {
                    if (isEmpty(currentTreeData) || transferSelectedCount === 0) {
                        return <Empty imageType="grid" />;
                    }

                    return (
                        <>
                            <Row className={styles.treeNodeHeader} justify="space-between">
                                <Col></Col>
                                <Col>
                                    <Row className={styles.treeNodeParticipants}>
                                        <Col className={styles.treeNodeParticipantsCount} span={12}>
                                            <Tooltip title={dictionary.participantsWithExactTermTooltip}>
                                                <UserOutlined />
                                            </Tooltip>
                                        </Col>
                                        <Col className={styles.treeNodeParticipantsCount} span={12}>
                                            <Tooltip title={dictionary.participantsCountTooltip}>
                                                <BranchesOutlined />
                                            </Tooltip>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Tree
                                checkable
                                checkedKeys={treeTargetKeys}
                                expandedKeys={treeExpandedKeys}
                                height={600}
                                multiple
                                onCheck={(checked, e) => {
                                    onTreeAction(e.node);
                                }}
                                onExpand={(keys) => setTreeExpandedKeys(keys as string[])}
                                onSelect={(selected, e) => {
                                    onTreeAction(e.node);
                                }}
                                selectedKeys={[]} // should always be empty
                                treeData={currentTreeData}
                            />
                        </>
                    );
                }
            }}
        </Transfer>
    );
};

export default OntologyTree;
