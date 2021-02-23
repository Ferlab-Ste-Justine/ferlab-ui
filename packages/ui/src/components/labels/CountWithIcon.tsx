import React from 'react';

import '@ferlab/style/components/labels/CountWithIcon.scss'

export enum CountWithIconTypeEnum  {
    Inline = 'inline',
    Stack = 'stack',
}

export type CountWithIconProps = {
    className?: string;
    Icon: React.ReactNode;
    type?: CountWithIconTypeEnum;
    label: React.ReactNode;
    total: React.ReactNode;
    style?: React.CSSProperties;
}

const CountWithIcon: React.FC< CountWithIconProps> =
    ({
       className = '',
       Icon,
       label,
       total,
       type = CountWithIconTypeEnum.Stack,
       style = {},
   }) => (
            <div className={`count__container count__container--${type} ${className}`}  style={style}>
                {Icon}
                <div className="wrapper__text">
                    <span className="count">{total}</span>
                    <span className="label">{label}</span>
                </div>
            </div>
         )

export default CountWithIcon;
