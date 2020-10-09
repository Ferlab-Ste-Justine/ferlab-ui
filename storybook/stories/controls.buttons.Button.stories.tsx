import React from 'react';
import AsyncButton, { AsyncButtonProps } from '../../packages/core-react/src/controls/buttons/AsyncButton';

export default {
title: '@ferlab-ui/core-react/controls/buttons/AsyncButton',
component: AsyncButton,
argTypes: {
  type: {
    control: {
      type: 'inline-radio',
      options: ['primary', 'ghost', 'dashed', 'link', 'text'],
    },
  }
},
};

const AsyncButtonStory = (args : AsyncButtonProps) => (
  <AsyncButton {...args}>{args.children}</AsyncButton>
)

function wait(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}


export const Primary = AsyncButtonStory.bind({})

Primary.args = {
  type: 'primary',
  children: 'Button',
  getLink: async () => { await wait(6000) }
};
