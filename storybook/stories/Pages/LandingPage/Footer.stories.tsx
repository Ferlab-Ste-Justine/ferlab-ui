import React from 'react';
import {Meta} from '@storybook/react';
import Footer from '@ferlab/ui/core/pages/LandingPage/Footer';
import LindaLogo from './assets/linda-logo.svg'
import ChopLogo from './assets/chop-logo.svg'
import VanderbiltLogo from './assets/vanderbilt-logo.svg'
import ChuSjLogo from './assets/chusj-logo.svg'
import VelseraLogo from './assets/verlsera-logo.png'


export default {
    title: '@ferlab/Pages/LandingPage/Footer',
    component: Footer,
    decorators: [(Story) => <Story/>],
} as Meta;

const props = {
    logos: [LindaLogo, ChopLogo, VanderbiltLogo, ChuSjLogo, VelseraLogo]
};

export const FooterStory = () => <Footer {...props} />;
