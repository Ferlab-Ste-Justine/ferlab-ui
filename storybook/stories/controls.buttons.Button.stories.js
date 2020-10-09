import React from 'react';
import AsyncButton from '../../packages/core-react/src/controls/buttons/AsyncButton';

export default {
title: '@ferlab-ui/core-react/controls/buttons/AsyncButton',
component: AsyncButton,
};

function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const primaryArgs = {
  type: 'primary',
  label: 'Button',
  getLink: async () => { await wait(6000) }
};

export const Primary = () => <AsyncButton {...primaryArgs.args}>{primaryArgs.label}</AsyncButton>; 
