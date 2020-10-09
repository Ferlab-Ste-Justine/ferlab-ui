import React from 'react';
import Grid, { GridProps } from '../../packages/core-react/src/layout/Grid';
import GridCard from '../../packages/core-react/src/cards/GridCard';

import AsyncButton from '../../packages/core-react/src/controls/buttons/AsyncButton';
import 'antd/dist/antd.css';
import somegraph from './assets/somegraph.png';

export default {
  title: '@ferlab-ui/core-react/layout/Grid',
  component: Grid,
  argTypes: {
    backgroundColor: {
      control: 'color' 
    },
    children: {
      control: 'object',
    }
  }
};


export const GridWithCard = (props: GridProps) => (
  <Grid {...props}>
    {props.children}
  </Grid>
);
GridWithCard.bind({})
GridWithCard.args = {
  children: <>
    <GridCard title="Primary">
      <h2>Testing content</h2><p>Lorem ipsum iquem vasi.</p>
    </GridCard>
    <GridCard title="Loading Card" loading={true}>Loading</GridCard>
    <GridCard title="Some Graph"><img src={somegraph} width="440" height="320" /></GridCard>
    <GridCard><br /><img src={somegraph} width="460" height="380" /></GridCard>
    </>
};


export const GridWithButtons = (props: GridProps) => (
  <Grid {...props}>
    {[1,2,3,4,5,6,7,8,9].map((x) => (
      <AsyncButton getLink={async() => {return await 'test'}}> {x}</AsyncButton>
    ))}
  </Grid>
);