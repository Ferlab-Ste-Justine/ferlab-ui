export interface IQueriesSidebarDictionary {
    emptyText: string;
    errorText: string;
    learnMore: string;
    title: string;
    deleteCustomPill: {
        modal: {
            title: string;
            okText: string;
            cancelText: string;
            message: string;
            existingFilters: string;
            errorMessage: string;
        };
    };
    editCustomPill: {
        title: string;
        cancelText: string;
        saveText: string;
        nameAlreadyExist: {
            message: string;
            description: string;
            okText: string;
        };
        save: {
            confirmation: {
                title: string;
                message: string;
                existingFilters: string;
                existingFiltersError: string;
                cancelText: string;
                okText: string;
            };
            emptyQuery: {
                title: string;
                message: string;
                closeText: string;
            };
        };
    };
}
