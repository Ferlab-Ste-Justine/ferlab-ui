import React, { ReactElement, useState } from 'react';
import { CheckOutlined, FlagFilled, FlagOutlined, HistoryOutlined, PushpinFilled, StarFilled } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Modal, Popover, Space, Timeline, Tooltip, Typography } from 'antd';

import ScrollContent from '../../../layout/ScrollContent';
import getRelativeDate from '../../../utils/dateUtils';
import { getPractitionnerName } from '../../Assignments/utils';
import UserAvatar from '../../UserAvatar';
import { IFlagDictionary, TFlagHistory } from '../types';
import { sortFlags } from '../utils';

import styles from './index.module.css';

export type TFlag = {
    options: string[];
    dictionary?: IFlagDictionary | Record<string, never>;
    handleSelect: (optionFlag: string) => void;
    handlePopOverHover: (open: boolean) => void;
    isPopOverOpen: boolean;
    history: TFlagHistory[];
};

export enum FlagOption {
    FLAG = 'flag',
    PIN = 'pin',
    STAR = 'star',
    NONE = 'none',
}

export const getOptionIcon = (option: string): ReactElement | undefined => {
    switch (option) {
        case FlagOption.FLAG:
            return <FlagFilled className={styles.flagIcon} />;
        case FlagOption.PIN:
            return <PushpinFilled className={styles.pinIcon} />;
        case FlagOption.STAR:
            return <StarFilled className={styles.starIcon} />;
        case FlagOption.NONE:
            return <FlagOutlined className={styles.noneIcon} />;
        default:
            break;
    }
};

export const Flag = ({
    dictionary,
    handlePopOverHover,
    handleSelect,
    history,
    isPopOverOpen,
    options,
}: TFlag): ReactElement => {
    const { Text } = Typography;
    const [open, setOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dropdownOption: MenuProps['items'] = [
        {
            icon: getOptionIcon(FlagOption.FLAG),
            key: FlagOption.FLAG,
            label: (
                <div className={styles.flagOption}>
                    {dictionary?.options?.flag || 'Flag'}
                    {options.includes(FlagOption.FLAG) && <CheckOutlined className={styles.checkIcon} />}
                </div>
            ),
        },
        {
            icon: getOptionIcon(FlagOption.PIN),
            key: FlagOption.PIN,
            label: (
                <div className={styles.flagOption}>
                    {dictionary?.options?.pin || 'Pin'}
                    {options.includes(FlagOption.PIN) && <CheckOutlined className={styles.checkIcon} />}
                </div>
            ),
        },
        {
            icon: getOptionIcon(FlagOption.STAR),
            key: FlagOption.STAR,
            label: (
                <div className={styles.flagOption}>
                    {dictionary?.options?.star || 'Star'}
                    {options.includes(FlagOption.STAR) && <CheckOutlined className={styles.checkIcon} />}
                </div>
            ),
        },
        {
            type: 'divider',
        },
        {
            icon: getOptionIcon(FlagOption.NONE),
            key: FlagOption.NONE,
            label: <div className={styles.flagOption}>{dictionary?.options?.none || 'None'}</div>,
        },
    ];

    const popOverContent = () => {
        const name = history?.[0]?.name ? getPractitionnerName(history[0].name) : undefined;
        return (
            history?.[0] && (
                <Space size={8}>
                    <UserAvatar className={styles.userAvatar} size={24} userName={name} />
                    <Text strong>{name}</Text>
                    <Text type="secondary">{getRelativeDate(new Date(history[0].date), dictionary?.date)}</Text>
                    <Tooltip placement="right" title={dictionary?.modal?.tooltip || 'View history'}>
                        <>
                            <Button
                                className={styles.viewHistoryButton}
                                icon={<HistoryOutlined className={styles.historyIcon} style={{ fontSize: '16px' }} />}
                                onClick={() => setIsModalOpen(true)}
                                type="link"
                            >
                                {dictionary?.modal?.title}
                            </Button>
                        </>
                    </Tooltip>
                </Space>
            )
        );
    };

    const dropdown = (
        <Dropdown
            className={styles.flagList}
            menu={{
                defaultSelectedKeys: options,
                items: dropdownOption,
                onClick: (e: any) => handleSelect(e.key),
                selectable: true,
                selectedKeys: options,
            }}
            onOpenChange={(flag: boolean) => setOpen(flag)}
            open={open}
            overlayClassName={styles.flagDropdown}
            trigger={['click']}
        >
            {options.length > 0 ? (
                <Space size={2}>
                    {options.includes(FlagOption.FLAG) && getOptionIcon(FlagOption.FLAG)}
                    {options.includes(FlagOption.PIN) && getOptionIcon(FlagOption.PIN)}
                    {options.includes(FlagOption.STAR) && getOptionIcon(FlagOption.STAR)}
                </Space>
            ) : (
                getOptionIcon(FlagOption.NONE)
            )}
        </Dropdown>
    );
    return (
        <>
            <Popover content={popOverContent} onOpenChange={handlePopOverHover} open={isPopOverOpen}>
                {dropdown}
            </Popover>
            <Modal
                footer={[
                    <Button key="close" onClick={() => setIsModalOpen(false)} type="primary">
                        {dictionary?.modal?.close || 'Close'}
                    </Button>,
                ]}
                onCancel={() => setIsModalOpen(false)}
                open={isModalOpen}
                title={dictionary?.modal?.title || 'History'}
            >
                <Timeline>
                    <ScrollContent className={styles.optionsList}>
                        {history.map((h: any) => (
                            <Timeline.Item
                                dot={
                                    <Space className={styles.timelineDot} size={4}>
                                        {h?.options?.length > 0
                                            ? sortFlags(h.options)?.map((o: string) => getOptionIcon(o))
                                            : getOptionIcon(FlagOption.NONE)}
                                    </Space>
                                }
                            >
                                <Space size={8}>
                                    <UserAvatar
                                        className={styles.userAvatar}
                                        size={24}
                                        userName={h.name && getPractitionnerName(h.name)}
                                    />
                                    <Text strong>{h.name && getPractitionnerName(h.name)}</Text>
                                    <Text type="secondary">{getRelativeDate(new Date(h.date), dictionary?.date)}</Text>
                                </Space>
                            </Timeline.Item>
                        ))}
                    </ScrollContent>
                </Timeline>
            </Modal>
        </>
    );
};

export default Flag;
