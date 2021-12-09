import React from 'react';
import { Typography } from 'antd';
import {
    CheckOutlined,
    FormOutlined,
    MailOutlined,
    RetweetOutlined,
    StopOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import '@ferlab/style/components/labels/StatusLabel.scss';

export enum StatusOptions {
    Active = 'active',
    Completed = 'completed',
    Draft = 'draft',
    Incomplete = 'incomplete',
    Revoked = 'revoked',
    Submitted = 'submitted',
}

export type TranslationDictionary = Record<StatusOptions, string>;

type StatusLabelElementFromStringType = Record<string, (d: TranslationDictionary) => React.ReactElement>;
export const StatusLabelElement: Record<StatusOptions, (d: TranslationDictionary) => React.ReactElement> = {
    [StatusOptions.Active]: (d) => (
        <>
            <RetweetOutlined />
            {d[StatusOptions.Active]}
        </>
    ),
    [StatusOptions.Completed]: (d) => (
        <>
            <CheckOutlined />
            {d[StatusOptions.Completed]}
        </>
    ),
    [StatusOptions.Draft]: (d) => (
        <>
            <FormOutlined />
            {d[StatusOptions.Draft]}
        </>
    ),
    [StatusOptions.Incomplete]: (d) => (
        <>
            <WarningOutlined />
            {d[StatusOptions.Incomplete]}
        </>
    ),
    [StatusOptions.Revoked]: (d) => (
        <>
            <StopOutlined />
            {d[StatusOptions.Revoked]}
        </>
    ),
    [StatusOptions.Submitted]: (d) => (
        <>
            <MailOutlined />
            {d[StatusOptions.Submitted]}
        </>
    ),
};

export type StatusLabelProps = {
    className?: string;
    dictionary: TranslationDictionary;
    status: string;
    style?: React.CSSProperties;
};
const StatusLabel = ({ className = '', dictionary, status, style = {} }: StatusLabelProps) => {
    return (
        <Typography.Text className={`statuslabel__container ${status} ${className}`} style={style}>
            {(StatusLabelElement as StatusLabelElementFromStringType)[status](dictionary)}
        </Typography.Text>
    );
};

export default StatusLabel;
