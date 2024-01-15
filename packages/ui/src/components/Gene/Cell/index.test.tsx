import '@testing-library/jest-dom';

import React from 'react';
import { render, screen } from '@testing-library/react';

import GeneCell from '.';

describe('Gene Cell', () => {
    it('should render correctly GeneCell', () => {
        render(
            <GeneCell
                omimGeneId="123456"
                queryBuilderId="qb-id"
                queryIndex="variants"
                queryValue="gene"
                symbol="ZCCHC24"
            />,
        );
        expect(screen.getByTestId('GeneCell_wrapper')).toBeInTheDocument();
        expect(screen.getByTestId('GeneCell_link')).toBeInTheDocument();
        expect(screen.getByTestId('GeneCell_add-query')).toBeInTheDocument();
    });
    it('should render the entry link if omim gene id is filled', () => {
        render(
            <GeneCell
                omimGeneId="123456"
                queryBuilderId="qb-id"
                queryIndex="variants"
                queryValue="gene"
                symbol="ZCCHC24"
            />,
        );
        const link = screen.getByTestId('GeneCell_link');
        expect(link).toHaveAttribute('href', 'https://www.omim.org/entry/123456');
    });
    it('should render the search link if omim gene id is not filled', () => {
        render(<GeneCell queryBuilderId="qb-id" queryIndex="variants" queryValue="gene" symbol="ZCCHC24" />);
        const link = screen.getByTestId('GeneCell_link');
        expect(link).toHaveAttribute(
            'href',
            'https://www.omim.org/search?index=entry&start=1&limit=10&sort=score+desc%2C+prefix_sort+desc&search=ZCCHC24',
        );
    });
    it('should render TABLE_EMPTY_PLACE_HOLDER if symbol is no gene', () => {
        render(
            <GeneCell
                omimGeneId="123456"
                queryBuilderId="qb-id"
                queryIndex="variants"
                queryValue="gene"
                symbol="NO_GENE"
            />,
        );
        expect(screen.getByText('-')).toBeInTheDocument();
        expect(screen.queryByTestId('GeneCell_wrapper')).not.toBeInTheDocument();
        expect(screen.queryByTestId('GeneCell_link')).not.toBeInTheDocument();
        expect(screen.queryByTestId('GeneCell_add-query')).not.toBeInTheDocument();
    });
});
