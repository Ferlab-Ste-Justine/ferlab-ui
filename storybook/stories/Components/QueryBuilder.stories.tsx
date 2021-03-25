import React from "react";
import {Meta, Story} from '@storybook/react/types-6-0';
import { MdPeople } from 'react-icons/md';

import QueryBuilder, {IQueryBuilderProps} from '@ferlab/ui/components/QueryBuilder';


export default {
    title: "@ferlab/Components/QueryBuilder",
    component: QueryBuilder,
    decorators: [(Story) => <><h2>{Story}</h2><Story/></>],
    argTypes: {
        className: {
            control: 'text'
        },
        dictionary: {
            control: 'object'
        },
        total: {
            control: 'number'
        },
        loading: {
            control: 'boolean'
        },
        enableCombine: {
            control: 'boolean'
        }
    },
  } as Meta;


const QueryBuilderStory = ({title, ...props} : {title: string, props: Story<IQueryBuilderProps>}) => (
    <>
        <h3>{title}</h3>
        <QueryBuilder {...props}  />
    </>
);


/* Empty */
export const QueryBuilderEmpty = QueryBuilderStory.bind({});
QueryBuilderEmpty.args = {
    title: 'QueryBuilder Empty',
    total: 1350,
    currentQuery: (f) => f,
    onRemoveFacet: (f) => f,
    onChangeQuery: (f) => f,
};

/* Empty */
export const QueryBuilderEmptyWithShowLabelsButton = QueryBuilderStory.bind({});
QueryBuilderEmptyWithShowLabelsButton.args = {
    enableShowHideLabels: true,
    title: 'QueryBuilder With Show Hide Labels Enable',
    currentQuery: (f) => f,
    onRemoveFacet: (f) => f,
    onChangeQuery: (f) => f,
    initialState: {
        state: [{
            query: {op: 'and', content: [{
                content: {value: ['something'], field: 'test', op: 'in'}
            }]},
            total: 1500,
            id: '1',  
        }],
        active: '1'
    }
};

/* 1 query */
export const QueryBuilderOneQuery = QueryBuilderStory.bind({});
QueryBuilderOneQuery.args = {
    title: 'QueryBuilder 1 Query',
    onRemoveFacet: (f) => f,
    onChangeQuery: (f) => f,
    initialState: {
        state: [{
            query: {op: 'and', content: [{
                content: {value: ['something'], field: 'test', op: 'in'}
            }]},
            total: 1500,
            id: '1',  
        }],
        active: '1'
    }
};

/* 1 query */
export const QueryBuilderOneQuerySingleQuery = QueryBuilderStory.bind({});
QueryBuilderOneQuerySingleQuery.args = {
    title: 'QueryBuilder Single Query',
    enableSingleQuery: true,
    onRemoveFacet: (f) => f,
    onChangeQuery: (f) => f,
    initialState: {
        state: [{
            query: {op: 'and', content: [{
                content: {value: ['something'], field: 'test', op: 'in'}
            }]},
            total: 1500,
            id: '1',  
        }],
        active: '1'
    }
};

/* 1 query with icon */
export const QueryBuilderOneWihtIconQuery = QueryBuilderStory.bind({});
QueryBuilderOneWihtIconQuery.args = {
    title: 'QueryBuilder 1 Query With Icon',
    onRemoveFacet: (f) => f,
    onChangeQuery: (f) => f,
    initialState: {
        state: [{
            query: {op: 'and', content: [{
                content: {value: ['something'], field: 'test', op: 'in'}
            }]},
            total: 1500,
            id: '1',  
        }],
        active: '1'
    },
    IconTotal:<MdPeople />
};

/* multi query */
export const QueryBuilderMultiQuery = QueryBuilderStory.bind({});
QueryBuilderMultiQuery.args = {
    title: 'QueryBuilder Multi Query',
    onRemoveFacet: (f) => f,
    onChangeQuery: (f) => f,
    initialState: {
        state: [{
            query: {op: 'and', content: [{
                content: {value: ['something', 'else', 'more', 'perfect'], field: 'Test'}, op: 'in'
            },{
                content: {value: ['something', 'else', 'more', 'perfect'], field: 'More Data'}, op: 'in'
            },{
                content: {value: ['something', 'else', 'more', 'perfect'], field: 'Test 2'}, op: 'in'
            },{
                content: {value: ['something', 'else', 'more', 'perfect'], field: 'Test 3'}, op: 'in'
            },{
                content: {value: [10,15], field: 'age'},  op: 'between'
            }]},
            total: 1500,
            id: '1',  
        },{
            query: {op: 'and', content: [{
                content: {value: ['cram'], field: 'Data Type'}, op: 'in'
            }]},
            total: 1500,
            id: '2',  
        }],
        active: '2'
    }
};
