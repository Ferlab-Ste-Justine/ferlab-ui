import React from 'react';
import Card, { CardProps } from 'antd/lib/card';
import cx from 'classnames';
import ConditionalWrapper from '../../components/utils/ConditionalWrapper';

import styles from '@ferlab/style/view/cards/v2/gridcard.module.scss';
import { Spin } from 'antd';

type OwnProps = CardProps & {
    footer?: React.ReactNode;
    content: React.ReactNode;
    theme?: 'shade' | 'light';
    loadingType?: 'skeleton' | 'spinner';
    contentClassName?: string;
};

const getWrapperClass = (footer: React.ReactNode, title: React.ReactNode) =>
    !footer && !title ? styles.contentOnly : !footer ? styles.withHeaderOnly : !title ? styles.withFooterOnly : '';

const GridCard = ({
    footer,
    content,
    theme = 'light',
    loadingType = 'skeleton',
    className = '',
    contentClassName = '',
    ...rest
}: Omit<OwnProps, 'actions'>) => {
    return (
        <Card
            {...rest}
            loading={loadingType === 'skeleton' ? rest.loading : false}
            actions={footer ? [footer] : undefined}
            className={cx(
                styles.fbUIGridCard,
                className,
                theme == 'light' ? styles.light : styles.shade,
                getWrapperClass(footer, rest.title),
            )}
        >
            <ConditionalWrapper
                condition={loadingType === 'spinner'}
                wrapper={(children) => <Spin spinning={rest.loading}>{children}</Spin>}
                children={<div className={contentClassName}>{content}</div>}
            />
        </Card>
    );
};

export default GridCard;
