import { v4 as getUUID } from 'uuid';

import { ISyntheticSqon } from '../../../../data/sqon/types';
import { ICustomPillConfig, IDictionary, ISaveCustomPillResponse, SavedFilterTypeEnum } from '../../types';

interface ISaveCustomPillProps {
    customPillConfig: ICustomPillConfig;
    dictionary: IDictionary;
    id: string;
    query: ISyntheticSqon;
    setIsSaveCustomPillLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSaveCustomPillModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setOnSaveCustomPillResponse: React.Dispatch<React.SetStateAction<ISaveCustomPillResponse>>;
    title: string;
    updateQueryById: (id: string, newQuery: ISyntheticSqon) => void;
}

export const saveCustomPill = async ({
    customPillConfig,
    dictionary,
    id,
    query,
    setIsSaveCustomPillLoading,
    setIsSaveCustomPillModalVisible,
    setOnSaveCustomPillResponse,
    title,
    updateQueryById,
}: ISaveCustomPillProps): Promise<void> => {
    setIsSaveCustomPillLoading(true);
    if (customPillConfig?.createCustomPill) {
        await customPillConfig
            .createCustomPill(
                {
                    favorite: false,
                    id: getUUID(),
                    queries: [query],
                    title,
                    type: SavedFilterTypeEnum.Query,
                },
                customPillConfig.tag || '',
            )
            .then((response: any) => {
                if (response.error) {
                    if (response.error.message === 'Already exists') {
                        setOnSaveCustomPillResponse({
                            hasError: true,
                            message:
                                dictionary.actions?.saveCustomPill?.form?.error?.nameAlreadyExists ||
                                'A query with this name already exists',
                        });
                    } else if (response.error.message === 'Invalid format') {
                        setOnSaveCustomPillResponse({
                            hasError: true,
                            message:
                                dictionary.actions?.saveCustomPill?.form?.error?.invalidFormat ||
                                'Invalid format, special character not authorized',
                        });
                    } else {
                        setOnSaveCustomPillResponse({ hasError: false, message: undefined });
                        setIsSaveCustomPillModalVisible(false);
                    }
                } else {
                    if (response?.payload?.queries?.[0]) {
                        const newContent = [
                            {
                                content: response.payload.queries[0].content,
                                id: response.payload.id,
                                op: response.payload.queries[0].op,
                                title: response.payload.title,
                            },
                        ];
                        const newQuery = { ...query, content: newContent };
                        updateQueryById(id, newQuery);
                    }
                    setOnSaveCustomPillResponse({ hasError: false, message: undefined });
                    setIsSaveCustomPillModalVisible(false);
                }
                setIsSaveCustomPillLoading(false);
            });
    }
};
