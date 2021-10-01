import React from "react";
import {Meta, Story} from '@storybook/react/types-6-0';
import { MdPeople } from 'react-icons/md';
import QueryBuilder, {IQueryBuilderProps} from '@ferlab/ui/components/QueryBuilder';


export default {
    title: "@ferlab/Components/QueryBuilder/QueryBuilder",
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
export const Empty = QueryBuilderStory.bind({});
Empty.args = {
    title: 'Empty',
    total: 1350,
    enableSingleQuery: true,
    currentQuery: (f) => f,
    onRemoveFacet: (f) => f,
    onChangeQuery: (f) => f,
};

/* Empty */
export const WithShowLabelsButton = QueryBuilderStory.bind({});
WithShowLabelsButton.args = {
    enableShowHideLabels: true,
    title: 'With Show Hide Labels Enable',
    currentQuery: (f) => f,
    onRemoveFacet: (f) => f,
    onChangeQuery: (f) => f,
    initialState: {
        state: [{
            op: 'and', content: [{
                content: {value: ['something'], field: 'test', op: 'in'}
            },
            {
                content: {value: ['false'], field: 'test1', op: 'in'}
            }],
            total: 1500,
            id: '1',  
        }],
        active: '1'
    }
};

/* 1 query */
export const OneQuery = QueryBuilderStory.bind({});
OneQuery.args = {
    title: '1 Query',
    onRemoveFacet: (f) => f,
    onChangeQuery: (f) => f,
    initialState: {
        state: [{
            op: 'and', content: [{
                content: {value: ['something'], field: 'test', op: 'in'}
            }],
            total: 1500,
            id: '1',  
        }],
        active: '1'
    }
};

/* 1 query */
export const SingleQuery = QueryBuilderStory.bind({});
SingleQuery.args = {
    title: 'Single Query',
    enableSingleQuery: true,
    onRemoveFacet: (f) => f,
    onChangeQuery: (f) => f,
    initialState: {
        state: [{
            op: 'and', content: [{
                content: {value: ['something'], field: 'test', op: 'in'}
            }],
            total: 1500,
            id: '1',  
        }],
        active: '1'
    }
};

/* 1 query with icon */
export const WithIconQuery = QueryBuilderStory.bind({});
WithIconQuery.args = {
    title: '1 Query With Icon',
    onRemoveFacet: (f) => f,
    onChangeQuery: (f) => f,
    initialState: {
        state: [{
            op: 'and', content: [{
                content: {value: ['something'], field: 'test', op: 'in'}
            }],
            total: 1500,
            id: '1',  
        }],
        active: '1'
    },
    IconTotal:<MdPeople />
};

/* multi query */
export const MultiQuery = QueryBuilderStory.bind({});
MultiQuery.args = {
    title: 'Multi Query',
    onRemoveFacet: (f) => f,
    onChangeQuery: (f) => f,
    initialState: {
        state: [{
            op: 'and', 
            content: [{
                content: {value: ['something', 'else', 'more', 'perfect'], field: 'Test'}, op: 'in'
            },{
                content: {value: ['something', 'else', 'more', 'perfect'], field: 'More Data'}, op: 'in'
            },{
                content: {value: ['something', 'else', 'more', 'perfect'], field: 'Test 2'}, op: 'in'
            },{
                content: {value: ['something', 'else', 'more', 'perfect'], field: 'Test 3'}, op: 'in'
            },{
                content: {value: [10,15], field: 'age'},  op: 'between'
            }],
            total: 1500,
            id: '1',  
        },{
            op: 'and', content: [{
                content: {value: ['cram'], field: 'Data Type'}, op: 'in'
            }],
            total: 1500,
            id: '2',  
        }],
        active: '2'
    }
};

/* multi query with combine */
export const MultiQueryWithCombine = QueryBuilderStory.bind({});
MultiQueryWithCombine.args = {
    title: 'Multi Query With Combine',
    cacheKey: 'test',
    enableCombine: true,
    onRemoveFacet: (f) => f,
    onChangeQuery: (f) => f,
    initialState: {
        state: [{
            op: 'or', content: [{
                content: {value: ['something'], field: 'Test 1'}, op: 'in'
            },
            {
                content: {value: ['else'], field: 'Test 2'}, op: 'in'
            },
            {
                content: {value: ['more'], field: 'Test 3'}, op: 'in'
            }],
            total: 1500,
            id: '1',  
        },{
            op: 'and', content: [{
                content: {value: ['something'], field: 'Test 1'}, op: 'in'
            },
            {
                content: {value: ['else'], field: 'Test 2'}, op: 'in'
            }],
            total: 1500,
            id: '2',  
        },{
            op: 'and', content: [{
                content: {value: ['something'], field: 'Test 1'}, op: 'in'
            }],
            total: 1500,
            id: '3',  
        },
        {
            op: 'and', content: [0, 1, 2],
            total: 3000,
            id: '4',  
        }],
        active: '1'
    }
};

/* with header */
export const WithQueryPillFilters = QueryBuilderStory.bind({});
WithQueryPillFilters.args = {
    title: 'With Query Pill Filters',
    showHeader: true,
    showHeaderTools: true,
    onRemoveFacet: (f) => f,
    onChangeQuery: (f) => f,
    enableFacetFilter: true,
    initialState: {
        state: [{
            op: 'and', content: [{
                content: {value: ['something', 'else', 'more', 'perfect'], field: 'test', op: 'in'}
            }],
            total: 1500,
            id: '1',  
        },
        {
            op: 'and', content: [{
                content: {value: ['else'], field: 'test', op: 'in'}
            }],
            total: 1500,
            id: '2',  
        }],
        active: '1'
    },
    IconTotal:<MdPeople />
};

/* with header */
export const WithHeader = QueryBuilderStory.bind({});
WithHeader.args = {
    title: 'With Header',
    showHeader: true,
    onRemoveFacet: (f) => f,
    onChangeQuery: (f) => f,
    initialState: {
        state: [{
            op: 'and', content: [{
                content: {value: ['something'], field: 'test', op: 'in'}
            }],
            total: 1500,
            id: '1',  
        }],
        active: '1'
    },
    IconTotal:<MdPeople />
};

/* with header */
export const WithHeaderAndTools = QueryBuilderStory.bind({});
WithHeaderAndTools.args = {
    title: 'With header and header tools',
    headerConfig: {
        showHeader: true,
        showTools: true,
        defaultTitle: "Untitled Query",
        options: {
            enableDuplicate: true,
            enableEditTitle: true,
            enableShare: true,
        },
        savedFilters: [],
          onSaveQuery: (filter: any) => {},
          onDuplicateQuery: (filter: any) => {},
          onDeleteQuery: (filter: any) => {},
    },      
    onRemoveFacet: (f) => f,
    onChangeQuery: (f) => f,
    IconTotal:<MdPeople />
};

/* with name mapping */
export const WithNameMapping = QueryBuilderStory.bind({});
WithNameMapping.args = {
    title: 'With facet and value mapping',
    showHeader: true,
    showHeaderTools: true,
    onRemoveFacet: (f) => f,
    onChangeQuery: (f) => f,
    enableFacetFilter: true,
    dictionary: {   
        query: {
            facet: (facet: string) => {
                if (facet == "test") {
                    return "Mapped facet name"
                }
            },
            facetValueMapping: {
                "test": {
                    "something": "mapped value name"
                }
            }
        }
    },
    initialState: {
        state: [{
            op: 'and', content: [{
                content: {value: ['something', 'else', 'more', 'perfect'], field: 'test', op: 'in'}
            }],
            total: 1500,
            id: '1',  
        },
        {
            op: 'and', content: [{
                content: {value: ['else'], field: 'test', op: 'in'}
            }],
            total: 1500,
            id: '2',  
        }],
        active: '1'
    },
    IconTotal:<MdPeople />
};