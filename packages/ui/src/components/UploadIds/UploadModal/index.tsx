import React, { useEffect, useState } from 'react';
import { PaperClipOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Input, Modal, PopoverProps, Space, Spin, Tabs, Typography, Upload } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { difference, get, isEmpty, uniq, uniqBy, without } from 'lodash';

import useDebounce from '../../../hooks/useDebounce';
import Collapse, { CollapsePanel } from '../../Collapse';
import ProLabel from '../../ProLabel';
import { MatchTableItem, TFetchMatchFunc, TOnUpload, UnmatchTableItem, UploadIdDictionary } from '../types';

import MatchTable from './MatchTable';
import UnmatchTable from './UnmatchTable';

import styles from './index.module.scss';

interface OwnProps {
    width?: number;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    dictionary: UploadIdDictionary;
    popoverProps?: PopoverProps;
    placeHolder: string;
    onUpload: TOnUpload;
    /** Comma separated string. Ex.: '.txt, .csv' */
    mimeTypes?: string;
    fetchMatch: TFetchMatchFunc;
    limitItem?: number;
}

const defaultRenderMatchTabTitle = (matchCount: number) => `Matched (${matchCount})`;
const defaultRenderUnmatchTabTitle = (unmatchCount: number) => `Unmatched (${unmatchCount})`;
const defaultRenderCollapseTitle = (matchCount: number, unmatchCount: number) =>
    `Summary Table (${matchCount} matched, ${unmatchCount} unmatched)`;
const defaultTablesMessage = (submittedCount: number, mappedCount: number) =>
    `${submittedCount} submitted identifiers mapped to ${mappedCount} unique system identifiers`;

const UploadModal = ({
    dictionary,
    fetchMatch,
    limitItem,
    mimeTypes = '.txt, .csv, .tsv',
    onUpload,
    placeHolder,
    popoverProps,
    setVisible,
    visible,
    width = 945,
}: OwnProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [match, setMatch] = useState<MatchTableItem[] | undefined>(undefined);
    const [unmatch, setUnmatch] = useState<UnmatchTableItem[] | undefined>(undefined);
    const debouncedValue = useDebounce(value, 500);

    const getRawValueList = () => value.split(/[\n,\r ]/).filter((val) => !!val);
    const getValueList = () => uniq(getRawValueList());

    const getUnmatchList = (results: MatchTableItem[]) =>
        difference(
            getValueList(),
            results.map((item) => item.submittedId),
        ).map((id, index) => ({
            key: index,
            submittedId: id,
        }));

    const getMatchToCount = (match: MatchTableItem[]) =>
        without(
            uniqBy(match, ({ matchTo }) => matchTo).map(({ matchTo }) => matchTo),
            undefined,
        ).length;

    const getSubmittedIdsCount = (match: MatchTableItem[]) =>
        without(
            uniqBy(match, ({ submittedId }) => submittedId).map(({ submittedId }) => submittedId),
            undefined,
        ).length;

    const onClear = () => {
        setUnmatch(undefined);
        setMatch(undefined);
        setValue('');
        setFileList([]);
    };

    useEffect(() => {
        if (debouncedValue) {
            (async () => {
                setIsLoading(true);
                const results = await fetchMatch(getValueList());
                setMatch(results);
                setUnmatch(getUnmatchList(results));
                setIsLoading(false);
            })();
        } else {
            onClear();
        }
        // eslint-disable-next-line
    }, [debouncedValue]);

    const isMaximumItemsReached = () => {
        if (limitItem) {
            return getRawValueList().length > limitItem;
        }
        return false;
    };
    return (
        <Modal
            cancelText={get(dictionary, 'modalCancelText', 'Cancel')}
            destroyOnClose
            okButtonProps={{ disabled: !match?.length || isMaximumItemsReached() }}
            okText={get(dictionary, 'modalOkText', 'Upload')}
            onCancel={() => {
                setVisible(false);
                setValue('');
            }}
            onOk={() => {
                setVisible(false);
                setValue('');
                onUpload(match ?? []);
            }}
            title={dictionary.modalTitle}
            visible={visible}
            width={width}
            wrapClassName={styles.fuiUploadIdsModalWrapper}
        >
            <Space className={styles.space} direction="vertical">
                <ProLabel
                    popoverProps={popoverProps}
                    title={get(dictionary, 'inputLabel', 'Copy-paste a list of identifiers or upload a file') as string}
                />
                <Space className={styles.space} direction="vertical" size={12}>
                    <Space className={styles.space} direction="vertical" size={2}>
                        <Input.TextArea
                            onChange={(e) => setValue(e.target.value)}
                            placeholder={placeHolder}
                            rows={4}
                            status={isMaximumItemsReached() ? 'error' : undefined}
                            value={value}
                        />
                        {isMaximumItemsReached() && (
                            <Typography.Text type="danger">{`${get(
                                dictionary,
                                'inputLimitError',
                                'Maximum',
                            )} ${limitItem} ${get(
                                dictionary,
                                'inputLimitErrorText',
                                'items allowed per upload',
                            )}`}</Typography.Text>
                        )}
                    </Space>
                    <Space>
                        <Upload
                            accept={mimeTypes}
                            beforeUpload={async (file) => {
                                const fileContent = await file.text();
                                setValue(`${value ? value + '\n' : value}${fileContent}`);
                                return false;
                            }}
                            className={styles.upload}
                            fileList={fileList}
                            multiple={true}
                            onChange={(info) => setFileList(info.fileList)}
                            showUploadList={false}
                        >
                            <Button icon={<UploadOutlined />}>
                                {get(dictionary, 'modalUploadBtnText', 'Upload a File')}
                            </Button>
                        </Upload>
                        {isEmpty(match) ? null : (
                            <Button onClick={onClear} type="text">
                                {get(dictionary, 'clear', 'Clear')}
                            </Button>
                        )}
                    </Space>
                    <Space direction="vertical" size={0}>
                        {fileList.map((file) => (
                            <Space className={styles.ListItem} key={file.name + file.size}>
                                <Typography.Text
                                    className={
                                        !isMaximumItemsReached()
                                            ? `${styles.ListItemText} ${styles.ListItemDefault}`
                                            : styles.ListItemText
                                    }
                                    type={isMaximumItemsReached() ? 'danger' : undefined}
                                >
                                    <PaperClipOutlined className={styles.paperClipIcon} />
                                    {file.name}
                                </Typography.Text>
                            </Space>
                        ))}
                    </Space>
                </Space>
            </Space>
            {!isMaximumItemsReached() ? (
                <Spin spinning={isLoading}>
                    {match && unmatch ? (
                        <Collapse className={styles.matchUnmatch}>
                            <CollapsePanel
                                className={styles.collapsePanel}
                                header={
                                    dictionary.collapseTitle
                                        ? dictionary.collapseTitle(match.length, unmatch.length)
                                        : defaultRenderCollapseTitle(match.length, unmatch.length)
                                }
                                key="match-unmatch-ids"
                            >
                                <Typography className={styles.tablesMessages}>
                                    {dictionary.tablesMessage
                                        ? dictionary.tablesMessage(getRawValueList().length, getMatchToCount(match))
                                        : defaultTablesMessage(getRawValueList().length, getMatchToCount(match))}
                                </Typography>
                                {isEmpty(unmatch) ? (
                                    <MatchTable dictionary={dictionary} matchItems={match} />
                                ) : (
                                    <Tabs className={styles.tabs} defaultActiveKey="matched" size="small">
                                        <Tabs.TabPane
                                            key="matched"
                                            tab={
                                                dictionary.matchTabTitle
                                                    ? dictionary.matchTabTitle(match.length)
                                                    : defaultRenderMatchTabTitle(match.length)
                                            }
                                        >
                                            <MatchTable dictionary={dictionary} matchItems={match} />
                                        </Tabs.TabPane>
                                        <Tabs.TabPane
                                            key="unmatched"
                                            tab={
                                                dictionary.unmatchTabTitle
                                                    ? dictionary.unmatchTabTitle(unmatch.length)
                                                    : defaultRenderUnmatchTabTitle(unmatch.length)
                                            }
                                        >
                                            <UnmatchTable dictionary={dictionary} unmatchItems={unmatch} />
                                        </Tabs.TabPane>
                                    </Tabs>
                                )}
                            </CollapsePanel>
                        </Collapse>
                    ) : null}
                </Spin>
            ) : null}
        </Modal>
    );
};

export default UploadModal;
