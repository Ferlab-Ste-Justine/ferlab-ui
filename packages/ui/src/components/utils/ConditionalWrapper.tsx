import React from 'react';

interface IConditionalWrapperProps {
    condition: boolean;
    wrapper: (children: JSX.Element) => JSX.Element;
    children: JSX.Element;
}

export default ({ condition, wrapper, children }: IConditionalWrapperProps) =>
    condition ? wrapper(children) : children;
