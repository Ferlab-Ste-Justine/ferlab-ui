import React, { useRef, RefObject } from 'react';
import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';

type OwnProps = {
    gridChildren?: Function;
  classNameContainer?: string;
  classNameContent?: string;
  classNameCardItem?: string;
};

type Props = OwnProps & CardProps

const GridCard = ({ loading, children, classNameContainer = '', classNameContent = '', classNameCardItem = '', ...cardProps }: Props) => {
  const divElem = useRef() as RefObject<HTMLDivElement> | undefined;
  return (
    <Card loading={loading} className={`core-grid-card ${classNameCardItem}`} {...cardProps}>
      <div
          className={`core-grid-card-content-container ${classNameContainer}`}
          ref={divElem}
      >
        {typeof children === 'function' ? (
          <div className={`core-grid-card-dynamic-content ${classNameContent}`}>
            {children({ height: divElem?.current?.offsetHeight })}
          </div>
        ) : (
          children
        )}
      </div>
    </Card>
  );
};

export default GridCard;
