import en from './en';
import fr from './fr';

export const ageCategories = [
    { key: 'A-antenatal', label: 'Antenatal', tooltip: 'Before birth' },
    { key: 'B-congenital', label: 'Congenital', tooltip: 'At birth' },
    { key: 'C-neonatal', label: 'Neonatal', tooltip: '< 28 days' },
    { key: 'D-infantile', label: 'Infantile', tooltip: '>= 28 days and < 1 year' },
    { key: 'E-childhood', label: 'Childhood', tooltip: '>= 1 year and < 5 years' },
    { key: 'F-juvenile', label: 'Juvenile', tooltip: '>= 5 years and < 16 years' },
    { key: 'G-young adult', label: 'Young Adult', tooltip: '>= 16 years and < 40 years' },
    { key: 'H-middle age', label: 'Middle Age', tooltip: '>= 40 years and < 60 years' },
    { key: 'I-senior', label: 'Senior', tooltip: '>= 60 years' },
];

//transform `A-antenatal` to `Antenatal (Before birth)` and return an object
export const ageCategoriesKeyLabelTooltip = Object.assign(
    {},
    ...ageCategories.map((elem) => ({ [elem.key]: `${elem.label} (${elem.tooltip})` })),
);

export enum LANG {
    EN = 'en',
    FR = 'fr',
}

const locales = {
    [LANG.FR]: fr,
    [LANG.EN]: en,
};

export default locales;
