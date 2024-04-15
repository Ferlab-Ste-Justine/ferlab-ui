import React, { ReactElement } from 'react';

import styles from './index.module.scss';

export type FooterProps = {
    logos: string[];
};

const Footer = ({ logos }: FooterProps): ReactElement => (
    <footer className={styles.footerContainer}>
        {logos.map((logo) => (
            <img alt="Footer Logo" className={styles.image} src={logo} />
        ))}
    </footer>
);

export default Footer;
