/* eslint-disable react/prop-types */
import React, { FunctionComponent, useState } from 'react';
import { ButtonProps } from 'antd/lib/button';
import { Button } from 'antd';

export type AsyncButtonProps = {
  children: React.ReactNode;
  getLink: () => Promise<string>;
};

type Props = AsyncButtonProps & ButtonProps;

const AsyncButton: FunctionComponent<Props> = ({
  getLink,
  children,
  type = 'primary',
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      loading={isLoading}
      type={type}
      onClick={async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const url = await getLink();
        setIsLoading(false);
        if (url) {
          window.location.href = url;
        }
      }}
    >
      {children}
    </Button>
  );
};

export default AsyncButton;