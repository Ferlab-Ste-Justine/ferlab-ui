import React from 'react';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import styles from './CommunityMemberProfilePage.module.css';

export const DEFAULT_COMMUNITY_BANNER_DICTIONARY = {
    communityButton: 'Community',
    editProfile: 'Edit Profile',
};

export type TCommunityBannerDictionary = {
    communityButton: string;
    editProfile: string;
};

export interface ICommunityBanner {
    dictionary?: TCommunityBannerDictionary;
    canEditProfile: boolean;
    background: string;
    navigate: {
        profile: () => void;
        community: () => void;
    };
}

const CommunityBanner = ({
    background,
    canEditProfile,
    dictionary = DEFAULT_COMMUNITY_BANNER_DICTIONARY,
    navigate,
}: ICommunityBanner): JSX.Element => (
    <div
        className={styles.banner}
        style={{
            background: `url("${background}")`,
        }}
    >
        <div className={styles.bannerActions}>
            <Button
                className={styles.communityBtn}
                icon={<ArrowLeftOutlined />}
                onClick={navigate.community}
                type="link"
            >
                {dictionary.communityButton}
            </Button>
            {canEditProfile && (
                <Button
                    className={styles.editBtn}
                    ghost
                    icon={<EditOutlined />}
                    onClick={navigate.profile}
                    type="primary"
                >
                    {dictionary.editProfile}
                </Button>
            )}
        </div>
    </div>
);

export default CommunityBanner;
