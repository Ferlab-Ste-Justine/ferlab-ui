import { Tag } from 'antd';
import { capitalize } from 'lodash';
import React from 'react';
import styles from './index.module.scss';

export enum ColorTagType {
    Boolean = "boolean",
    Gender = "gender",
    Family = 'family',
    Position = 'position',
    VitalStatus = 'vitalStatus',
    Interpretation = 'interpretation',
    Pathogenic = 'pathogenic',
    Benign = 'benign',
    Other = 'other'
}

export type TColorTag = {
    type: ColorTagType,
    value?: string;
    children?: React.ReactNode;
}

const TAGS_STYLE: any = {
    [ColorTagType.Boolean]: {
        'true': styles.booleanTrue,
        'default': styles.default
    },
    [ColorTagType.Gender]: {
        'female': styles.genderFemale,
        'male': styles.genderMale,
        'default': styles.default,
    },
    [ColorTagType.Family]: {
        'default': styles.family,
    },
    [ColorTagType.Position]: {
        'proband': styles.positionProband,
        'default': styles.default,
    },
    [ColorTagType.VitalStatus]: {
        'alive': styles.vitalStatusAlive,
        'deceased': styles.vitalStatusDeceased,
        'default': styles.default,
    },
    [ColorTagType.Interpretation]: {
        'observed': styles.interpretationObserved,
        'default': styles.default,
    },
    [ColorTagType.Pathogenic]: {
        'default': styles.pathogenic
    },
    [ColorTagType.Benign]: {
        'default': styles.benign,
    },
    [ColorTagType.Other]: {
        'default': styles.default,
    }
};

export const ColorTag = ({ type, value, children }: TColorTag) => {
    let tagClassName = TAGS_STYLE[type].default;
    if (value && TAGS_STYLE[type][value.toLocaleLowerCase()]) {
        tagClassName = TAGS_STYLE[type][value.toLocaleLowerCase()]
    }
    return <Tag className={tagClassName}>{children || capitalize(value)}</Tag>;
}

export default ColorTag;