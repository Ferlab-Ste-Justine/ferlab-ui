import React from 'react';
import GridCard from '@ferlab/ui/view/GridCard';
import 'antd/dist/antd.css'


export default {
  title: '@ferlab/Views/GridCard',
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
