import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Modal, Skeleton, Space } from 'antd';
import { isEmpty } from 'lodash';
import { MenuInfo } from 'rc-menu/lib/interface';

import { TermOperators } from '../../data/sqon/operators';
import { ISqonGroupFilter } from '../../data/sqon/types';
import Empty from '../Empty';

import OntologyTree, { DEFAULT_ONTOLOGY_TREE_DICTIONARY, TOntologyTreeDictionary } from './OntologyTree';
import { ILegacyOntologyTreeData } from './type';
import { getSqonTransferKeys, legacyToNewOntologyTreeData, rebuildTransferTargetKeys } from './utils';

import styles from './index.module.css';

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
    field: string;
    handleCancel: () => void;
    handleOnApply: (value: string[], operator: TermOperators) => void;
    sqon: ISqonGroupFilter;
    dictionary?: TOntologyTreeModalDictionary;
};

const OntologyTreeModal = ({
    data,
    dictionary = DEFAULT_ONTOLOGY_TREE_MODAL_DICTIONARY,
    field,
    handleCancel,
    handleOnApply,
    loading,
    open,
    sqon,
}: TOntologyTreeFilter): JSX.Element => {
    const newOntologyData = legacyToNewOntologyTreeData(data);
    const sqonTransferKeys = getSqonTransferKeys(newOntologyData, sqon, field);
    const [transferTargetKeys, setTransferTargetKeys] = useState<string[]>(sqonTransferKeys);

    useEffect(() => {
        setTransferTargetKeys(getSqonTransferKeys(newOntologyData, sqon, field));
    }, [sqon]);

    return (
        <Modal
            className={styles.modal}
            destroyOnClose
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
                                handleOnApply(rebuildTransferTargetKeys(transferTargetKeys), e.key as TermOperators),
                        }}
                        onClick={() => handleOnApply(rebuildTransferTargetKeys(transferTargetKeys), TermOperators.in)}
                        type="primary"
                    >
                        {dictionary.okText}
                    </Dropdown.Button>
                </Space>,
            ]}
            onCancel={(e) => {
                e.stopPropagation();

                handleCancel();
            }}
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
                    sqonTransferKeys={sqonTransferKeys}
                    total={data.length - 1 ?? 0}
                    transferTargetKeys={transferTargetKeys}
                />
            )}
        </Modal>
    );
};

export default OntologyTreeModal;
