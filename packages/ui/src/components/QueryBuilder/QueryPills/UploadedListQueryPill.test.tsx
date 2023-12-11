import '@testing-library/jest-dom';

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import valueContentMock from '../../../mocks/valueContentMock';
import valueFilterMock from '../../../mocks/valueFilterMock';
import {
    defaultFacetFilterConfig,
    QueryBuilderContext,
    QueryCommonContext,
    TQueryBuilderContextType,
    TQueryCommonContext,
} from '../context';

import UploadedListQueryPill, { IUploadedListQueryPillProps } from './UploadedListQueryPill';

const defaultPillLabel = 'Participant ID';

type RenderProps = {
    contextProps?: Partial<TQueryBuilderContextType>;
    componentProps?: Partial<IUploadedListQueryPillProps>;
    queryCommonProps?: Partial<TQueryCommonContext>;
};

function renderUploadedListQueryPill({ componentProps, contextProps, queryCommonProps }: RenderProps = {}) {
    render(
        <QueryCommonContext.Provider
            value={{
                dictionary: {
                    query: {
                        facet: jest.fn().mockReturnValue(defaultPillLabel),
                    },
                },
                facetFilterConfig: defaultFacetFilterConfig,
                showLabels: true,
                ...queryCommonProps,
            }}
        >
            <QueryBuilderContext.Provider
                // @ts-expect-error missing context props
                value={{
                    ...contextProps,
                }}
            >
                <UploadedListQueryPill
                    isBarActive={false}
                    onRemove={jest.fn()}
                    valueFilter={valueFilterMock()}
                    {...componentProps}
                />
            </QueryBuilderContext.Provider>
        </QueryCommonContext.Provider>,
    );
}

test('should render the label and operator elements when showLabels is true', () => {
    renderUploadedListQueryPill({ queryCommonProps: { showLabels: true } });

    expect(screen.getByText(defaultPillLabel)).toBeVisible();
    expect(screen.getByTestId('element-operator')).toBeVisible();
});

test('should not render the label and operator elements when showLabels is false', () => {
    renderUploadedListQueryPill({ queryCommonProps: { showLabels: false } });

    expect(screen.queryByText(defaultPillLabel)).not.toBeInTheDocument();
    expect(screen.queryByTestId('element-operator')).not.toBeInTheDocument();
});

test('should render the correct label when dictionnary data is provided', () => {
    const customPillLabel = 'Custom Pill Label';

    const dictionary = {
        query: {
            facet: jest.fn().mockReturnValue(customPillLabel),
        },
    };

    renderUploadedListQueryPill({ queryCommonProps: { dictionary } });

    expect(screen.getByText(customPillLabel)).toBeVisible();
});

test('should render the field as label when no dictionnary data is provided', () => {
    const dictionary = {};
    const field = 'fieldAsLabel';
    const valueFilter = valueFilterMock({ content: valueContentMock({ field }) });

    renderUploadedListQueryPill({ componentProps: { valueFilter }, queryCommonProps: { dictionary } });

    expect(screen.getByText(field)).toBeVisible();
});

test('should display the correct query values', () => {
    const valueFilter = valueFilterMock({ content: valueContentMock({ value: ['Patient1', 'Patient2'] }) });

    renderUploadedListQueryPill({ componentProps: { valueFilter } });

    expect(screen.getByText('Patient1')).toBeVisible();
    expect(screen.getByText('Patient2')).toBeVisible();
});

test('should call onRemove when clicking the close button', () => {
    const onRemove = jest.fn();

    renderUploadedListQueryPill({ componentProps: { onRemove } });

    fireEvent.click(screen.getByTestId('close-button'));
    expect(onRemove).toHaveBeenCalled();
});
