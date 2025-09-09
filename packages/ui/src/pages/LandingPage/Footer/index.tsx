import React, { ReactElement } from 'react';

import styles from './index.module.css';

export type TFooterProps = {
    logos: string[];
    policies?: string;
};

const Footer = ({ logos, policies }: TFooterProps): ReactElement => (
    <footer className={styles.footerContainer}>
        {logos.map((logo, index) => (
            <img key={index} alt="Footer Logo" className={styles.image} src={logo} />
        ))}
        {policies && (
            <div className={styles.policiesText}>
                {policies}
            </div>
        )}
    </footer>
);

export default Footer;
