import React, { useEffect, useState } from 'react';
import { Button, Select } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

import ScrollContent from '../../../layout/ScrollContent';
import AssignmentsTag from '../AssignmentsTag';
import { IDictionary, TPractitionnerInfo } from '../types';
import { getPractitionnerName } from '../utils';

import styles from './index.module.scss';

export type TAssignmentsSelect = {
    options: TPractitionnerInfo[];
    visibleOptions?: boolean;
    handleSelect: (practitionerRoles_ids: string[]) => void;
    assignedPractionnerRoles: string[];
    dictionary?: IDictionary | Record<string, never>;
};

const tagRender =
    (
        selectedItems: TPractitionnerInfo[],
        setSelectedItems: React.Dispatch<React.SetStateAction<TPractitionnerInfo[]>>,
    ) =>
    (props: CustomTagProps) => {
        const { value } = props;
        const practitionerInfo = selectedItems.find((s) => s.practitionerRoles_Id === value);
        const handleClose = () => {
            setSelectedItems(selectedItems.filter((s) => s.practitionerRoles_Id !== value));
        };
        return (
            <AssignmentsTag
                closable
                email={practitionerInfo?.email ? practitionerInfo.email : ''}
                handleClose={handleClose}
                name={practitionerInfo?.name ? getPractitionnerName(practitionerInfo.name) : value}
                organization={practitionerInfo?.ldm ? practitionerInfo.ldm : ''}
            />
        );
    };

const renderOptions = (
    options: TPractitionnerInfo[],
    setSearchValue: React.Dispatch<React.SetStateAction<string | undefined>>,
    selectedItems: TPractitionnerInfo[],
    setSelectedItems: React.Dispatch<React.SetStateAction<TPractitionnerInfo[]>>,
) =>
    options?.map((value: TPractitionnerInfo) => (
        <Button
            key={value.practitionerRoles_Id}
            onClick={() => {
                setSelectedItems([...selectedItems, value]);
                setSearchValue(undefined);
            }}
            type="text"
        >
            <AssignmentsTag
                background={false}
                email={value.email ? value.email : ''}
                name={getPractitionnerName(value.name)}
                organization={value.ldm}
            />
        </Button>
    ));

export const AssignmentsSelect = ({
    assignedPractionnerRoles,
    dictionary,
    handleSelect,
    options,
    visibleOptions = false,
}: TAssignmentsSelect) => {
    const alreadySelectedOption = options.filter((r) => assignedPractionnerRoles?.includes(r.practitionerRoles_Id));
    const [selectedItems, setSelectedItems] = useState<TPractitionnerInfo[]>(alreadySelectedOption);
    const [searchValue, setSearchValue] = useState<string | undefined>();
    const filteredSelectedOptions = options.filter(
        ({ practitionerRoles_Id: id1 }) => !selectedItems.some(({ practitionerRoles_Id: id2 }) => id2 === id1),
    );
    const [filteredAutocompleteOption, setFilteredAutocompleteOption] = useState<TPractitionnerInfo[]>([]);

    const selectedOptions = selectedItems.reduce(
        (acc: { value: string; label: string }[], curr: TPractitionnerInfo) => [
            ...acc,
            { label: getPractitionnerName(curr.name), value: curr.practitionerRoles_Id },
        ],
        [],
    );
    const allOption = options.reduce(
        (acc: { value: string; label: string }[], curr: TPractitionnerInfo) => [
            ...acc,
            { label: getPractitionnerName(curr.name), value: curr.practitionerRoles_Id },
        ],
        [],
    );

    useEffect(() => {
        handleSelect(
            selectedItems.reduce((acc: string[], curr: TPractitionnerInfo) => [...acc, curr.practitionerRoles_Id], []),
        );
    }, [selectedItems]);

    useEffect(() => {
        searchValue && searchValue !== ''
            ? setFilteredAutocompleteOption(
                  filteredSelectedOptions.filter((o) =>
                      getPractitionnerName(o.name).toLowerCase().includes(searchValue.toLowerCase()),
                  ),
              )
            : setFilteredAutocompleteOption([]);
    }, [searchValue]);

    return (
        <>
            <Select
                className={styles.selectInput}
                mode="multiple"
                onSearch={(e) => setSearchValue(e)}
                options={allOption}
                placeholder={dictionary?.select?.searchPlaceholder || 'Search'}
                searchValue={searchValue}
                style={{ width: '100%' }}
                tagRender={tagRender(selectedItems, setSelectedItems)}
                value={selectedOptions}
            />
            {visibleOptions && (
                <div className={styles.selectedOption}>
                    <Button
                        className={styles.noAssignments}
                        disabled={selectedOptions.length === 0 ? true : false}
                        onClick={() => {
                            setSelectedItems([]);
                            setSearchValue(undefined);
                        }}
                        size="small"
                        type="link"
                    >
                        {dictionary?.actions?.clear || 'No assignment'}
                    </Button>
                    <ScrollContent className={styles.optionsList}>
                        {renderOptions(
                            filteredAutocompleteOption.length === 0
                                ? filteredSelectedOptions
                                : filteredAutocompleteOption,
                            setSearchValue,
                            selectedItems,
                            setSelectedItems,
                        )}
                    </ScrollContent>
                </div>
            )}
        </>
    );
};

export default AssignmentsSelect;
