import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { TermFilterProps } from "@ferlab/ui/components/filters/CheckboxFilter";
import {
    IFilter,
    IFilterCount,
    IFilterGroup,
    onChangeType,
    VisualType,
} from "@ferlab/ui/components/filters/types";
import { filters } from "./data";
import FilterContainer from "@ferlab/ui/components/filters/FilterContainer";

export default {
    title: "@ferlab/Components/Filters/FilterContainer",
    component: FilterContainer,
    decorators: [
        (Story) => (
            <>
                <div
                    className={"story_container"}
                    style={{ display: "inline-grid" }}
                >
                    <Story />
                </div>
            </>
        ),
    ],
    argTypes: {
        className: {
            control: "string",
        },
        children: {
            control: "object",
        },
    },
} as Meta;

const FilterContainerStory = ({
    title,
    maxShowing,
    filterGroup,
    onChange,
    ...props
}: {
    title: string;
    maxShowing: number;
    filterGroup: IFilterGroup;
    onChange: onChangeType;
    searchInputVisible: boolean;
    filters: IFilter<IFilterCount>[];
    props: Story<TermFilterProps>;
}) => (
    <>
        <h3>{title}</h3>
        <FilterContainer
            filterGroup={filterGroup}
            maxShowing={maxShowing}
            onChange={onChange}
            {...props}
        />
    </>
);

const filterGroupTerm: IFilterGroup = {
    field: "this.field",
    title: "title_filter_group",
    type: VisualType.Checkbox,
};

const filterGroupTermTooltip: IFilterGroup = {
    field: "this.field",
    title: "title_filter_group",
    type: VisualType.Checkbox,
    headerTooltip: "This is a tooltip",
};

const onChangeTypeStory: onChangeType = () => null;

export const TermFilterContainer = FilterContainerStory.bind({});
TermFilterContainer.args = {
    title: "Filter Container Checkbox",
    maxShowing: 6,
    filterGroup: filterGroupTerm,
    onChangeType: onChangeTypeStory(filterGroupTerm, filters),
    hasSearchInput: true,
    filters: filters,
};

export const TermFilterContainerWithFilter = FilterContainerStory.bind({});
TermFilterContainerWithFilter.args = {
    title: "Filter Container Checkbox With Filter",
    maxShowing: 6,
    filterGroup: filterGroupTerm,
    onChangeType: onChangeTypeStory(filterGroupTerm, filters),
    hasSearchInput: true,
    filters: filters,
    selectedFilters: [
        { data: { count: 9, key: "Nine" }, name: "nine", id: "id_nine" },
    ],
};

export const TooltipsFilterContainer = FilterContainerStory.bind({});
TooltipsFilterContainer.args = {
    title: "Filter Container With Tooltip",
    maxShowing: 6,
    filterGroup: filterGroupTermTooltip,
    onChangeType: onChangeTypeStory(filterGroupTerm, filters),
    hasSearchInput: true,
    filters: filters,
};
