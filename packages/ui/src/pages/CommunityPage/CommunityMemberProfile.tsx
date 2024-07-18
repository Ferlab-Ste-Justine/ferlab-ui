import React from 'react';
import { GlobalOutlined, LinkedinFilled } from '@ant-design/icons';
import { Button, Col, List, Row, Space, Typography } from 'antd';
import cx from 'classnames';

import Empty from '../../components/Empty';

import { IUser } from './type';

import styles from './CommunityMemberProfilePage.module.css';

export const DEFAULT_COMMUNITY_MEMBER_PROFILE_DICTIONARY = {
    interests: {
        noInterest: 'No interests',
        title: 'Area of interest',
    },
    linkedin: 'Linkedin',
    roles: {
        noRole: 'No role',
        title: 'Role',
    },
    website: 'Website',
};

export type TCommunityMemberProfileDictionary = {
    roles: {
        title: string;
        noRole: string;
    };
    interests: {
        title: string;
        noInterest: string;
    };
    website: string;
    linkedin: string;
};

export interface ICommunityMemberProfile {
    user?: IUser;
    dictionary?: TCommunityMemberProfileDictionary;
}

export const CommunityMemberProfile = ({
    dictionary = DEFAULT_COMMUNITY_MEMBER_PROFILE_DICTIONARY,
    user,
}: ICommunityMemberProfile): JSX.Element => (
    <Row gutter={[80, 28]}>
        <Col md={18}>
            <Row gutter={[28, 28]}>
                <Col span={24}>
                    <Typography.Title level={4}>{dictionary.roles.title}</Typography.Title>
                    <List
                        className={cx(styles.infoList, {
                            [styles.empty]: (user?.roles?.length ?? []) === 0,
                        })}
                        dataSource={user?.roles}
                        itemLayout="horizontal"
                        locale={{
                            emptyText: (
                                <Empty align="left" description={dictionary.roles.noRole} noPadding showImage={false} />
                            ),
                        }}
                        renderItem={(role, index) => <li key={index}>{role}</li>}
                    />
                </Col>
                {(user?.areas_of_interest ?? []).length > 0 && (
                    <Col span={24}>
                        <Typography.Title level={4}>{dictionary.interests.title}</Typography.Title>
                        <List
                            className={cx(styles.infoList, {
                                [styles.empty]: (user?.areas_of_interest?.length ?? []) === 0,
                            })}
                            dataSource={user?.areas_of_interest}
                            itemLayout="horizontal"
                            locale={{
                                emptyText: (
                                    <Empty
                                        align="left"
                                        description={dictionary.interests.noInterest}
                                        noPadding
                                        showImage={false}
                                    />
                                ),
                            }}
                            renderItem={(interest, index) => <li key={index}>{interest}</li>}
                        />
                    </Col>
                )}
            </Row>
        </Col>
        <Col md={6}>
            <Space className={styles.linksContainer} direction="vertical">
                {user?.linkedin && (
                    <Button
                        className={styles.link}
                        href={user.linkedin}
                        icon={<LinkedinFilled />}
                        target="_blank"
                        type="link"
                    >
                        {dictionary.linkedin}
                    </Button>
                )}

                {user?.website && (
                    <Button
                        className={styles.link}
                        href={user.website}
                        icon={<GlobalOutlined />}
                        target="_blank"
                        type="link"
                    >
                        {dictionary.website}
                    </Button>
                )}
            </Space>
        </Col>
    </Row>
);
