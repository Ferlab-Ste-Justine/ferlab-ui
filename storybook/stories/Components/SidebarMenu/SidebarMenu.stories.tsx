import React from "react";
import {Meta, Story} from '@storybook/react/types-6-0';
import SidebarMenu, {ISidebarMenuProps} from '@ferlab/ui/components/sidebarMenu';
import {
    DashboardOutlined,
    ThunderboltOutlined,
    ApiOutlined,
    AlertOutlined,
    AppleOutlined
} from '@ant-design/icons';

export default {
    title: "@ferlab/Components/Menu/SidebarMenu",
    component: SidebarMenu,
    decorators: [(Story) => <Story/>],
    argTypes: {
        className: {
            control: 'text'
        },
        style: {
            control: 'object'
        },
        menuItems: {
            control: 'array'
        },
        enableQuickFilter: {
            control: 'boolean'
        },
    },
  } as Meta;

  const SidebarMenuStory = ({title, ...props} : {title: string, props: Story<ISidebarMenuProps>}) => (
    <>
        <h3>{title}</h3>
        <SidebarMenu {...props}  />
    </>
);

/* Basic */
export const SidebarMenuBasic = SidebarMenuStory.bind({});
SidebarMenuBasic.args = {
    title: 'Sidebar Menu Basic',
    menuItems: [
        {
            key: 1,
            title: "Menu item 1",
            icon: <DashboardOutlined />,
            rightPanelContent: <>Menu 1</>
        },
        {
            key: 2,
            title: "Menu item 2",
            icon: <ThunderboltOutlined />,
            rightPanelContent: <>Menu 2</>
        },
        {
            key: 3,
            title: "Menu item 3",
            icon: <ApiOutlined />,
            rightPanelContent: <>Menu 3</>
        },
        {
            key: 4,
            title: "Menu item 4",
            icon: <AlertOutlined />,
            rightPanelContent: <>Menu 4</>
        },
        {
            key: 5,
            title: "Menu item 5",
            icon: <AppleOutlined />,
            rightPanelContent: <>Menu 5</>
        }
    ]
};

/* No custom toggle icon */
export const SidebarMenuCustomToggle = SidebarMenuStory.bind({});
SidebarMenuCustomToggle.args = {
    title: 'Sidebar Menu Custom Toggle Icon',
    toggleIcon: {
        open: <AppleOutlined />,
        close: <AlertOutlined />
    },
    menuItems: [
        {
            key: 1,
            title: "Menu item 1",
            icon: <DashboardOutlined />,
            rightPanelContent: <>Menu 1</>
        },
        {
            key: 2,
            title: "Menu item 2",
            icon: <ThunderboltOutlined />,
            rightPanelContent: <>Menu 2</>
        },
        {
            key: 3,
            title: "Menu item 3",
            icon: <ApiOutlined />,
            rightPanelContent: <>Menu 3</>
        },
        {
            key: 4,
            title: "Menu item 4",
            icon: <AlertOutlined />,
            rightPanelContent: <>Menu 4</>
        },
        {
            key: 5,
            title: "Menu item 5",
            icon: <AppleOutlined />,
            rightPanelContent: <>Menu 5</>
        }
    ]
};


/* No Quick Filter */
export const SidebarMenuNoQuickFilter = SidebarMenuStory.bind({});
SidebarMenuNoQuickFilter.args = {
    title: 'Sidebar Menu Quick Filter Disabled',
    enableQuickFilter: false,
    menuItems: [
        {
            key: 1,
            title: "Menu item 1",
            icon: <DashboardOutlined />,
            rightPanelContent: <>Menu 1</>
        },
        {
            key: 2,
            title: "Menu item 2",
            icon: <ThunderboltOutlined />,
            rightPanelContent: <>Menu 2</>
        },
        {
            key: 3,
            title: "Menu item 3",
            icon: <ApiOutlined />,
            rightPanelContent: <>Menu 3</>
        },
        {
            key: 4,
            title: "Menu item 4",
            icon: <AlertOutlined />,
            rightPanelContent: <>Menu 4</>
        },
        {
            key: 5,
            title: "Menu item 5",
            icon: <AppleOutlined />,
            rightPanelContent: <>Menu 5</>
        }
    ]
};
