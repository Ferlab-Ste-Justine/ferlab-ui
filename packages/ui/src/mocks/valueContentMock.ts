import { IValueContent } from '../data/sqon/types';

export default function valueContentMock(props: Partial<IValueContent> = {}): IValueContent {
    const defaultValues: IValueContent = {
        field: 'field',
        value: ['value'],
    };

    return { ...defaultValues, ...props };
}
