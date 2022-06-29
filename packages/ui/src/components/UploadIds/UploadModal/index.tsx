import React, { useEffect, useState } from 'react';
import { PaperClipOutlined, UploadOutlined } from '@ant-design/icons';
import Collapse, { CollapsePanel } from '../../Collapse';
import { Button, Input, Modal, PopoverProps, Space, Spin, Tabs, Typography, Upload } from 'antd';
import { difference, get, isEmpty, uniq, uniqBy, without } from 'lodash';
import { MatchTableItem, TFetchMatchFunc, TOnUpload, UnmatchTableItem, UploadIdDictionary } from '../types';
import MatchTable from './MatchTable';
import UnmatchTable from './UnmatchTable';
import ProLabel from '../../ProLabel';
import useDebounce from '../../../hooks/useDebounce';

import styles from '@ferlab/style/components/uploadids/UploadIdsModal.module.scss';
import { UploadFile } from 'antd/lib/upload/interface';

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
}

const defaultRenderMatchTabTitle = (matchCount: number) => `Matched (${matchCount})`;
const defaultRenderUnmatchTabTitle = (unmatchCount: number) => `Unmatched (${unmatchCount})`;
const defaultRenderCollapseTitle = (matchCount: number, unmatchCount: number) =>
    `Summary Table (${matchCount} matched, ${unmatchCount} unmatched)`;
const defaultTablesMessage = (submittedCount: number, mappedCount: number) =>
    `${submittedCount} submitted identifiers mapped to ${mappedCount} unique system identifiers`;

const UploadModal = ({
    width = 945,
    visible,
    setVisible,
    dictionary,
    popoverProps,
    placeHolder,
    onUpload,
    fetchMatch,
    mimeTypes = '.txt, .csv, .tsv',
}: OwnProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [match, setMatch] = useState<MatchTableItem[] | undefined>(undefined);
    const [unmatch, setUnmatch] = useState<UnmatchTableItem[] | undefined>(undefined);
    const debouncedValue = useDebounce(value, 500);

    const getValueList = () => value.split(/[\n,\r ]/).filter((val) => !!val);

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
                const results = await fetchMatch(uniq(getValueList()));
                setMatch(results);
                setUnmatch(getUnmatchList(results));
                setIsLoading(false);
            })();
        } else {
            onClear();
        }
        // eslint-disable-next-line
    }, [debouncedValue]);

    return (
        <Modal
            visible={visible}
            onCancel={() => {
                setVisible(false);
                setValue('');
            }}
            width={width}
            title={dictionary.modalTitle}
            okText={get(dictionary, 'modalOkText', 'Upload')}
            onOk={() => {
                setVisible(false);
                setValue('');
                onUpload(match ?? []);
            }}
            okButtonProps={{ disabled: !match?.length }}
            cancelText={get(dictionary, 'modalCancelText', 'Cancel')}
            wrapClassName={styles.fuiUploadIdsModalWrapper}
            destroyOnClose
        >
            <Space direction="vertical" className={styles.space}>
                <ProLabel
                    title={get(dictionary, 'inputLabel', 'Copy-paste a list of identifiers or upload a file') as string}
                    popoverProps={popoverProps}
                />
                <Space direction="vertical" size={12} className={styles.space}>
                    <Input.TextArea
                        rows={4}
                        placeholder={placeHolder}
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                    />
                    <Space>
                        <Upload
                            accept={mimeTypes}
                            multiple={true}
                            showUploadList={false}
                            fileList={fileList}
                            onChange={(info) => setFileList(info.fileList)}
                            className={styles.upload}
                            beforeUpload={async (file) => {
                                const fileContent = await file.text();
                                setValue(`${value ? value + '\n' : value}${fileContent}`);
                                return false;
                            }}
                        >
                            <Button icon={<UploadOutlined />}>
                                {get(dictionary, 'modalUploadBtnText', 'Upload a File')}
                            </Button>
                        </Upload>
                        {isEmpty(match) ? null : (
                            <Button type="text" onClick={onClear}>
                                {get(dictionary, 'clear', 'Clear')}
                            </Button>
                        )}
                    </Space>
                    <Space direction="vertical" size={0}>
                        {fileList.map((file) => (
                            <Space key={file.name + file.size} size={5} className={styles.ListItem}>
                                <PaperClipOutlined className={styles.paperClipIcon} />
                                {file.name}
                            </Space>
                        ))}
                    </Space>
                </Space>
            </Space>
            <Spin spinning={isLoading}>
                {match && unmatch ? (
                    <Collapse className={styles.matchUnmatch}>
                        <CollapsePanel
                            className={styles.collapsePanel}
                            key="match-unmatch-ids"
                            header={
                                dictionary.collapseTitle
                                    ? dictionary.collapseTitle(match.length, unmatch.length)
                                    : defaultRenderCollapseTitle(match.length, unmatch.length)
                            }
                        >
                            <Typography className={styles.tablesMessages}>
                                {dictionary.tablesMessage
                                    ? dictionary.tablesMessage(getSubmittedIdsCount(match), getMatchToCount(match))
                                    : defaultTablesMessage(getSubmittedIdsCount(match), getMatchToCount(match))}
                            </Typography>
                            {isEmpty(unmatch) ? (
                                <MatchTable matchItems={match} dictionary={dictionary} />
                            ) : (
                                <Tabs size="small" defaultActiveKey="matched" className={styles.tabs}>
                                    <Tabs.TabPane
                                        key="matched"
                                        tab={
                                            dictionary.matchTabTitle
                                                ? dictionary.matchTabTitle(match.length)
                                                : defaultRenderMatchTabTitle(match.length)
                                        }
                                    >
                                        <MatchTable matchItems={match} dictionary={dictionary} />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane
                                        key="unmatched"
                                        tab={
                                            dictionary.unmatchTabTitle
                                                ? dictionary.unmatchTabTitle(unmatch.length)
                                                : defaultRenderUnmatchTabTitle(unmatch.length)
                                        }
                                    >
                                        <UnmatchTable unmatchItems={unmatch} dictionary={dictionary} />
                                    </Tabs.TabPane>
                                </Tabs>
                            )}
                        </CollapsePanel>
                    </Collapse>
                ) : null}
            </Spin>
        </Modal>
    );
};

export default UploadModal;
