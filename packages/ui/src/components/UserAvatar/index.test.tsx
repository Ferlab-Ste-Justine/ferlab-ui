import '@testing-library/jest-dom';

import React from 'react';
import { render } from '@testing-library/react';

import UserAvatar from './index';

describe('UserAvatar', () => {
    test('renders user initials when userName is provided and src is not provided', () => {
        const userName = 'John Doe';
        const { getByText } = render(<UserAvatar userName={userName} />);
        const initials = getByText(/JD/);
        expect(initials).toBeInTheDocument();
    });

    test('renders an image when src is provided', () => {
        const src = 'https://example.com/user.jpg';
        const { getByAltText } = render(<UserAvatar src={src} />);
        const image = getByAltText(/UserAvatar/);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', src);
    });

    test('renders a circular avatar when circle prop is true', () => {
        const { getByTestId } = render(<UserAvatar circle />);
        const avatar = getByTestId(/UserAvatar/);
        expect(avatar).toHaveClass('ant-avatar-circle');
    });

    test('renders a square avatar when circle prop is false', () => {
        const { getByTestId } = render(<UserAvatar circle={false} />);
        const avatar = getByTestId(/UserAvatar/);
        expect(avatar).not.toHaveClass('ant-avatar-circle');
    });
});
