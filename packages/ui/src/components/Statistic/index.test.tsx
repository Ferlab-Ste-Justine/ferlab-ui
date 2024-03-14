import React from 'react';
import { render, screen } from '@testing-library/react';

import Statistic from '.';
import FamilyIcon from '../Icons/Futuro/FamilyIcon';
import { TABLE_EMPTY_PLACE_HOLDER } from '../../common/constants';

describe('Statistic', () => {
    it('should render statistic', () => {
        render(<Statistic count={23} icon={<FamilyIcon />} label="Families" />);
        expect(screen.getByText('23')).toBeTruthy();
        expect(screen.getByText('Families')).toBeTruthy();
    });

    it('should render - when count is not filled', () => {
        render(<Statistic icon={<FamilyIcon />} label="Families" />);
        expect(screen.queryByText('23')).toBeFalsy();
        expect(screen.getByText(TABLE_EMPTY_PLACE_HOLDER)).toBeTruthy();
        expect(screen.getByText('Families')).toBeTruthy();
    });
});
