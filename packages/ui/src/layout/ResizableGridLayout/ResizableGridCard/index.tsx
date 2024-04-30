import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { CloseOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Dropdown, Modal, Tooltip } from 'antd';
import d3ToPng from 'd3-svg-to-png';
import { v4 } from 'uuid';

import { toKebabCase } from '../../../utils/stringUtils';
import { GridCardHeader } from '../../../view/v2/GridCard';
import GridCard, { TGridCard } from '../../../view/v2/GridCard/GridCard';
import { ResizableGridLayoutContext } from '..';

import {
    DownloadKey,
    downloadToSvg,
    DownloadType,
    fileNameFormatter,
    populateMenuItems,
    TDownloadDictionary,
    TDownloadSettings,
} from './utils';

import styles from './index.module.scss';

type TResizableGridCard = Omit<TGridCard, 'title' | 'resizable'> & {
    gridUID: string;
    headerTitle: string;
    dictionary?: TDownloadDictionary;
    modalContent?: React.ReactNode;
    modalSettings?: {
        width: number;
        height: number;
    };
    tsvSettings?: {
        headers?: string[];
        contentMap?: string[];
        data: any[];
    };
    closeHandle?: boolean;
    downloadSettings?: TDownloadSettings;
    onRemoveClick?: () => void;
    titleTruncateThresholdWidth?: number;
    /**
     * This will affect whether or not the handle is shown.
     */
    withHandle?: boolean;
};

const EXPORT_SETTINGS = {
    background: 'white',
    quality: 0.92,
    scale: 1,
};

const CARD_HEADER_TITLE_TRUNCATE_THRESHOLD_WIDTH = 140;
const DOWNLOAD_DELAY = 250;
const DEFAULT_TSV_HEADERS = ['Value', 'Count', 'Frequency'];
const DEFAULT_TSV_CONTENT_MAP = ['label', 'value', 'frequency'];
const DEFAULT_FILENAME_TEMPLATE = '%name-%type-%date%extension';
const DEFAULT_FILENAME_DATE_FORMAT = 'yyyy-MM-dd';

const ResizableGridCard = ({
    closeHandle = true,
    dictionary,
    downloadSettings = { png: true, svg: true, tsv: true },
    gridUID,
    headerTitle,
    id,
    modalContent,
    modalSettings = { height: 600, width: 800 },
    titleTruncateThresholdWidth = CARD_HEADER_TITLE_TRUNCATE_THRESHOLD_WIDTH,
    tsvSettings,
    withHandle = true,
    ...rest
}: TResizableGridCard): ReactElement => {
    const context = useContext(ResizableGridLayoutContext);
    const graphId = `graph-${v4()}`;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [action, setAction] = useState<DownloadKey>(DownloadKey.tsv);
    const [hasStartedDownload, setHasStartedDownload] = useState(false);

    const fileNameTemplate = dictionary?.fileNameTemplate ?? DEFAULT_FILENAME_TEMPLATE;
    const fileNameDateFormat = dictionary?.fileNameDateFormat ?? DEFAULT_FILENAME_DATE_FORMAT;
    const menuItems = populateMenuItems(downloadSettings, dictionary);

    const extra = [];

    if (closeHandle) {
        extra.push(
            <Tooltip key="remove-button-tooltips" title={`${dictionary?.removeChart ?? 'Remove chart'}`}>
                <Button
                    className={styles.button}
                    icon={<CloseOutlined height={11} width={11} />}
                    key="remove-button"
                    onClick={(e) => {
                        e.preventDefault();
                        if (id) {
                            context[gridUID].onCardRemoveConfigUpdate(id);
                        }
                    }}
                    size="small"
                    type="text"
                />
            </Tooltip>,
        );
    }

    if (menuItems.length > 0) {
        extra.push(
            <Dropdown.Button
                className={styles.dropdownMenu}
                icon={<DownloadOutlined height={11} width={11} />}
                key="dropdown-menu"
                menu={{ items: menuItems, onClick: (e) => onMenuClick(e.key as DownloadKey) }}
                size="small"
                type="text"
            />,
        );
    }

    useEffect(() => {
        if (!hasStartedDownload) {
            return;
        }

        // d3ToPng block react's re-rendering. A timeout is need to force the download state to be set
        setTimeout(() => {
            document.querySelectorAll(`#${graphId} svg`).forEach((svg, index) => {
                const fileName = fileNameFormatter(
                    fileNameTemplate,
                    DownloadType.chart,
                    fileNameDateFormat,
                    headerTitle,
                    '',
                    dictionary?.fileNameAdditionalInfo,
                );

                if (action === DownloadKey.svg) {
                    downloadToSvg(fileName, svg).then(() => {
                        setHasStartedDownload(false);
                    });
                } else {
                    // d3ToPng only works with string query, not element
                    d3ToPng(`#${graphId} div:nth-child(${index + 1}) svg`, fileName, {
                        ...EXPORT_SETTINGS,
                        format: action,
                    }).then(() => {
                        setHasStartedDownload(false);
                    });
                }
            });
        }, DOWNLOAD_DELAY);
    }, [hasStartedDownload]);

    const onMenuClick = (e: DownloadKey) => {
        if (e === DownloadKey.tsv) {
            if (!tsvSettings) {
                return;
            }
            tsvSettings.data.forEach((datum) => {
                let tsvContent = `${tsvSettings.headers?.join('\t') ?? DEFAULT_TSV_HEADERS.join('\t')}\n`;
                const tsvDataMapping = tsvSettings.contentMap ?? DEFAULT_TSV_CONTENT_MAP;

                datum.forEach((e: any) => {
                    tsvDataMapping.forEach((key) => {
                        if (e[key]) {
                            tsvContent += `${e[key]}\t`;
                        }
                    });
                    tsvContent += `\n`;
                });

                const hiddenElement = document.createElement('a');
                hiddenElement.href = 'data:text/tab-separated-values;charset=utf-8,' + encodeURI(tsvContent);
                hiddenElement.target = '_blank';

                hiddenElement.download = fileNameFormatter(
                    fileNameTemplate,
                    DownloadType.data,
                    fileNameDateFormat,
                    headerTitle,
                    `.${DownloadKey.tsv}`,
                    dictionary?.fileNameAdditionalInfo,
                );
                hiddenElement.click();
            });

            return;
        }

        setAction(e);
        setIsModalVisible(true);
    };

    return (
        <>
            {modalContent && (
                <Modal
                    confirmLoading={hasStartedDownload}
                    okText={dictionary?.download ?? 'Download'}
                    onCancel={() => setIsModalVisible(false)}
                    onOk={() => {
                        setHasStartedDownload(true);
                    }}
                    open={isModalVisible}
                    title={`${dictionary?.preview ?? 'Download preview - '}${headerTitle}.${action}`}
                    width={modalSettings.width}
                >
                    <div className={styles.modalContentWrapper} id={graphId} style={{ height: modalSettings.height }}>
                        {modalContent}
                    </div>
                </Modal>
            )}
            <GridCard
                contentClassName={styles.resizableCard}
                loadingType="spinner"
                resizable
                title={
                    <GridCardHeader
                        className={styles.cardHeader}
                        extra={extra}
                        extraClassName={styles.extra}
                        id={headerTitle}
                        key={toKebabCase(headerTitle)}
                        title={headerTitle}
                        titleTruncateThresholdWidth={titleTruncateThresholdWidth}
                        withHandle={withHandle}
                    />
                }
                wrapperClassName={styles.resizableCard}
                {...rest}
            />
        </>
    );
};

export default ResizableGridCard;
