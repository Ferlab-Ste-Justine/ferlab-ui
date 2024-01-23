import React from 'react';
import { Meta } from "@storybook/react";
import CavaticaWidget, { CAVATICA_API_ERROR_TYPE } from '@ferlab/ui/core/components/Widgets/Cavatica';
import { PASSPORT_AUTHENTIFICATION_STATUS } from '@ferlab/ui/core/components/Widgets/Cavatica/type';


export default {
    title: "@ferlab/Components/Widgets/Cavatica",
    component: CavaticaWidget,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;


export const CavaticaBasicStory = () => (
    <>
        <h2>Cavatica with loading</h2>
        <div style={{width: '400px' }}>
            <CavaticaWidget 
              id={'1'} 
              cavatica={{
                authentification: {
                    error: false,
                    loading: true,
                    status: PASSPORT_AUTHENTIFICATION_STATUS.unknown,
                },
                billingGroups: {
                    data: [],
                    error: false,
                    loading: false,
                },
                projects: {
                    data: [],
                    error: false,
                    loading: true,
                },
              }} cavaticaUrl={''} 
                createProjectModalProps={{
                  handleSubmit: (values) => {console.log("createProjectModalProps.handleSubmit");}
                }} 
                handleErrorModalReset={() => {console.log("handleErrorModalReset")}} 
                handleConnection={() => {console.log("handleConnection"); } } 
                handleDisconnection={() => {console.log("handleDisconnection"); }}
              />
        </div>
    </>
);


export const CavaticaBillingsGroupErrorStory = () => (
    <>
        <h2>Cavatica with a failed attemp to fetch billings group</h2>
        <div style={{width: '400px' }}>
            <CavaticaWidget 
              id={'1'} 
              cavatica={{
                authentification: {
                    error: false,
                    loading: true,
                    status: PASSPORT_AUTHENTIFICATION_STATUS.unknown,
                },
                billingGroups: {
                    data: [],
                    error: true,
                    loading: false,
                },
                projects: {
                    data: [],
                    error: false,
                    loading: true,
                },
              }} cavaticaUrl={''} 
                createProjectModalProps={{
                  handleSubmit: (values) => {console.log("createProjectModalProps.handleSubmit");}
                }} 
                handleErrorModalReset={() => {console.log("handleErrorModalReset")}} 
                handleConnection={() => {console.log("handleConnection"); } } 
                handleDisconnection={() => {console.log("handleDisconnection"); }}
              />
        </div>
    </>
);


export const CavaticaFetchProjectErrorStory = () => (
    <>
        <h2>Cavatica with with a failed attemp to fetch project</h2>
        <div style={{width: '400px' }}>
            <CavaticaWidget 
              id={'1'} 
              cavatica={{
                authentification: {
                    error: false,
                    loading: false,
                    status: PASSPORT_AUTHENTIFICATION_STATUS.unknown,
                },
                billingGroups: {
                    data: [],
                    error: false,
                    loading: false,
                },
                projects: {
                    data: [],
                    error: CAVATICA_API_ERROR_TYPE.fetch,
                    loading: false,
                },
              }} cavaticaUrl={''} 
                createProjectModalProps={{
                  handleSubmit: (values) => {console.log("createProjectModalProps.handleSubmit");}
                }} 
                handleErrorModalReset={() => {console.log("handleErrorModalReset")}} 
                handleConnection={() => {console.log("handleConnection"); } } 
                handleDisconnection={() => {console.log("handleDisconnection"); }}
              />
        </div>
    </>
);


export const CavaticaCreateProjectErrorStory = () => (
    <>
        <h2>Cavatica with with a failed attemp to fetch project</h2>
        <div style={{width: '400px' }}>
            <CavaticaWidget 
              id={'1'} 
              cavatica={{
                authentification: {
                    error: false,
                    loading: false,
                    status: PASSPORT_AUTHENTIFICATION_STATUS.unknown,
                },
                billingGroups: {
                    data: [],
                    error: false,
                    loading: false,
                },
                projects: {
                    data: [],
                    error: CAVATICA_API_ERROR_TYPE.create,
                    loading: false,
                },
              }} cavaticaUrl={''} 
                createProjectModalProps={{
                  handleSubmit: (values) => {console.log("createProjectModalProps.handleSubmit");}
                }} 
                handleErrorModalReset={() => {console.log("handleErrorModalReset")}} 
                handleConnection={() => {console.log("handleConnection"); } } 
                handleDisconnection={() => {console.log("handleDisconnection"); }}
              />
        </div>
    </>
);

export const CavaticaAuthErrorStory = () => (
    <>
        <h2>Cavatica with authentification error</h2>
        <div style={{width: '400px' }}>
            <CavaticaWidget 
              id={'1'} 
              cavatica={{
                authentification: {
                    error: true,
                    loading: true,
                    status: PASSPORT_AUTHENTIFICATION_STATUS.unknown,
                },
                billingGroups: {
                    data: [],
                    error: false,
                    loading: false,
                },
                projects: {
                    data: [],
                    error: false,
                    loading: false,
                },
              }} cavaticaUrl={''} 
                createProjectModalProps={{
                  handleSubmit: (values) => {console.log("createProjectModalProps.handleSubmit");}
                }} 
                handleErrorModalReset={() => {console.log("handleErrorModalReset")}} 
                handleConnection={() => {console.log("handleConnection"); } } 
                handleDisconnection={() => {console.log("handleDisconnection"); }}
              />
        </div>
    </>
);