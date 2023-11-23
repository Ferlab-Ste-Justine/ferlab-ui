import React, { ReactElement } from 'react';

interface IConditionalWrapperProps {
    condition: boolean;
    wrapper: (children: React.ReactElement) => React.ReactElement;
    children: React.ReactElement;
}

export default ({ children, condition, wrapper }: IConditionalWrapperProps): ReactElement =>
    condition ? wrapper(children) : children;
