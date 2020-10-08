import React, { ReactElement, useRef, RefObject } from 'react';
import { Card as AntdCard } from 'antd';
import './Card.scss';

type CardProps = {
  title?: string;
  loading?: boolean;
  children: ReactElement[] | React.ReactNode | Function;
};

const Card = ({ title, loading, children, ...props }: CardProps) => {
  const divElem = useRef() as RefObject<HTMLDivElement> | undefined;
  return (
    <AntdCard title={title} loading={loading} className="cb-card-summary-chart" {...props}>
      <div className="summary-card-content-container" ref={divElem}>
        {typeof children === 'function' ? (
          <div className="dynamic-content">
            {children({ height: divElem?.current?.offsetHeight })}
          </div>
        ) : (
          children
        )}
      </div>
    </AntdCard>
  );
};

export default Card;
