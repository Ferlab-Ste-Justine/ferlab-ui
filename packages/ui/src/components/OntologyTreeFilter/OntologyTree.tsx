import React, { Key, useState } from 'react';
import { BranchesOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip, Transfer, Tree } from 'antd';
import { debounce, isEmpty } from 'lodash';

import Empty from '../Empty';

import { IOntologyDataNode, IOntologyTreeData } from './type';
import {
    disableNodesInTree,
    filterTransferTargetKeys,
    getChildrenKeysByKey,
    getChildrenKeysByNode,
    ontologyTreeDataToOntologyDataNode,
    ontologyTreeToTransferData,
    searchInOntologyTree,
} from './utils';

import styles from './index.module.scss';

export const DEFAULT_ONTOLOGY_TREE_DICTIONARY = {
    emptySelection: 'Select items from the left-hand panel in order to add to your query.',
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
};

type TOntologyTree = {
    total: number;
    data: IOntologyTreeData[];
    transferTargetKeys: string[];
    setTransferTargetKeys: (transferTargetKeys: string[]) => void;
    dictionary?: TOntologyTreeDictionary;
};

export const OntologyTree = ({
    data,
    dictionary = DEFAULT_ONTOLOGY_TREE_DICTIONARY,
    setTransferTargetKeys,
    total,
    transferTargetKeys,
}: TOntologyTree): JSX.Element => {
    const defaultTransferData = ontologyTreeToTransferData(data);
    const defaultTreeData = ontologyTreeDataToOntologyDataNode(data);
    const [currentTreeData, setCurrentTreeData] = useState<IOntologyDataNode[]>(defaultTreeData);
    const rootNode = currentTreeData[0];
    const [treeExpandedKeys, setTreeExpandedKeys] = useState<string[]>(rootNode ? [rootNode.key] : []);
    const [treeTargetKeys, setTreeTargetKeys] = useState<Key[]>([]);
    const [transferSelectedCount, setTransferSelectedCount] = useState<number>(total);

    const onSearch = debounce((_, value) => {
        if (value && value.length >= MIN_SEARCH_TEXT_LENGTH) {
            const results = searchInOntologyTree(defaultTreeData[0], value);
            setCurrentTreeData(disableNodesInTree(results.tree[0], treeTargetKeys as string[], transferTargetKeys));
            setTreeExpandedKeys(results.keys);
            setTransferSelectedCount(results.selectedCount);
            return;
        }
        setTreeExpandedKeys([rootNode.key]);
        setCurrentTreeData(disableNodesInTree(defaultTreeData[0], treeTargetKeys as string[], transferTargetKeys));
        setTransferSelectedCount(total);
    }, DEBOUNCE_TIMEOUT);

    const onTreeAction = (node: IOntologyDataNode) => {
        // does the current node is the parent of an already selected node ?
        const childrenKeys = getChildrenKeysByNode(node);
        const selectedKeys = [node.key, ...childrenKeys] as Key[];
        const checked = node.checked
            ? treeTargetKeys.filter((e) => !selectedKeys.includes(e))
            : treeTargetKeys.concat(selectedKeys);
        const updatedTransferTargetKeys = filterTransferTargetKeys(transferTargetKeys, node, childrenKeys);

        setCurrentTreeData(disableNodesInTree(rootNode, checked as string[], updatedTransferTargetKeys));
        setTreeTargetKeys(checked);
        setTransferTargetKeys(updatedTransferTargetKeys);
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
                const selectedKeys = [moveKeys[0], ...getChildrenKeysByKey(rootNode, moveKeys[0])] as Key[];
                setTransferTargetKeys(newTargetKeys);
                setTreeTargetKeys(treeTargetKeys.filter((e) => !selectedKeys.includes(e)));
            }}
            onSearch={onSearch}
            oneWay
            operationStyle={{ visibility: 'hidden', width: '5px' }}
            render={(item) => item.title!}
            selectAllLabels={[
                (_) => (
                    <>
                        {dictionary.selectedCount
                            ? dictionary.selectedCount(transferSelectedCount)
                            : transferSelectedCount}
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
