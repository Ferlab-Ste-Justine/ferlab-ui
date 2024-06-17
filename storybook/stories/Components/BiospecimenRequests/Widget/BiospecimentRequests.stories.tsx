import React from 'react';
import { Meta } from "@storybook/react"
import BiospecimenRequestsWidget from '@ferlab/ui/core/components/Widgets/BiospecimenRequests';

const data = [
    {
        created_date: '2023-12-18T20:03:16.113Z',
        id: '01bba984-2915-4e14-81ea-f706ca3fd545',
        setType: 'biospecimen-request',
        size: 2,
        tag: 'biospecimen request 1',
        updated_date: '2023-12-18T20:03:16.113Z',
    },
    {
        created_date: '2023-07-18T20:03:16.113Z',
        id: '01bba984-2915-4e14-81ea-f706ca3fd541',
        setType: 'biospecimen-request',
        size: 2,
        tag: 'biospecimen request 2',
        updated_date: '2023-08-18T20:03:16.113Z',
    },
];



export default {
    title: "@ferlab/Components/Widgets/BiospecimentRequestsWidget",
    component: BiospecimenRequestsWidget,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

export const BiospecimentRequestsWidgetStories = () => (
  <>
  <h2>Biospeciment Requests Widget</h2>
  <BiospecimenRequestsWidget id={'1'} data={data} loading={false} 
    handleListItemEdit={(id: string, name: string, callback: () => void) => {
      console.log('handleListItemEdit(id, name, callback)', id, name, callback); 
    }} 
    handleListItemClick={(id: string) => {
      console.log('handleListItemClick(id)', id);
    } } 
    handleListItemShare={async(id: string) => {
      console.log('handleListItemShare(id)', id);
    } } 
    handleListItemDelete={(id: string) => {
      console.log('handleListItemDelete(id)', id);
    } }  
  />
  </>

);
