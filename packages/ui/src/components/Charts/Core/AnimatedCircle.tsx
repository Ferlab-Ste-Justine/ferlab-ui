import React, { useMemo } from 'react';
import { useTheme } from '@nivo/core';
import { animated } from '@react-spring/web';

type TAnimatedCircle = {
    x: number;
    y: number;
    size: number;
};

const AnimatedCircle = ({ size, x, y }: TAnimatedCircle): JSX.Element => {
    const theme = useTheme();
    const style = useMemo(
        () => ({
            ...theme.annotations.symbol,
        }),
        [theme.annotations.symbol],
    );

    return <animated.circle cx={x} cy={y} fill={style.fill} r={size / 2} style={style} />;
};

export default AnimatedCircle;
