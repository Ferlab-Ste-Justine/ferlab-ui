import { FieldOperators } from '../data/sqon/operators';
import { IValueFilter } from '../data/sqon/types';

import valueContentMock from './valueContentMock';

export default function valueFilterMock(props: Partial<IValueFilter> = {}): IValueFilter {
    const defaultValues: IValueFilter = {
        content: valueContentMock(),
        op: FieldOperators.in,
    };

    return { ...defaultValues, ...props };
}
