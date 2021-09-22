import React from 'react';

interface IConditionalWrapperProps {
    condition: boolean;
    wrapper: (children: React.ReactElement) => React.ReactElement;
    children: React.ReactElement;
}

export default ({ condition, wrapper, children }: IConditionalWrapperProps) =>
    condition ? wrapper(children) : children;
