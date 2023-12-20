import React from 'react';
import ListItemWithActions from '@ferlab/ui/components/List/ListItemWithActions';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import { List, Typography } from 'antd';

export default {
    title: '@ferlab/Components/List/ListItemWithActions',
    component: ListItemWithActions,
    decorators: [(Story) => <Story />],
} as Meta;

const ListItems = [
    {
        title: 'A wonderfull list item',
        description: 'Item description',
    },
    {
        title: 'A wonderfull list item 2',
        description: 'Item description 2',
    },
    {
        title: 'A wonderfull list item 3',
        description: 'Item description 3',
    },
];

export const Default = () => {
    return (
        <List
            style={{
                backgroundColor: 'white',
                maxWidth: 500,
                border: '1px solid #dde4ee',
                borderRadius: 5,
            }}
            dataSource={ListItems}
            renderItem={(item, index) => (
                <ListItemWithActions
                    key={index}
                    title={
                        <Typography.Text style={{ width: 400 }} ellipsis={{ tooltip: item.title }}>
                            {item.title}
                        </Typography.Text>
                    }
                    description={item.description}
                    onClick={action('onClickItem')}
                    onEdit={action('onEdit')}
                    onDelete={action('onDelete')}
                    onShare={action('onShare')}
                />
            )}
        />
    );
};
