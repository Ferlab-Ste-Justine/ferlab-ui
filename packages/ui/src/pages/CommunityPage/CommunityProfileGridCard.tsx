import React from 'react';
import { PropsWithChildren, ReactElement } from 'react';
import { Button, FormInstance, Skeleton, Space, Typography } from 'antd';

import GridCard from '../../view/v2/GridCard';

export const COMMUNITY_PROFILE_GRID_CARD_DEFAULT = {
    discard: 'Discard changes',
    save: 'Save changes',
};

type TCommunityProfileGridCard = {
    save: string;
    discard: string;
};

interface ICommunityProfileGridCard {
    title?: string;
    dictionary?: TCommunityProfileGridCard;
    loading: boolean;
    customSkeleton?: ReactElement;
    customHeader?: ReactElement;
    form: FormInstance;
    isValueChanged: boolean;
    onDiscardChanges: () => void;
}

const { Title } = Typography;

const CommunityProfileGridCard = ({
    children,
    customHeader,
    customSkeleton,
    dictionary = COMMUNITY_PROFILE_GRID_CARD_DEFAULT,
    form,
    isValueChanged,
    loading,
    onDiscardChanges,
    title,
}: PropsWithChildren<ICommunityProfileGridCard>): JSX.Element => (
    <GridCard
        content={
            <>
                {!loading && children}
                {loading && customSkeleton && <>{customSkeleton}</>}
                {loading && !customSkeleton && <Skeleton active paragraph={{ rows: 6 }} />}
            </>
        }
        footer={
            <>
                {loading && <Skeleton.Button active />}
                {!loading && (
                    <Space>
                        <Button disabled={!isValueChanged} onClick={form.submit} type="primary">
                            {dictionary.save}
                        </Button>
                        {isValueChanged && (
                            <Button onClick={onDiscardChanges} type="text">
                                {dictionary.discard}
                            </Button>
                        )}
                    </Space>
                )}
            </>
        }
        title={<>{customHeader ? customHeader : <Title level={4}>{title}</Title>}</>}
    />
);

export default CommunityProfileGridCard;
