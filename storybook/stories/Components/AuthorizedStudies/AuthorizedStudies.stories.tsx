import React from 'react';
import { Meta } from "@storybook/react/types-6-0";

import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons';
import AuthorizedStudiesWidget, {FENCE_AUHTENTIFICATION_STATUS} from '@ferlab/ui/components/AuthorizedStudies';

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
    title: "@ferlab/Components/AuthorizedStudies",
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

export const AuthorizedStudiesBasicStory = () => (
    <>
        <h2>AuthorizedStudies with disconnected fences</h2>
        <div style={{width: '400px' }}>
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
                        status: FENCE_AUHTENTIFICATION_STATUS.unknown,
                    },
                    {
                        acl: [],
                        error: false,
                        id: 'fence2',
                        loading: false,
                        status: FENCE_AUHTENTIFICATION_STATUS.unknown,
                    },
                ]}
                />
        </div>
    </>
);

// React-router is broken with our current version, wait for new storybook to uncomment
// export const AuthorizedStudiesWithStudiesStory = () => (
//     <>
//         <h2>AuthorizedStudies With Connected Fences</h2>
//         <div style={{width: '400px' }}>
//             <AuthorizedStudiesWidget 
//               id={'1'}
//               authorizedStudies={authorizedStudies}
//               services={services}
//               queryProps={queryProps}
//               fences= {[
//                   {
//                       acl: [],
//                       error: false,
//                       id: 'fence1',
//                       loading: false,
//                       status: FENCE_AUHTENTIFICATION_STATUS.connected,
//                   },
//                   {
//                       acl: ['xxxxx1.x1', 'xxxxx2.x2', 'xxxxx3.x3'],
//                       error: false,
//                       id: 'fence2',
//                       loading: false,
//                       status: FENCE_AUHTENTIFICATION_STATUS.connected,
//                   },
//               ]}
//              />
//         </div>
//     </>
// );

export const AuthorizedStudiesWithEmptyListStory = () => (
    <>
        <h2>AuthorizedStudies With Empty List</h2>
        <div style={{width: '400px' }}>
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
                      status: FENCE_AUHTENTIFICATION_STATUS.connected,
                  },
                  {
                      acl: ['xxxxx1.x1', 'xxxxx2.x2', 'xxxxx3.x3'],
                      error: false,
                      id: 'fence2',
                      loading: false,
                      status: FENCE_AUHTENTIFICATION_STATUS.connected,
                  },
              ]}
             />
        </div>
    </>
);

