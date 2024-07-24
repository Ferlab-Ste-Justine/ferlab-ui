import React from 'react';
import { Skeleton, Space, Typography } from 'antd';

import Gravatar from '../../components/Gravatar';
import { formatCountryAndState, formatUserName } from '../../utils/stringUtils';

import CommunityUserAvatar from './CommunityUserAvatar';
import { IUser } from './type';

import styles from './CommunityMemberProfilePage.module.css';

export interface ICommunityAvatarHeader {
    user?: IUser;
    src?: string;
    loading?: boolean;
}

const CommunityAvatarHeader = ({ loading = false, src, user }: ICommunityAvatarHeader): JSX.Element => {
    if (loading || !user) {
        return (
            <Space align="center" className={styles.avatarContainer} direction="vertical" size={16}>
                <Skeleton.Avatar active size={140} />
                <Space align="center" direction="vertical" size={8}>
                    <Skeleton active className={styles.memberNameSkeleton} loading paragraph={false} />
                    <Skeleton active className={styles.memberAssoSkeleton} loading paragraph={false} />
                </Space>
            </Space>
        );
    }

    return (
        <Space align="center" className={styles.avatarContainer} direction="vertical" size={16}>
            {user?.profile_image_key ? (
                <CommunityUserAvatar shape="round" size={140} src={src} />
            ) : (
                <Gravatar circle id={`${user.first_name}${user.last_name}`} size={140} />
            )}
            <Space align="center" direction="vertical" size={8}>
                <>
                    <Typography.Title className={styles.memberName} level={3}>
                        {formatUserName(user)}
                    </Typography.Title>
                    {user?.affiliation && <Typography.Text type="secondary">{user?.affiliation}</Typography.Text>}
                    {(user?.location_country || user?.location_state) && (
                        <Typography.Text type="secondary">{formatCountryAndState(user)}</Typography.Text>
                    )}
                </>
            </Space>
        </Space>
    );
};

export default CommunityAvatarHeader;
