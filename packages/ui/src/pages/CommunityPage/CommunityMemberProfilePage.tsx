import React from 'react';
import { Divider, Skeleton } from 'antd';

import CommunityAvatarHeader from './CommunityAvatarHeader';
import CommunityBanner, {
    DEFAULT_COMMUNITY_BANNER_DICTIONARY,
    ICommunityBanner,
    TCommunityBannerDictionary,
} from './CommunityBanner';
import {
    CommunityMemberProfile,
    DEFAULT_COMMUNITY_MEMBER_PROFILE_DICTIONARY,
    TCommunityMemberProfileDictionary,
    TCommunityMemberProfileOptions,
} from './CommunityMemberProfile';
import { IUser } from './type';

import styles from './CommunityMemberProfilePage.module.css';

export const DEFAULT_COMMUNITY_MEMBER_PROFILE_PAGE_DICTIONARY = {
    banner: DEFAULT_COMMUNITY_BANNER_DICTIONARY,
    profile: DEFAULT_COMMUNITY_MEMBER_PROFILE_DICTIONARY,
};

export type TCommunityMemberProfilePageDictionary = {
    banner: TCommunityBannerDictionary;
    profile: TCommunityMemberProfileDictionary;
};

interface ICommunityMemberProfilePage {
    dictionary?: TCommunityMemberProfilePageDictionary;
    user?: IUser;
    loading: boolean;
    banner: ICommunityBanner;
    avatar?: {
        src: string;
    };
    options: TCommunityMemberProfileOptions;
}

export const CommunityMemberProfilePage = ({
    avatar,
    banner,
    dictionary = DEFAULT_COMMUNITY_MEMBER_PROFILE_PAGE_DICTIONARY,
    loading,
    options,
    user,
}: ICommunityMemberProfilePage): JSX.Element => (
    <div className={styles.communityMemberWrapper}>
        <div className={styles.communityMember}>
            <CommunityBanner {...banner} dictionary={dictionary.banner} />
            <div className={styles.contentWrapper}>
                <CommunityAvatarHeader {...avatar} loading={loading} user={user} />
                <Divider className={styles.divider} />
                {loading ? (
                    <Skeleton active paragraph={{ rows: 6 }} />
                ) : (
                    <CommunityMemberProfile dictionary={dictionary.profile} options={options} user={user} />
                )}
            </div>
        </div>
    </div>
);

export default CommunityMemberProfilePage;
