import React from 'react';
import { Tag, Tooltip } from 'antd';
import get from 'lodash/get';

import { getComponentDictionnary } from '../../../utils/localeUtils';

import defaultDictionary from './locales';
import { IPriorityTagDictionary } from './types';

export enum PrioritesOptions {
    Asap = 'asap',
    Routine = 'routine',
    Stat = 'stat',
    Urgent = 'urgent',
}

export type PriorityTagProps = {
    priority: string;
    intl?: any;
    dictionary?: IPriorityTagDictionary;
};

const PriorityTag = ({ dictionary, intl, priority }: PriorityTagProps) => {
    dictionary = getComponentDictionnary(intl, defaultDictionary, dictionary);
    let tagColor = 'default';
    switch (priority) {
        case PrioritesOptions.Asap:
            tagColor = 'orange';
            break;
        case PrioritesOptions.Routine:
            tagColor = 'default';
            break;
        case PrioritesOptions.Urgent:
            tagColor = 'cyan';
            break;
        case PrioritesOptions.Stat:
            tagColor = 'red';
            break;
    }
    return (
        <Tooltip
            title={
                priority ? get(dictionary, `options.tooltip.${priority}`, priority || '') : dictionary?.options?.unknown
            }
        >
            <Tag color={tagColor}>
                {priority
                    ? get(dictionary, `options.${priority}`, priority || '')
                    : dictionary?.options?.tooltip.unknown}
            </Tag>
        </Tooltip>
    );
};

export default PriorityTag;
