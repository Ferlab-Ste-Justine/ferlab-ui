import React from 'react';
import {Meta} from '@storybook/react';
import CavaticaCard from '@ferlab/ui/core/pages/LandingPage/CavaticaCard';
import CavaticaLogo from '../assets/cavatica-logo.png'
import styles from './index.module.css'

export default {
    title: '@ferlab/Pages/LandingPage/CavaticaCard',
    component: CavaticaCard,
    decorators: [(Story) => <Story/>],
} as Meta;

const props = {
    dictionary: {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus, velit et hendrerit dapibus, nunc metus iaculis nunc, ut pretium massa turpis at metus. Fusce facilisis eget eros in laoreet. Proin velit erat, euismod id convallis ultricies, vulputate sed lectus. Quisque faucibus, erat blandit auctor egestas, lacus diam blandit massa, ac malesuada nulla est rutrum justo. In tincidunt elit at erat maximus consectetur. Mauris a risus ac eros consectetur tristique. Nam tempus aliquet maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna nunc, ornare ac orci a, tincidunt fringilla magna. Morbi ultrices vulputate gravida. Ut pulvinar enim sed nibh tempor gravida. Suspendisse ac nisl lacus.',
        learnMore: 'Learn More',
        login: 'Login',
    },
    logo: <img src={CavaticaLogo} alt="Cavatica Logo" className={styles.logo}/>
};

export const CavaticaCardStory = () => <CavaticaCard {...props} />;
