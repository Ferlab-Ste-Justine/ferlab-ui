import React, { ReactElement, useEffect, useState } from 'react';
import { CheckOutlined, FlagFilled, FlagOutlined, PushpinFilled, StarFilled } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';

export type TFlag = {
    options: any;
};

export const Flag = ({ options }: TFlag): ReactElement => {
    const [selectedFlag, setSelectedFlag] = useState<string[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    console.log('flag option', selectedFlag);
    console.log('option', options);

    const items: MenuProps['items'] = [
        {
            icon: <FlagFilled style={{ color: '#D4380D' }} />,
            key: '1',
            label: <div>Flag {selectedFlag.includes('1') && <CheckOutlined />}</div>,
        },
        {
            icon: <PushpinFilled style={{ color: '#FA8C16' }} />,
            key: '2',
            label: <div>Pin {selectedFlag.includes('2') && <CheckOutlined />}</div>,
        },
        {
            icon: <StarFilled style={{ color: '#2F54EB' }} />,
            key: '3',
            label: <div>Star {selectedFlag.includes('3') && <CheckOutlined />}</div>,
        },
        {
            type: 'divider',
        },
        {
            icon: <FlagOutlined style={{ color: '#8b9db2' }} />,
            key: '4',
            label: <span>None</span>,
        },
    ];

    const handleOpenChange = (flag: boolean) => {
        setOpen(flag);
    };

    const handleMenuClick: MenuProps['onClick'] = (e: any) => {
        if (e.key === '4') {
            setSelectedFlag([]);
        } else {
            if (selectedFlag.includes(e.key)) {
                setSelectedFlag(selectedFlag.filter((f) => f !== e.key));
            } else {
                setSelectedFlag([...selectedFlag, e.key]);
            }
        }
    };

    const getIcon = (key: string) => {
        switch (key) {
            case '1':
                return <FlagFilled style={{ color: '#D4380D' }} />;
            case '2':
                return <PushpinFilled style={{ color: '#FA8C16' }} />;
            case '3':
                return <StarFilled style={{ color: '#2F54EB' }} />;

            default:
                break;
        }
    };

    return (
        <Dropdown
            menu={{
                defaultSelectedKeys: selectedFlag,
                items,
                onClick: handleMenuClick,
                selectable: true,
                selectedKeys: selectedFlag,
            }}
            onOpenChange={handleOpenChange}
            open={open}
            trigger={['click']}
        >
            {selectedFlag.length > 0 ? (
                <div>
                    {/* {selectedFlag.map((f: string) => getIcon(f))} */}
                    {selectedFlag.includes('1') && getIcon('1')}
                    {selectedFlag.includes('2') && getIcon('2')}
                    {selectedFlag.includes('3') && getIcon('3')}
                </div>
            ) : (
                <FlagOutlined style={{ color: '#8b9db2' }} />
            )}
        </Dropdown>
    );
};

export default Flag;
