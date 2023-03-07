import React from 'react';
import { render, screen } from '@testing-library/react';

import ColorTag, { ColorTagType } from '.';
import { capitalize } from 'lodash';

describe('ColorTag', () => {
    test('make sure ColorTag with Boolean type and value true is correctly rendered', () => {
        const props = {
            type: ColorTagType.Boolean,
            value: "true"
        };

        render(<ColorTag {...props} />);
        expect(screen.getByText(capitalize(props.value))).toBeTruthy();
    });

    test('make sure ColorTag with Boolean type and value other is correctly rendered', () => {
        const props = {
            type: ColorTagType.Boolean,
            value: "other"
        };

        render(<ColorTag {...props} />);
        expect(screen.getByText(capitalize(props.value))).toBeTruthy();
    });

    test('make sure ColorTag with Gender type and value female is correctly rendered', () => {
        const props = {
            type: ColorTagType.Gender,
            value: "female"
        };

        render(<ColorTag {...props} />);
        expect(screen.getByText(capitalize(props.value))).toBeTruthy();
    });

    test('make sure ColorTag with Gender type and value male is correctly rendered', () => {
        const props = {
            type: ColorTagType.Gender,
            value: "male"
        };

        render(<ColorTag {...props} />);
        expect(screen.getByText(capitalize(props.value))).toBeTruthy();
    });

    test('make sure ColorTag with Gender type and value other is correctly rendered', () => {
        const props = {
            type: ColorTagType.Gender,
            value: "other"
        };

        render(<ColorTag {...props} />);
        expect(screen.getByText(capitalize(props.value))).toBeTruthy();
    });

    test('make sure ColorTag with Family type is correctly rendered', () => {
        const props = {
            type: ColorTagType.Family,
            value: "family"
        };

        render(<ColorTag {...props} />);
        expect(screen.getByText(capitalize(props.value))).toBeTruthy();
    });

    test('make sure ColorTag with Position type and value proband is correctly rendered', () => {
        const props = {
            type: ColorTagType.Position,
            value: "proband"
        };

        render(<ColorTag {...props} />);
        expect(screen.getByText(capitalize(props.value))).toBeTruthy();
    });

    test('make sure ColorTag with Position type and value other is correctly rendered', () => {
        const props = {
            type: ColorTagType.Position,
            value: "other"
        };

        render(<ColorTag {...props} />);
        expect(screen.getByText(capitalize(props.value))).toBeTruthy();
    });

    test('make sure ColorTag with VitalStatus type and value alive is correctly rendered', () => {
        const props = {
            type: ColorTagType.VitalStatus,
            value: "alive"
        };

        render(<ColorTag {...props} />);
        expect(screen.getByText(capitalize(props.value))).toBeTruthy();
    });
    test('make sure ColorTag with VitalStatus type and value deceased is correctly rendered', () => {
        const props = {
            type: ColorTagType.VitalStatus,
            value: "deceased"
        };

        render(<ColorTag {...props} />);
        expect(screen.getByText(capitalize(props.value))).toBeTruthy();
    });

    test('make sure ColorTag with VitalStatus type and value other is correctly rendered', () => {
        const props = {
            type: ColorTagType.VitalStatus,
            value: "other"
        };

        render(<ColorTag {...props} />);
        expect(screen.getByText(capitalize(props.value))).toBeTruthy();
    });

    test('make sure ColorTag with Interpretation type and value observed is correctly rendered', () => {
        const props = {
            type: ColorTagType.VitalStatus,
            value: "observed"
        };

        render(<ColorTag {...props} />);
        expect(screen.getByText(capitalize(props.value))).toBeTruthy();
    });

    test('make sure ColorTag with Interpretation type and value other is correctly rendered', () => {
        const props = {
            type: ColorTagType.VitalStatus,
            value: "other"
        };

        render(<ColorTag {...props} />);
        expect(screen.getByText(capitalize(props.value))).toBeTruthy();
    });

    test('make sure ColorTag with Pathogenic type is correctly rendered', () => {
        const props = {
            type: ColorTagType.Pathogenic,
            value: "pathogenic"
        };

        render(<ColorTag {...props} />);
        expect(screen.getByText(capitalize(props.value))).toBeTruthy();
    });

    test('make sure ColorTag with Benign type is correctly rendered', () => {
        const props = {
            type: ColorTagType.Benign,
            value: "benign"
        };

        render(<ColorTag {...props} />);
        expect(screen.getByText(capitalize(props.value))).toBeTruthy();
    });

    test('make sure ColorTag with Other type is correctly rendered', () => {
        const props = {
            type: ColorTagType.Other,
            value: "other"
        };

        render(<ColorTag {...props} />);
        expect(screen.getByText(capitalize(props.value))).toBeTruthy();
    });

});

