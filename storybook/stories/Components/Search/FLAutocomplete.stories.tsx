import React from "react";
import FLAutoComplete, { FLAutoCompleteProps } from '@ferlab/ui/core/components/Search/FLAutoComplete';
import { Meta } from "@storybook/react";

export default {
    title: "@ferlab/Components/Search/FLAutocomplete",
    component: FLAutoComplete,
    decorators: [(Story: any) => <Story/>],
    argTypes: {
        debounceInterval: {
            control: 'number'
        },
        placeholder: {
            control: 'text'
        }
    },
  } as Meta;

const FLAutoCompleteStory = (props : FLAutoCompleteProps) => (
   <FLAutoComplete {...props} />
);

const highlights = [{
    id: "HPO:0005146",
    highlight:"Some <strong>highlight</strong> text"
},{
    id: "HPO:0005146",
    highlight:"<strong>Cardiac</strong> valve <strong>calcification</strong>"
},{
    id: "HPO:0031307",
    highlight:"Internal <strong>carotid</strong> artery <strong>calcification</strong>"
}];

/* Basic */
export const FLAutoCompleteDefault = FLAutoCompleteStory.bind({});
FLAutoCompleteDefault.args = {
    getResults: async () => (highlights),
    onSelect: alert
};

/* Basic */
export const FLAutoCompleteWithIds = FLAutoCompleteStory.bind({});
FLAutoCompleteWithIds.args = {
    getResults: async () => (highlights),
    onSelect: alert,
    showIds: true
};
