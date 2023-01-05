import { IAnchorLink } from '../../components/AnchorMenu';
import { ProColumnType } from '../../components/ProTable/types';

export interface IEntityPageWrapper {
    pageId: string;
    title: {
        text: string;
        icon: JSX.Element;
        tag?: string;
    };
    links: IAnchorLink[];
    children: JSX.Element;
}

export interface IEntityTable {
    id: string;
    defaultColumns: ProColumnType[];
    loading: boolean;
    title: string;
    data: any;
    subtitle?: JSX.Element | React.ReactNode;
}
