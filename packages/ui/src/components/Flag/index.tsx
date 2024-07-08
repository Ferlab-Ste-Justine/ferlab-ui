import React, { ReactElement, useEffect, useState } from 'react';

export type TFlag = {
    options: any;
};

export const Flag = ({ options }: TFlag): ReactElement => {
    console.log('flag option', options);
    return <div>flag</div>;
};

export default Flag;
