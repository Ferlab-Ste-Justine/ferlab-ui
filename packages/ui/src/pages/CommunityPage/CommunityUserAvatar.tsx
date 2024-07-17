import React from 'react';
import cx from 'classnames';

import styles from './CommunityMemberProfilePage.module.css';

interface ICommunityUserAvatar {
    size?: number;
    shape?: 'square' | 'round';
    className?: string;
    src?: string | null;
}

const CommunityUserAvatar = ({ className, shape = 'round', size = 24, src }: ICommunityUserAvatar): JSX.Element => (
    <img
        className={cx(className, {
            [styles.userAvatarRound]: shape === 'round',
        })}
        height={size}
        src={src ?? ''}
        width={size}
    />
);

export default CommunityUserAvatar;
