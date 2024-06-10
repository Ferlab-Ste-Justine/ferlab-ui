import React, { ReactElement } from 'react';

import styles from './index.module.css';

export type TFooterProps = {
    logos: string[];
};

const Footer = ({ logos }: TFooterProps): ReactElement => (
    <footer className={styles.footerContainer}>
        {logos.map((logo) => (
            <img alt="Footer Logo" className={styles.image} src={logo} />
        ))}
    </footer>
);

export default Footer;
