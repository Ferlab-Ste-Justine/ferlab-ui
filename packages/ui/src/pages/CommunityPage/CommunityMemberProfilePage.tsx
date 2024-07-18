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

interface ICommunityMemberProfile {
    dictionary?: TCommunityMemberProfilePageDictionary;
    user?: IUser;
    loading: boolean;
    banner: ICommunityBanner;
    avatar?: {
        src: string;
    };
}

export const CommunityMemberProfilePage = ({
    avatar,
    banner,
    dictionary = DEFAULT_COMMUNITY_MEMBER_PROFILE_PAGE_DICTIONARY,
    loading,
    user,
}: ICommunityMemberProfile): JSX.Element => (
    <div className={styles.communityMemberWrapper}>
        <div className={styles.communityMember}>
            <CommunityBanner {...banner} dictionary={dictionary.banner} />
            <div className={styles.contentWrapper}>
                <CommunityAvatarHeader {...avatar} loading={loading} user={user} />
                <Divider className={styles.divider} />
                {loading ? (
                    <Skeleton active paragraph={{ rows: 6 }} />
                ) : (
                    <CommunityMemberProfile dictionary={dictionary.profile} user={user} />
                )}
            </div>
        </div>
    </div>
);

export default CommunityMemberProfilePage;
