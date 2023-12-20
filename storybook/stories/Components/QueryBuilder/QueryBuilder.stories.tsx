import QueryBuilder, {
    IQueryBuilderProps,
} from "@ferlab/ui/core/components/QueryBuilder";
import { setQueryBuilderState } from "@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState";
import { IRemoteComponent } from "@ferlab/ui/core/data/sqon/types";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { MdPeople } from "react-icons/md";

export default {
    title: '@ferlab/Components/QueryBuilder/QueryBuilder',
    component: QueryBuilder,
    decorators: [(Story) => <Story />],
    argTypes: {
        className: {
            control: 'text',
        },
        dictionary: {
            control: 'object',
        },
        total: {
            control: 'number',
        },
        loading: {
            control: 'boolean',
        },
        enableCombine: {
            control: 'boolean',
        },
    },
} as Meta;

const QueryBuilderStory = ({ title, ...props }: { title: string; props: Story<IQueryBuilderProps> }) => (
    <>
        <h3>{title}</h3>
        <QueryBuilder {...props} />
    </>
);

const QB_ID = 'storybook-qb-id';

const defaultResolveCountPromise = (sqon: any) => sqon;

const defaultFetchQuerCount = async () => {
    const a = await new Promise<number>((resolve) => {
        resolve(2);
    });

    return a;
};

/* Empty */
export const Empty = QueryBuilderStory.bind({});
Empty.args = {
    id: QB_ID,
    title: 'Empty',
    total: 1350,
    enableSingleQuery: true,
    currentQuery: (f: any) => f,
    onRemoveFacet: (f: any) => f,
    onChangeQuery: (f: any) => f,
    getResolvedQueryForCount: defaultResolveCountPromise,
    fetchQueryCount: defaultFetchQuerCount,
};

/* Empty */
export const WithShowLabelsButton = QueryBuilderStory.bind({});
const withShowLabelQbId = QB_ID + 'WithShowLabelsButton';
setQueryBuilderState(withShowLabelQbId, {
    state: [
        {
            op: 'and',
            content: [
                {
                    content: {
                        value: ['something'],
                        field: 'test',
                    },
                    op: 'in',
                },
                {
                    content: { value: ['false'], field: 'test1' },
                    op: 'in',
                },
            ],
            total: 1500,
            id: '1',
        },
    ],
    active: '1',
});
WithShowLabelsButton.args = {
    id: withShowLabelQbId,
    enableShowHideLabels: true,
    title: 'With Show Hide Labels Enable',
    currentQuery: (f: any) => f,
    onRemoveFacet: (f: any) => f,
    onChangeQuery: (f: any) => f,
    getResolvedQueryForCount: defaultResolveCountPromise,
    fetchQueryCount: defaultFetchQuerCount,
};

/* 1 query */
export const OneQuery = QueryBuilderStory.bind({});
const oneQueryQbId = QB_ID + 'OneQuery';
setQueryBuilderState(oneQueryQbId, {
    state: [
        {
            op: 'and',
            content: [
                {
                    content: {
                        value: ['something'],
                        field: 'test',
                    },
                    op: 'in',
                },
            ],
            total: 1500,
            id: '1',
        },
    ],
    active: '1',
});
OneQuery.args = {
    id: oneQueryQbId,
    title: '1 Query',
    onRemoveFacet: (f: any) => f,
    onChangeQuery: (f: any) => f,
    getResolvedQueryForCount: defaultResolveCountPromise,
    fetchQueryCount: defaultFetchQuerCount,
};

/* 1 query */
export const SingleQuery = QueryBuilderStory.bind({});
const singleQueryQbId = QB_ID + 'SingleQuery';
setQueryBuilderState(singleQueryQbId, {
    state: [
        {
            op: 'and',
            content: [
                {
                    content: {
                        value: ['something'],
                        field: 'test',
                    },
                    op: 'in',
                },
            ],
            total: 1500,
            id: '1',
        },
    ],
    active: '1',
});
SingleQuery.args = {
    id: singleQueryQbId,
    title: 'Single Query',
    enableSingleQuery: true,
    onRemoveFacet: (f: any) => f,
    onChangeQuery: (f: any) => f,
    getResolvedQueryForCount: defaultResolveCountPromise,
    fetchQueryCount: defaultFetchQuerCount,
};

/* 1 query with custom pill */
export const WithCustomPillQuery = QueryBuilderStory.bind({});
const withCustomPillQueryQbId = QB_ID + 'WithcustomPillQuery';
setQueryBuilderState(withCustomPillQueryQbId, {
    state: [
        {
            op: 'and',
            content: [
                {
                    content: {
                        value: ['something'],
                        field: 'test',
                    },
                    op: 'in',
                },

                {
                    id: '32b6117d-81e1-4335-bcad-28d2544f29fd',
                    op: 'and',
                    content: [
                        {
                            op: 'in',
                            content: {
                                field: 'consequences.consequences',
                                index: 'Variants',
                                value: ['intron_variant', 'downstream_gene_variant', 'upstream_gene_variant'],
                            },
                        },
                        {
                            op: 'in',
                            content: {
                                field: 'variant_class',
                                index: 'Variants',
                                value: ['SNV', 'deletion'],
                            },
                        },
                    ],
                    title: 'Ceci est une pilule',
                },
            ],
            total: 1500,
            id: '1',
        },
    ],
    active: '1',
});
WithCustomPillQuery.args = {
    id: withCustomPillQueryQbId,
    title: '1 Query with custom pill',
    enableSingleQuery: true,
    onRemoveFacet: (f: any) => f,
    onChangeQuery: (f: any) => f,
    getResolvedQueryForCount: defaultResolveCountPromise,
    fetchQueryCount: defaultFetchQuerCount,
};

/* 1 query with icon */
export const WithIconQuery = QueryBuilderStory.bind({});
const withIconQbId = QB_ID + 'WithIconQuery';
setQueryBuilderState(withIconQbId, {
    state: [
        {
            op: 'and',
            content: [
                {
                    content: {
                        value: ['something'],
                        field: 'test',
                    },
                    op: 'in',
                },
            ],
            total: 1500,
            id: '1',
        },
    ],
    active: '1',
});
WithIconQuery.args = {
    id: withIconQbId,
    title: '1 Query With Icon',
    onRemoveFacet: (f: any) => f,
    onChangeQuery: (f: any) => f,
    getResolvedQueryForCount: defaultResolveCountPromise,
    fetchQueryCount: defaultFetchQuerCount,
    IconTotal: <MdPeople />,
};

/* multi query */
export const MultiQuery = QueryBuilderStory.bind({});
const MultiQueryQbId = QB_ID + 'MultiQuery';
setQueryBuilderState(MultiQueryQbId, {
    state: [
        {
            op: 'and',
            content: [
                {
                    content: {
                        value: ['something', 'else', 'more', 'perfect'],
                        field: 'Test',
                    },
                    op: 'in',
                },
                {
                    content: {
                        value: ['something', 'else', 'more', 'perfect'],
                        field: 'More Data',
                    },
                    op: 'in',
                },
                {
                    content: {
                        value: ['something', 'else', 'more', 'perfect'],
                        field: 'Test 2',
                    },
                    op: 'in',
                },
                {
                    content: {
                        value: ['something', 'else', 'more', 'perfect'],
                        field: 'Test 3',
                    },
                    op: 'in',
                },
                {
                    content: { value: [10, 15], field: 'age' },
                    op: 'between',
                },
            ],
            total: 1500,
            id: '1',
        },
        {
            op: 'and',
            content: [
                {
                    content: { value: ['cram'], field: 'Data Type' },
                    op: 'in',
                },
            ],
            total: 1500,
            id: '2',
        },
    ],
    active: '2',
});
MultiQuery.args = {
    id: MultiQueryQbId,
    title: 'Multi Query',
    onRemoveFacet: (f: any) => f,
    onChangeQuery: (f: any) => f,
    getResolvedQueryForCount: defaultResolveCountPromise,
    fetchQueryCount: defaultFetchQuerCount,
};

/* multi query with combine */
export const MultiQueryWithCombine = QueryBuilderStory.bind({});
const MultiQueryWithCombineQbId = QB_ID + 'MultiQueryWithCombine';
setQueryBuilderState(MultiQueryWithCombineQbId, {
    state: [
        {
            op: 'or',
            content: [
                {
                    content: { value: ['something'], field: 'Test 1' },
                    op: 'in',
                },
                {
                    content: { value: ['else'], field: 'Test 2' },
                    op: 'in',
                },
                {
                    content: { value: ['more'], field: 'Test 3' },
                    op: 'in',
                },
            ],
            total: 1500,
            id: '1',
        },
        {
            op: 'and',
            content: [
                {
                    content: { value: ['something'], field: 'Test 1' },
                    op: 'in',
                },
                {
                    content: { value: ['else'], field: 'Test 2' },
                    op: 'in',
                },
            ],
            total: 1500,
            id: '2',
        },
        {
            op: 'and',
            content: [
                {
                    content: { value: ['something'], field: 'Test 1' },
                    op: 'in',
                },
            ],
            total: 1500,
            id: '3',
        },
        {
            op: 'and',
            content: [0, 1, 2],
            total: 3000,
            id: '4',
        },
    ],
    active: '1',
});
MultiQueryWithCombine.args = {
    id: MultiQueryWithCombineQbId,
    title: 'Multi Query With Combine',
    cacheKey: 'test',
    enableCombine: true,
    onRemoveFacet: (f: any) => f,
    onChangeQuery: (f: any) => f,
    getResolvedQueryForCount: defaultResolveCountPromise,
    fetchQueryCount: defaultFetchQuerCount,
};

/* with header */
export const WithQueryPillFilters = QueryBuilderStory.bind({});
const withQueryPillFilterQbId = QB_ID + 'WithQueryPillFilters';
setQueryBuilderState(withQueryPillFilterQbId, {
    state: [
        {
            op: 'and',
            content: [
                {
                    content: {
                        value: ['something', 'else', 'more', 'perfect'],
                        field: 'test',
                    },
                    op: 'in',
                },
            ],
            total: 1500,
            id: '1',
        },
        {
            op: 'and',
            content: [
                {
                    content: { value: ['else'], field: 'test' },
                    op: 'in',
                },
            ],
            total: 1500,
            id: '2',
        },
    ],
    active: '1',
});
WithQueryPillFilters.args = {
    id: withQueryPillFilterQbId,
    title: 'With Query Pill Filters',
    showHeader: true,
    showHeaderTools: true,
    onRemoveFacet: (f: any) => f,
    onChangeQuery: (f: any) => f,
    getResolvedQueryForCount: defaultResolveCountPromise,
    fetchQueryCount: defaultFetchQuerCount,
    facetFilterConfig: {
        enable: true,
    },
    IconTotal: <MdPeople />,
};

/* with header */
export const WithHeader = QueryBuilderStory.bind({});
const withHeaderQbId = QB_ID + 'WithHeader';
setQueryBuilderState(withHeaderQbId, {
    state: [
        {
            op: 'and',
            content: [
                {
                    content: {
                        value: ['something'],
                        field: 'test',
                    },
                    op: 'in',
                },
            ],
            total: 1500,
            id: '1',
        },
    ],
    active: '1',
});
WithHeader.args = {
    id: withHeaderQbId,
    title: 'With Header',
    headerConfig: {
        showHeader: true,
        defaultTitle: 'Queries',
    },
    onRemoveFacet: (f: any) => f,
    onChangeQuery: (f: any) => f,
    getResolvedQueryForCount: defaultResolveCountPromise,
    fetchQueryCount: defaultFetchQuerCount,
    IconTotal: <MdPeople />,
};

/* with header */
export const WithHeaderAndTools = QueryBuilderStory.bind({});
const withHeaderAndToolsQbID = QB_ID + 'WithHeaderAndTools';
setQueryBuilderState(withHeaderAndToolsQbID, {
    state: [
        {
            op: 'and',
            content: [
                {
                    content: {
                        value: ['something 1', 'else 2', 'more 2', 'perfect 2'],
                        field: 'test',
                    },
                    op: 'in',
                },
                {
                    content: {
                        value: ['something 2', 'else 3', 'more 3', 'perfect 3'],
                        field: 'test2',
                    },
                    op: 'in',
                },
            ],
            total: 1500,
            id: '1',
        },
    ],
    active: '1',
});
WithHeaderAndTools.args = {
    id: withHeaderAndToolsQbID,
    title: 'With header and header tools',
    getResolvedQueryForCount: defaultResolveCountPromise,
    fetchQueryCount: defaultFetchQuerCount,
    headerConfig: {
        showHeader: true,
        showTools: true,
        defaultTitle: 'Untitled Query',
        options: {
            enableDuplicate: true,
            enableEditTitle: true,
            enableShare: true,
            enableUndoChanges: true,
        },
        selectedSavedFilter: {
            id: '1',
            title: 'Mon filtre 1',
            default: true,
            queries: [
                {
                    op: 'and',
                    content: [
                        {
                            content: {
                                value: ['something 1', 'else 2', 'more 2', 'perfect 2'],
                                field: 'test',
                                op: 'in',
                            },
                        },
                        {
                            content: {
                                value: ['something 2', 'else 3', 'more 3', 'perfect 3'],
                                field: 'test2',
                                op: 'in',
                            },
                        },
                    ],
                    total: 1500,
                    id: '1',
                },
            ],
        },
        savedFilters: [
            {
                title: 'My query',
                op: 'and',
                content: [
                    {
                        content: {
                            value: ['something 1', 'else 2', 'more 2', 'perfect 2'],
                            field: 'test',
                            op: 'in',
                        },
                    },
                ],
                total: 1500,
                id: '1',
                updated_date: '2022-09-23T03:02:01.286Z',
            },
            {
                title: 'My query 2',
                op: 'and',
                content: [
                    {
                        content: {
                            value: ['something 1', 'else 2', 'more 2', 'perfect 2'],
                            field: 'test',
                            op: 'in',
                        },
                    },
                ],
                total: 1500,
                id: '2',
                updated_date: '2022-09-23T03:02:01.286Z',
            },
        ],
        onSaveQuery: (filter: any) => {
            console.log(filter);
        },
        onDuplicateQuery: (filter: any) => {},
        onDeleteQuery: (filter: any) => {},
        maxNameCapSavedQuery: 200,
    },
    onRemoveFacet: (f: any) => f,
    onChangeQuery: (f: any) => f,
    IconTotal: <MdPeople />,
};

/* with name mapping */
export const WithNameMapping = QueryBuilderStory.bind({});
const withNameMappingQbId = QB_ID + 'WithNameMapping';
setQueryBuilderState(withNameMappingQbId, {
    state: [
        {
            op: 'and',
            content: [
                {
                    content: {
                        value: [
                            'somethingsomethingsomethingsomethingsomething',
                            'elsesomethingsomethingsomethingsomethingsomethingsomething',
                            'more',
                            'perfect',
                        ],
                        field: 'test',
                    },
                    op: 'in',
                },
                {
                    content: {
                        value: [
                            'somethingsomethingsomethingsomethingsomething',
                            'elsesomethingsomethingsomethingsomethingsomethingsomething',
                            'more',
                            'perfect',
                        ],
                        field: 'test',
                    },
                    op: 'in',
                },
            ],
            total: 1500,
            id: '1',
        },
        {
            op: 'and',
            content: [
                {
                    content: { value: ['else'], field: 'test' },
                    op: 'in',
                },
            ],
            total: 1500,
            id: '2',
        },
    ],
    active: '1',
});
WithNameMapping.args = {
    id: withNameMappingQbId,
    title: 'With facet and value mapping',
    onRemoveFacet: (f: any) => f,
    onChangeQuery: (f: any) => f,
    getResolvedQueryForCount: defaultResolveCountPromise,
    fetchQueryCount: defaultFetchQuerCount,
    dictionary: {
        query: {
            facet: (facet: string) => {
                if (facet == 'test') {
                    return 'Mapped facet name';
                }
            },
            facetValueMapping: {
                test: {
                    something: 'mapped value name',
                },
            },
        },
    },
    IconTotal: <MdPeople />,
};

/* remoteComponent */
export const RemoteComponentQuery = QueryBuilderStory.bind({});
const RemoteComponentQueryQbId = QB_ID + 'RemoteComponentQuery';
setQueryBuilderState(RemoteComponentQueryQbId, {
    state: [
        {
            op: 'and',
            content: [
                {
                    content: {
                        value: ['something'],
                        field: 'test',
                        remoteComponent: {
                            id: 'remoteComponent',
                            props: {
                                customProps: 'customProps',
                            },
                        },
                    },
                    op: 'in',
                },
            ],
            total: 1500,
            id: '1',
        },
    ],
    active: '1',
});
RemoteComponentQuery.args = {
    id: RemoteComponentQueryQbId,
    title: 'Remote Component',
    onRemoveFacet: (f: any) => f,
    onChangeQuery: (f: any) => f,
    getResolvedQueryForCount: defaultResolveCountPromise,
    fetchQueryCount: defaultFetchQuerCount,
    remoteComponentMapping: (remoteComponent: IRemoteComponent) => {
        console.log('remoteComponentMapping has been called', remoteComponent);
    },
};
