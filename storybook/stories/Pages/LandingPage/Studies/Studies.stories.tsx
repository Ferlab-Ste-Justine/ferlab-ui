import React from 'react';
import {Meta} from '@storybook/react';
import Studies from '@ferlab/ui/core/pages/LandingPage/Studies';
import KFLogo from '../assets/studies/study-logo-KF.svg'
import DefaultLogo from '../assets/studies/study-logo-default.svg'
import DSCLogo from '../assets/studies/study-logo-DSC.png'
import styles from './index.module.css'

export default {
    title: '@ferlab/Pages/LandingPage/Studies',
    component: Studies,
    decorators: [(Story) => <Story/>],
} as Meta;

const props = {
    dictionary: {
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus, velit et hendrerit dapibus, nunc metus iaculis nunc, ut pretium massa turpis at metus. Fusce facilisis eget eros in laoreet. Proin velit erat, euismod id convallis ultricies, vulputate sed lectus.',
        title: 'Studies',
    },
    studiesCount: 12,
    studies: [
        {
            code: 'HTP',
            title: <img src={KFLogo} alt="Study Logo" className={styles.logo}/>,
            subtitle: 'Study Name 1',
            description: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus, velit et
                hendrerit dapibus, nunc metus iaculis nunc, ut pretium massa turpis at metus. Fusce facilisis eget eros
                in laoreet. Proin velit erat, euismod id convallis ultricies, vulputate sed lectus. it dapibus, nunc
                metus iaculis nunc, ut pretium massa turpis at metus. Fusce facilisis eget eros in laoreet.</p>,
            participantCount: 4567
        },
        {
            code: 'VSC',
            title: <img src={DefaultLogo} alt="Study Logo" className={styles.logo}/>,
            subtitle: 'Study Name 2',
            description: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus, velit et
                hendrerit dapibus, nunc metus iaculis nunc, ut pretium massa turpis at metus. Fusce facilisis eget eros
                in laoreet. Proin velit erat, euismod id convallis ultricies, vulputate sed lectus.</p>,
            participantCount: 10276
        },
        {
            code: 'CS-PTB',
            title: <img src={DSCLogo} alt="Study Logo" className={styles.logo}/>,
            subtitle: 'Study Name 3',
            description: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus, velit et
                hendrerit dapibus, nunc metus iaculis nunc, ut pretium massa turpis at metus. Fusce facilisis eget eros
                in laoreet. Proin velit erat, euismod id convallis ultricies, vulputate sed lectus.</p>,
            participantCount: 856
        }]
};

export const StudiesStory = () => <Studies {...props} />;
