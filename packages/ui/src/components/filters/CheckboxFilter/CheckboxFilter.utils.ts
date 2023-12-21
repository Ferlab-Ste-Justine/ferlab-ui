import { ArrangerValues } from '../../../data/arranger/formatting';
import { removeUnderscoreAndCapitalize } from '../../../utils/stringUtils';
import { IDictionary, IFilter, IFilterCheckboxConfig, IFilterGroup } from '../types';

export type TGetMappedNameParams = {
    filter: IFilter;
    filterGroup: IFilterGroup<IFilterCheckboxConfig>;
    dictionary?: IDictionary | Record<string, never>;
};

export const getMappedName = ({ dictionary, filter, filterGroup }: TGetMappedNameParams): string => {
    if (filter.id === ArrangerValues.missing) {
        return (dictionary?.checkBox?.noData as string) || 'No Data';
    }

    if (typeof filter.name === 'string') {
        if (filterGroup.config?.facetTranslate) {
            return filterGroup.config?.facetTranslate(filter.id);
        }

        return removeUnderscoreAndCapitalize(
            (filterGroup.config?.nameMapping && filterGroup.config?.nameMapping[filter.id]) || filter.name,
        );
    }

    return filter.name as string;
};
