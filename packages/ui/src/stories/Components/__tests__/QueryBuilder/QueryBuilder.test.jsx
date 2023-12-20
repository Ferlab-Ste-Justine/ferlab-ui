import React from 'react';

import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import { QueryBuilderEmpty } from '../../QueryBuilder/QueryBuilder.stories';


describe('QueryBuilder', () => {
    it('should be Empty', () => {
        render(<QueryBuilderEmpty query={{content:"", op: ""}}/>);
        expect(screen.getByRole('button')).toHaveTextContent('Primary');
    });
})
