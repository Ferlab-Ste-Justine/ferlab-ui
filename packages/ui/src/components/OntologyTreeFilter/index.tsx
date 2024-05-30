import React, { useState } from 'react';
import { Button, Dropdown, Modal, Skeleton, Space, Spin } from 'antd';
import { isEmpty } from 'lodash';
import { MenuInfo } from 'rc-menu/lib/interface';

import { TermOperators } from '../../data/sqon/operators';
import Empty from '../Empty';

import OntologyTree, { DEFAULT_ONTOLOGY_TREE_DICTIONARY, TOntologyTreeDictionary } from './OntologyTree';
import { ILegacyOntologyTreeData } from './type';
import { flattenTransferTargetKeys, legacyToNewOntologyTreeData } from './utils';

import styles from './index.module.scss';

export const DEFAULT_ONTOLOGY_TREE_MODAL_DICTIONARY = {
    allOf: 'All of',
    anyOf: 'Any of',
    cancelText: 'Cancel',
    noneOf: 'None of',
    okText: 'Apply',
    title: 'Observed Phenotype (HPO) Browser',
    tree: DEFAULT_ONTOLOGY_TREE_DICTIONARY,
};

type TOntologyTreeModalDictionary = {
    title: string;
    okText: string;
    cancelText: string;
    anyOf: string;
    allOf: string;
    noneOf: string;
    tree: TOntologyTreeDictionary;
};

type TOntologyTreeFilter = {
    open: boolean;
    data: ILegacyOntologyTreeData[];
    loading: boolean;
    handleCancel: () => void;
    handleOnApply: (value: string[], operator: TermOperators) => void;
    dictionary?: TOntologyTreeModalDictionary;
};

const OntologyTreeModal = ({
    data,
    dictionary = DEFAULT_ONTOLOGY_TREE_MODAL_DICTIONARY,
    handleCancel,
    handleOnApply,
    loading,
    open,
}: TOntologyTreeFilter): JSX.Element => {
    const [transferTargetKeys, setTransferTargetKeys] = useState<string[]>([]);
    const newOntologyData = legacyToNewOntologyTreeData(data);

    return (
        <Modal
            className={styles.modal}
            footer={[
                <Space key="tree-modal-actions">
                    <Button onClick={handleCancel}>{dictionary?.cancelText}</Button>
                    <Dropdown.Button
                        menu={{
                            items: [
                                {
                                    key: TermOperators.in,
                                    label: dictionary.anyOf,
                                },
                                {
                                    key: TermOperators.all,
                                    label: dictionary.allOf,
                                },
                                {
                                    key: TermOperators['some-not-in'],
                                    label: dictionary.noneOf,
                                },
                            ],
                            onClick: (e: MenuInfo) =>
                                handleOnApply(flattenTransferTargetKeys(transferTargetKeys), e.key as TermOperators),
                        }}
                        onClick={() => handleOnApply(flattenTransferTargetKeys(transferTargetKeys), TermOperators.in)}
                        type="primary"
                    >
                        {dictionary.okText}
                    </Dropdown.Button>
                </Space>,
            ]}
            onCancel={handleCancel}
            open={open}
            title={dictionary.title}
            wrapClassName={styles.modalWrapper}
        >
            {loading && (
                <div className={styles.loading}>
                    <div className={styles.skeleton}>
                        <Skeleton active paragraph={{ rows: 20 }} title />
                    </div>
                    <div className={styles.skeleton}>
                        <Skeleton active paragraph={{ rows: 20 }} title />
                    </div>
                </div>
            )}

            {!loading && isEmpty(data) && (
                <div className={styles.loading}>
                    <Empty imageType="grid" />
                </div>
            )}

            {!loading && !isEmpty(data) && (
                <OntologyTree
                    data={newOntologyData}
                    dictionary={dictionary.tree}
                    setTransferTargetKeys={setTransferTargetKeys}
                    total={data.length - 1 ?? 0}
                    transferTargetKeys={transferTargetKeys}
                />
            )}
        </Modal>
    );
};

export default OntologyTreeModal;
