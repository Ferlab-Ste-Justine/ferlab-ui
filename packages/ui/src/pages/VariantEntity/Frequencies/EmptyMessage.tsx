import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

type OwnProps = {
    message: string;
};

const EmptyMessage: React.FC<OwnProps> = ({ message }) => <Text type={'secondary'}>{message}</Text>;

export default EmptyMessage;
