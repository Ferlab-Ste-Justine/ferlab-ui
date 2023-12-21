import { useLayoutEffect, useState } from 'react';

const useWindowSize = (): { height: number; width: number } => {
    const [windowSize, setWindowSize] = useState({ height: 0, width: 0 });

    const handleSize = () => {
        setWindowSize({
            height: window.innerHeight,
            width: window.innerWidth,
        });
    };

    useLayoutEffect(() => {
        handleSize();

        window.addEventListener('resize', handleSize);

        return () => window.removeEventListener('resize', handleSize);
    }, []);

    return windowSize;
};

export default useWindowSize;
