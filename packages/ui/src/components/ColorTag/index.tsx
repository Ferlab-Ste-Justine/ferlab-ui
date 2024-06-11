import React, { ReactElement } from 'react';
import { Tag } from 'antd';
import { capitalize } from 'lodash';

import styles from './index.module.css';

export enum ColorTagType {
    Boolean = 'boolean',
    Gender = 'gender',
    Family = 'family',
    Position = 'position',
    VitalStatus = 'vitalStatus',
    Interpretation = 'interpretation',
    Pathogenic = 'pathogenic',
    Benign = 'benign',
    Other = 'other',
}

export type TColorTag = {
    type: ColorTagType;
    value?: string;
    children?: React.ReactNode;
};

const TAGS_STYLE: any = {
    [ColorTagType.Boolean]: {
        default: styles.default,
        true: styles.booleanTrue,
    },
    [ColorTagType.Gender]: {
        default: styles.default,
        female: styles.genderFemale,
        male: styles.genderMale,
    },
    [ColorTagType.Family]: {
        default: styles.family,
    },
    [ColorTagType.Position]: {
        default: styles.default,
        proband: styles.positionProband,
    },
    [ColorTagType.VitalStatus]: {
        alive: styles.vitalStatusAlive,
        deceased: styles.vitalStatusDeceased,
        default: styles.default,
    },
    [ColorTagType.Interpretation]: {
        default: styles.default,
        observed: styles.interpretationObserved,
    },
    [ColorTagType.Pathogenic]: {
        default: styles.pathogenic,
    },
    [ColorTagType.Benign]: {
        default: styles.benign,
    },
    [ColorTagType.Other]: {
        default: styles.default,
    },
};

export const ColorTag = ({ children, type, value }: TColorTag): ReactElement => {
    let tagClassName = TAGS_STYLE[type].default;
    if (value && TAGS_STYLE[type][value.toLocaleLowerCase()]) {
        tagClassName = TAGS_STYLE[type][value.toLocaleLowerCase()];
    }
    return <Tag className={tagClassName}>{children || capitalize(value)}</Tag>;
};

export default ColorTag;
