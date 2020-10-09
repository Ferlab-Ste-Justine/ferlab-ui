import React from 'react';
import GridCard from '../../packages/core-react/src/cards/GridCard';
import 'antd/dist/antd.css'
// import somegraph from './assets/somegraph.png';

export default {
  title: '@ferlab-ui/core-react/cards/GridCard',
  component: GridCard,
  argTypes: {
    label: {
      description: 'overwritten description',
      table: {
        type: { 
            summary: 'something short', 
            detail: 'something really really long' 
        },
      },
      control: {
        type: null,
      },
    },
  },
};

const primaryArgs = {
  title: 'Primary',
  content: <><h2>Testing content</h2><p>Lorem ipsum iquem vasi.</p></>,
};

export const DefaultCard = () => (
  <GridCard {...primaryArgs}>{primaryArgs.content}</GridCard>
);
export const Loading = () => (
  <GridCard title="Loading Card" loading={true}>Loading</GridCard>
);
// export const TitleAndGraph = () => (
//   <GridCard title="Some Graph"><img src={somegraph} width="440" height="320" /></GridCard>
// );
// export const NoTitle = () => (
//   <GridCard><br /><img src={somegraph} width="460" height="380" /></GridCard>
// );