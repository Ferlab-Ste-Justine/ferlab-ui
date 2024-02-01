import React, { useEffect, useState } from 'react';
import { FileTextOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, List, Modal, ModalFuncProps, Space, Tag, TreeSelect, Typography } from 'antd';
import { groupBy } from 'lodash';
import { LegacyDataNode } from 'rc-tree-select/lib/TreeSelect';

import { ICavaticaBulkImportData, ICavaticaProjects } from './type';

import styles from './CavaticaAnalyzeModal.module.scss';

export enum CAVATICA_TYPE {
    PROJECT = 'project',
    FILE = 'file',
    FOLDER = 'folder',
}

export const DEFAULT_CAVATICA_ANALYSE_MODAL_DICTIONARY: TCavaticaAnalyseModalDictionary = {
    copyFiles: 'Copy files',
    copyFilesTo: 'Copy files to...',
    createProjectToPushFileTo: 'Create a project to push your files to.',
    files: '{files} files',
    newProject: 'New project',
    ofFiles: '(out of {files} selected) to your Cavatica workspace.',
    title: 'Analyze in Cavatica',
    youAreAuthorizedToCopy: 'You are authorized to copy',
};

export interface ICavaticaTreeNode {
    href: string;
    name: string;
    id: string;
    pId: any;
    value: string;
    title: string;
    type: string;
    project?: string;
    isLeaf?: boolean;
}

export type TCavaticaAnalyseModalDictionary = {
    title: string;
    copyFiles: string;
    copyFilesTo: string;
    createProjectToPushFileTo: string;
    newProject: string;
    youAreAuthorizedToCopy: string;
    files: string;
    ofFiles: string;
};

export interface ICavaticaAnalyseModal extends ModalFuncProps {
    bulkImportData: ICavaticaBulkImportData;
    dictionary?: TCavaticaAnalyseModalDictionary;
    handleCreateProjectClick?: () => void;
    handleFilesAndFolders: (parentId: string, isProject: boolean) => any;
    handleSubmit: (value: ICavaticaTreeNode) => void;
    projects: ICavaticaProjects;
}

const aggregateFilesToStudy = (filesToCopy: any[]) =>
    Object.entries(groupBy(filesToCopy, 'study.study_id')).map((study) => ({
        nbFiles: study[1].length,
        title: study[1][0].study.study_name,
    }));

const CavaticaAnalyseModal = ({
    bulkImportData,
    dictionary = DEFAULT_CAVATICA_ANALYSE_MODAL_DICTIONARY,
    handleCreateProjectClick,
    handleFilesAndFolders,
    handleSubmit,
    projects,
    ...rest
}: ICavaticaAnalyseModal): JSX.Element => {
    const { authorizedFiles, files } = bulkImportData;
    const [selectedTreeNode, setSelectedTreeNode] = useState<ICavaticaTreeNode | undefined>();
    const [localProjectTree, setLocalProjectTree] = useState<ICavaticaTreeNode[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const NewProjectButton = () => (
        <Button icon={<PlusOutlined />} onClick={handleCreateProjectClick} size="small">
            {dictionary?.newProject}
        </Button>
    );

    const onLoadData = async (node: LegacyDataNode) => {
        const { data } = await handleFilesAndFolders(node.id, node.type === CAVATICA_TYPE.PROJECT);

        const childs =
            data?.items
                .filter(({ type }: { type: CAVATICA_TYPE }) => type !== CAVATICA_TYPE.FILE)
                .map((child: any) => ({
                    ...child,
                    pId: node.id,
                    title: child.name,
                    value: child.id,
                })) || [];

        setLocalProjectTree([...localProjectTree, ...childs]);
    };

    useEffect(() => {
        setLocalProjectTree(
            projects.data.map((project) => ({
                ...project,
                pId: 0,
                title: project.name,
                type: CAVATICA_TYPE.PROJECT,
                value: project.id,
            })),
        );
    }, [projects.data]);

    return (
        <Modal
            className={styles.cavaticaAnalyseModal}
            destroyOnClose
            okButtonProps={{ disabled: selectedTreeNode === undefined }}
            okText={dictionary.copyFiles}
            onOk={() => {
                if (selectedTreeNode) {
                    handleSubmit(selectedTreeNode);
                    setSelectedTreeNode(undefined);
                }
            }}
            title={dictionary?.title}
            wrapClassName={styles.cavaticaModalWrapper}
            {...rest}
        >
            <Space direction="vertical" size={24}>
                <Space className={styles.treeSelectorWrapper} direction="vertical" size={5}>
                    <Typography.Text strong>{dictionary?.copyFilesTo}</Typography.Text>
                    <TreeSelect
                        allowClear
                        className={styles.treeSelector}
                        dropdownRender={(menu) => (
                            <>
                                <div className={styles.cavaticaTreeDropdownMenu}>{menu}</div>
                                {localProjectTree.length > 0 && (
                                    <>
                                        <Divider className={styles.cavaticaTreeDropdownDivider} />
                                        <div className={styles.cavaticaTreeDropdownFooter}>
                                            <NewProjectButton />
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        loadData={onLoadData}
                        loading={bulkImportData.loading}
                        notFoundContent={
                            <Space align="center" className={styles.treeSelectEmpty} direction="vertical" size={16}>
                                <Typography.Text type="secondary">
                                    {dictionary.createProjectToPushFileTo}
                                </Typography.Text>
                                <NewProjectButton />
                            </Space>
                        }
                        onClear={() => {
                            setSelectedTreeNode(undefined);
                        }}
                        onDropdownVisibleChange={setDropdownOpen}
                        onSelect={(_: any, node: any /* ICavaticaTreeNode */) => {
                            setSelectedTreeNode(node);
                        }}
                        open={dropdownOpen}
                        placeholder="Select a project"
                        popupClassName={styles.cavaticaTreeDropdown}
                        showAction={['focus']}
                        showSearch
                        treeData={localProjectTree}
                        treeDataSimpleMode
                        value={selectedTreeNode?.value}
                    />
                </Space>
                <Typography.Text>
                    <Typography.Text>{dictionary.youAreAuthorizedToCopy}</Typography.Text>
                    <Tag className={styles.authorizedFilesTag} icon={<FileTextOutlined />}>
                        {dictionary?.files?.replace('{files}', `${authorizedFiles.length}`)}
                    </Tag>
                    <Typography.Text>{dictionary?.ofFiles?.replace('{files}', `${files.length}`)}</Typography.Text>
                </Typography.Text>
                <List
                    className={styles.studiesList}
                    dataSource={aggregateFilesToStudy(files)}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta description={<Typography.Text ellipsis>{item.title}</Typography.Text>} />
                            <Typography.Text type="secondary">
                                {item.nbFiles} <FileTextOutlined />
                            </Typography.Text>
                        </List.Item>
                    )}
                    size="small"
                />
            </Space>
        </Modal>
    );
};

export default CavaticaAnalyseModal;
