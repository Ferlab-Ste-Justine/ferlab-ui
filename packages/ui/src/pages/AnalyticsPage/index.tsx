import React from 'react';
import { Divider, Space, Typography } from 'antd';

import AnalyticsWidget, {
    DEFAULT_ANALYTICS_WIDGET_DICTIONARY,
    TAnalyticsWidget,
    TAnalyticsWidgetsDictionary,
} from './/AnalyticsWidget';

import styles from './index.module.css';

const { Paragraph, Title } = Typography;

export const DEFAULT_ANALYTICS_PAGE_DICTIONARY = {
    subtitle: 'Quickly visualize and interpret INCLUDE Data with our user-friendly tools',
    title: 'Analytics',
    widget: DEFAULT_ANALYTICS_WIDGET_DICTIONARY,
};

type TAnalyticsPageDictionary = {
    title: string;
    subtitle: string;
    widget: TAnalyticsWidgetsDictionary;
};

type TAnalyticsPage = {
    dictionary?: TAnalyticsPageDictionary;
    widgets: TAnalyticsWidget[];
};

const AnalyticsPage = ({ dictionary = DEFAULT_ANALYTICS_PAGE_DICTIONARY, widgets }: TAnalyticsPage): JSX.Element => (
    <Space className={styles.analyticsWrapper} direction="vertical" size={24}>
        <Title className={styles.title} level={4}>
            {dictionary.title}
        </Title>
        <Paragraph className={styles.subtitle}>{dictionary.subtitle}</Paragraph>
        <Divider />
        <Space>
            {widgets.map((widget) => (
                <AnalyticsWidget {...widget} dictionary={dictionary.widget} />
            ))}
        </Space>
    </Space>
);

export default AnalyticsPage;
