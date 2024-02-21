import React from 'react';
import { Meta } from "@storybook/react";

import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons';
import AuthorizedStudiesWidget, {FENCE_AUTHENTIFICATION_STATUS} from '@ferlab/ui/core/components/Widgets/AuthorizedStudies';

const authorizedStudies = {
    error: false,
    loading: false,
    studies: [
        {
            authorized_controlled_files_count: 9152,
            study_code: 'STUDY_CODE_1',
            study_id: 'STUDY_ID_1',
            title: 'Title 1',
            total_controlled_files_count: 9152,
            total_files_count: 9152,
            total_uncontrolled_files_count: 0,
            user_acl_in_study: ['xxxxx1.x1', 'xxxxx2.x2'],
        },
        {
            authorized_controlled_files_count: 682,
            study_code: 'STUDY_CODE_2',
            study_id: 'STUDY_ID_2',
            title: 'Title 2',
            total_controlled_files_count: 12679,
            total_files_count: 16735,
            total_uncontrolled_files_count: 4056,
            user_acl_in_study: ['xxxxx3.x3'],
        },
    ],
};

const services = [
    {
        fence: 'fence1',
        icon: <PlusCircleFilled height={45} width={45} />,
        name: 'Fence 1',
        onConnectToFence: () => {},
        onDisconnectFromFence: () => {},
    },
    {
        fence: 'fence2',
        icon: <MinusCircleFilled height={45} width={45} />,
        name: 'Fence 2',
        onConnectToFence: () => {},
        onDisconnectFromFence: () => {},
    },
];
const queryProps = {
    fileIndex: 'file-index',
    participantIndex: 'participant-index',
    queryBuilderId: 'query-build-id',
    to: 'route/',
};



export default {
    title: "@ferlab/Components/Widgets/AuthorizedStudies",
    component: AuthorizedStudiesWidget,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;


export const AuthorizedStudiesLoadingStory = () => (
    <>
        <h2>AuthorizedStudies loading</h2>
        <div>
                <AuthorizedStudiesWidget 
                id={'1'} 
                authorizedStudies={{
                    loading: false,
                    error: false,
                    studies: []
                }}
                services={services}
                queryProps={queryProps}
                fences={[
                    {
                        acl: [],
                        error: false,
                        id: 'fence1',
                        loading: false,
                        status: FENCE_AUTHENTIFICATION_STATUS.unknown,
                    },
                    {
                        acl: [],
                        error: false,
                        id: 'fence2',
                        loading: false,
                        status: FENCE_AUTHENTIFICATION_STATUS.unknown,
                    },
                ]}
                />
        </div>
    </>
);



export const AuthorizedStudiesSingleServiceDisconnectedStory = () => (
    <>
        <h2>AuthorizedStudies with a single service and disconnected fences</h2>
        <div>
                <AuthorizedStudiesWidget 
                id={'1'} 
                authorizedStudies={{
                    loading: false,
                    error: false,
                    studies: []
                }}
                services={[services[0]]}
                queryProps={queryProps}
                fences={[
                    {
                        acl: [],
                        error: false,
                        id: 'fence1',
                        loading: false,
                        status: FENCE_AUTHENTIFICATION_STATUS.disconnected,
                    },
                ]}
                />
        </div>
    </>
);

export const AuthorizedStudiesWithASingleServiceStory = () => (
    <>
        <h2>AuthorizedStudies With a single service</h2>
        <div>
            <AuthorizedStudiesWidget 
              id={'1'}
              authorizedStudies={{
                loading: false,
                error: false,
                studies: []
              }}
              services={[services[0]]}
              queryProps={queryProps}
              fences= {[
                  {
                      acl: [],
                      error: false,
                      id: 'fence1',
                      loading: false,
                      status: FENCE_AUTHENTIFICATION_STATUS.connected,
                  },
                  {
                      acl: ['xxxxx1.x1', 'xxxxx2.x2', 'xxxxx3.x3'],
                      error: false,
                      id: 'fence2',
                      loading: false,
                      status: FENCE_AUTHENTIFICATION_STATUS.connected,
                  },
              ]}
             />
        </div>
    </>
);


export const AuthorizedStudiesSingleServiceWithStudiesStory = () => (
    <>
        <h2>AuthorizedStudies With a single service and Connected Fences</h2>
        <div>
            <AuthorizedStudiesWidget 
              id={'1'}
              authorizedStudies={authorizedStudies}
              services={[services[0]]}
              queryProps={queryProps}
              fences= {[
                  {
                      acl: [],
                      error: false,
                      id: 'fence1',
                      loading: false,
                      status: FENCE_AUTHENTIFICATION_STATUS.connected,
                  },
                  {
                      acl: ['xxxxx1.x1', 'xxxxx2.x2', 'xxxxx3.x3'],
                      error: false,
                      id: 'fence2',
                      loading: false,
                      status: FENCE_AUTHENTIFICATION_STATUS.connected,
                  },
              ]}
             />
        </div>
    </>
);

export const AuthorizedStudiesSingleServiceWithEmptyListStory = () => (
    <>
        <h2>AuthorizedStudies with a single service With and empty List</h2>
        <div>
            <AuthorizedStudiesWidget 
              id={'1'}
              authorizedStudies={{
                loading: false,
                error: false,
                studies: []
              }}
              services={[services[0]]}
              queryProps={queryProps}
              fences= {[
                  {
                      acl: [],
                      error: false,
                      id: 'fence1',
                      loading: false,
                      status: FENCE_AUTHENTIFICATION_STATUS.connected,
                  }
              ]}
             />
        </div>
    </>
);

export const AuthorizedStudiesMultiServiceDisconnectedStory = () => (
    <>
        <h2>AuthorizedStudies with multi-service and disconnected fences</h2>
        <div>
                <AuthorizedStudiesWidget 
                id={'1'} 
                authorizedStudies={{
                    loading: false,
                    error: false,
                    studies: []
                }}
                services={services}
                queryProps={queryProps}
                fences={[
                    {
                        acl: [],
                        error: false,
                        id: 'fence1',
                        loading: false,
                        status: FENCE_AUTHENTIFICATION_STATUS.disconnected,
                    },
                    {
                        acl: [],
                        error: false,
                        id: 'fence2',
                        loading: false,
                        status: FENCE_AUTHENTIFICATION_STATUS.disconnected,
                    },
                ]}
                />
        </div>
    </>
);

export const AuthorizedStudiesMultiServiceWithStudiesStory = () => (
    <>
        <h2>AuthorizedStudies With multi-service and Connected Fences</h2>
        <div>
            <AuthorizedStudiesWidget 
              id={'1'}
              authorizedStudies={authorizedStudies}
              services={services}
              queryProps={queryProps}
              fences= {[
                  {
                      acl: [],
                      error: false,
                      id: 'fence1',
                      loading: false,
                      status: FENCE_AUTHENTIFICATION_STATUS.connected,
                  },
                  {
                      acl: ['xxxxx1.x1', 'xxxxx2.x2', 'xxxxx3.x3'],
                      error: false,
                      id: 'fence2',
                      loading: false,
                      status: FENCE_AUTHENTIFICATION_STATUS.connected,
                  },
              ]}
             />
        </div>
    </>
);

export const AuthorizedStudiesMultiServiceWithEmptyListStory = () => (
    <>
        <h2>AuthorizedStudies with multi-service With and empty List</h2>
        <div>
            <AuthorizedStudiesWidget 
              id={'1'}
              authorizedStudies={{
                loading: false,
                error: false,
                studies: []
              }}
              services={services}
              queryProps={queryProps}
              fences= {[
                  {
                      acl: [],
                      error: false,
                      id: 'fence1',
                      loading: false,
                      status: FENCE_AUTHENTIFICATION_STATUS.connected,
                  },
                  {
                      acl: ['xxxxx1.x1', 'xxxxx2.x2', 'xxxxx3.x3'],
                      error: false,
                      id: 'fence2',
                      loading: false,
                      status: FENCE_AUTHENTIFICATION_STATUS.connected,
                  },
              ]}
             />
        </div>
    </>
);

