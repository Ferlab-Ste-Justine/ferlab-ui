import React, { useContext, useEffect, useState } from 'react';
import { CloseOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Dropdown, Modal, Tooltip } from 'antd';
import d3ToPng from 'd3-svg-to-png';
import { format } from 'date-fns';
import { v4 } from 'uuid';

import { toKebabCase } from '../../../utils/stringUtils';
import { GridCardHeader } from '../../../view/v2/GridCard';
import GridCard, { TGridCard } from '../../../view/v2/GridCard/GridCard';
import { ResizableGridLayoutContext } from '..';

import styles from './index.module.scss';

type TDictionary = {
    download?: {
        fileNameTemplate?: string;
        fileNameDateFormat?: string;
        preview?: string;
        download?: string;
        data?: string;
        svg?: string;
        png?: string;
        removeChart?: string;
    };
};

type TDownloadSettings = {
    tsv: boolean;
    svg: boolean;
    png: boolean;
};

type TResizableGridCard = Omit<TGridCard, 'title' | 'resizable'> & {
    gridUID: string;
    headerTitle: string;
    dictionary?: TDictionary;
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

enum DownloadKey {
    png = 'png',
    svg = 'svg',
    tsv = 'tsv',
}

enum DownloadType {
    data = 'data',
    chart = 'chart',
}

const EXPORT_SETTINGS = {
    background: 'white',
    quality: 0.92,
    scale: 1,
};

const CARD_HEADER_TITLE_TRUNCATE_THRESHOLD_WIDTH = 140;
const DOWNLOAD_DELAY = 250;
const DEFAULT_TSV_HEADERS = ['Value', 'Count', 'Frequency'];
const DEFAULT_TSV_CONTENT_MAP = ['label', 'value', 'frequency'];
const DEFAULT_FILENAME_TEMPLATE = '%name-$type-%date%extension';
const DEFAULT_FILENAME_DATE_FORMAT = 'yyyy-MM-dd';

const fileNameFormatter = (
    fileNameTemplate: string,
    type: DownloadType,
    dateFormat: string,
    name: string,
    extension: string,
): string => {
    const formattedDate = format(new Date(), dateFormat);
    return fileNameTemplate
        .replace('%name', name.toLowerCase().replace(/ /g, ''))
        .replace('%type', type)
        .replace('%date', formattedDate)
        .replace('%extension', extension);
};

const populateMenuItems = (settings: TDownloadSettings, dictionary?: TDictionary) => {
    const items = [];

    if (settings.tsv) {
        items.push({
            key: DownloadKey.tsv,
            label: dictionary?.download?.data ?? 'Download data',
        });
    }

    if (settings.svg) {
        items.push({
            key: DownloadKey.svg,
            label: dictionary?.download?.svg ?? 'Download SVG',
        });
    }

    if (settings.png) {
        items.push({
            key: DownloadKey.png,
            label: dictionary?.download?.png ?? 'Download PNG',
        });
    }

    return items;
};

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
}: TResizableGridCard): JSX.Element => {
    const context = useContext(ResizableGridLayoutContext);
    const graphId = `graph-${v4()}`;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [action, setAction] = useState<DownloadKey>(DownloadKey.tsv);
    const [hasStartedDownload, setHasStartedDownload] = useState(false);

    const fileNameTemplate = dictionary?.download?.fileNameTemplate ?? DEFAULT_FILENAME_TEMPLATE;
    const fileNameDateFormat = dictionary?.download?.fileNameDateFormat ?? DEFAULT_FILENAME_DATE_FORMAT;
    const menuItems = populateMenuItems(downloadSettings, dictionary);

    const extra = [];

    if (closeHandle) {
        extra.push(
            <Tooltip key="remove-button-tooltips" title={`${dictionary?.download?.removeChart ?? 'Remove chart'}`}>
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
            document.querySelectorAll(`#${graphId} svg`).forEach((_, index) => {
                // d3ToPng only works with string query, not element
                d3ToPng(
                    `#${graphId} div:nth-child(${index + 1}) svg`,
                    fileNameFormatter(fileNameTemplate, DownloadType.chart, fileNameDateFormat, headerTitle, ''),
                    { ...EXPORT_SETTINGS, format: action },
                ).then(() => {
                    setHasStartedDownload(false);
                });
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
                    okText={dictionary?.download?.download ?? 'Download'}
                    onCancel={() => setIsModalVisible(false)}
                    onOk={() => {
                        setHasStartedDownload(true);
                    }}
                    open={isModalVisible}
                    title={`${dictionary?.download?.preview ?? 'Download preview - '}${headerTitle}.${action}`}
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
