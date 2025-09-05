import React from 'react';
import {Meta} from '@storybook/react';
import { Button } from 'antd';
import BannerItem, {TBannerItemProps} from '@ferlab/ui/core/pages/LandingPage/BannerItem';
import Icon from '@ferlab/ui/core/components/Icons/FuturoSpot/CloudComputingSpotIcon'

export default {
    title: '@ferlab/Pages/LandingPage/BannerItem',
    component: BannerItem,
    decorators: [(Story) => <Story/>],
} as Meta;

const props = {
    dictionary: {
        button:'My Button',
        title: 'This is a Title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus, velit et hendrerit dapibus, nunc metus iaculis nunc, ut pretium massa turpis at metus. Fusce facilisis eget eros in laoreet. Proin velit erat, euismod id convallis ultricies, vulputate sed lectus. Quisque faucibus, erat blandit auctor egestas, lacus diam blandit massa, ac malesuada nulla est rutrum justo. In tincidunt elit at erat maximus consectetur. Mauris a risus ac eros consectetur tristique. Nam tempus aliquet maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna nunc, ornare ac orci a, tincidunt fringilla magna. Morbi ultrices vulputate gravida. Ut pulvinar enim sed nibh tempor gravida. Suspendisse ac nisl lacus.',
    },
    buttonProps:{
        href: 'https://ferlab.bio',
        target: '_blank',
        type: 'primary'
    } ,
    IconComponent: Icon,
    color: 'dark'
} as TBannerItemProps;

export const BannerItemStory = () => <BannerItem {...props} />;

export const BannerItemWithAdditionalButtons = () => (
  <BannerItem 
    {...props} 
    additionalButtons={[
      <Button key="secondary" type="default" size="large">Secondary Action</Button>,
      <Button key="tertiary" type="link" size="large">Learn More</Button>
    ]} 
  />
);

export const BannerItemWithSingleAdditionalButton = () => (
  <BannerItem 
    {...props} 
    additionalButtons={[
      <Button key="secondary" type="default" size="large">Secondary Action</Button>
    ]} 
  />
);
