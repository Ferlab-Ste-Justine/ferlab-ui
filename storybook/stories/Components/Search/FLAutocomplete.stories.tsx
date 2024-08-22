import React from "react";
import FLAutoComplete, { FLAutoCompleteOption, FLAutoCompleteProps } from '@ferlab/ui/core/components/Search/FLAutoComplete';
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
    id: "HPO:000001",
    highlight:"This is a test text"
},{
    id: "HPO:0005146",
    highlight:"Some highlight text"
},{
    id: "HPO:0005146",
    highlight:"Cardiac valve calcification"
},{
    id: "HPO:0031307",
    highlight:"Internal carotid artery calcification"
}];

function highlightText(text: string, term: string){
    return text.replace(term, `<strong>${term}</strong>`)
}

/* Basic */
export const FLAutoCompleteDefault = FLAutoCompleteStory.bind({});
FLAutoCompleteDefault.args = {
    getResults: async (term: string) => (highlights.map(h => ({
        ...h,
        highlight: highlightText(h.highlight, term)
    }))),
    onSelect: alert,
    title: "Autocomplete",
    allowClear: true
};

/* Show ids */
export const FLAutoCompleteWithIds = FLAutoCompleteStory.bind({});
FLAutoCompleteWithIds.args = {
    getResults: async (term: string) => (highlights.map(h => ({
        ...h,
        highlight: highlightText(h.highlight, term)
    }))),
    onSelect: alert,
    showIds: true,
    title: "Autocomplete",
    allowClear: true
};

/* Show custom ids */
export const FLAutoCompleteWithCustomIds = FLAutoCompleteStory.bind({});
FLAutoCompleteWithCustomIds.args = {
    getResults: async (term: string) => (highlights.map(h => ({
        ...h,
        highlight: highlightText(h.highlight + ` <span class="fl-auto-complete_highlight_id">( ${h.id} )</span>`, term)
    }))),
    onSelect: alert,
    title: "Autocomplete",
    allowClear: true
};

/* Show custom value */
export const FLAutoCompleteWithCustomValue = FLAutoCompleteStory.bind({});
FLAutoCompleteWithCustomValue.args = {
    getResults: async (term: string) => (highlights.map(h => ({
        ...h,
        highlight: highlightText(h.highlight, term)
    }))),
    onSelect: alert,
    title: "Autocomplete",
    allowClear: true,
    setValue: (option: FLAutoCompleteOption) => highlights.find(h => h.id = option.id)?.highlight
};
