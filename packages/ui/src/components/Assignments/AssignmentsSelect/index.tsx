import React, { useEffect, useState } from 'react';
import { Button, Select } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

import ScrollContent from '../../../layout/ScrollContent';
import AssignmentsTag from '../AssignmentsTag';
import { IAssignmentsDictionary, TPractitionnerInfo } from '../types';
import { getPractitionnerName } from '../utils';

import styles from './index.module.scss';

export type TAssignmentsSelect = {
    options: TPractitionnerInfo[];
    visibleOptions?: boolean;
    handleSelect: (practitionerRoles_ids: string[]) => void;
    assignedPractionnerRoles: string[];
    dictionary?: IAssignmentsDictionary | Record<string, never>;
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
        return value === 'noAssign' ? (
            <AssignmentsTag background={false} unAssign={true} />
        ) : (
            <AssignmentsTag
                closable
                email={practitionerInfo?.email ? practitionerInfo.email : ''}
                handleClose={handleClose}
                name={practitionerInfo?.name ? getPractitionnerName(practitionerInfo.name) : value}
                organization={practitionerInfo?.ldm ? practitionerInfo.ldm : ''}
            />
        );
    };

const getSelectedOptions = (selectedItems: TPractitionnerInfo[]) =>
    selectedItems.reduce(
        (acc: { value: string; label: string }[], curr: TPractitionnerInfo) => [
            ...acc,
            { label: getPractitionnerName(curr.name), value: curr.practitionerRoles_Id },
        ],
        [],
    );

const renderOptions = (
    options: TPractitionnerInfo[],
    setSearchValue: React.Dispatch<React.SetStateAction<string | undefined>>,
    selectedItems: TPractitionnerInfo[],
    setSelectedItems: React.Dispatch<React.SetStateAction<TPractitionnerInfo[]>>,
    handleSelect: (practitionerRoles_ids: string[]) => void,
    assignedPractionnerRoles: string[],
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
    const noAssignDefaultValue = [
        {
            label: 'noAssign',
            value: 'noAssign',
        },
    ];
    const alreadySelectedOption = options.filter((r) => assignedPractionnerRoles?.includes(r.practitionerRoles_Id));
    const [selectedItems, setSelectedItems] = useState<TPractitionnerInfo[]>(alreadySelectedOption);
    const [selectedOptions, setSelectedOption] = useState<{ label: string; value: string }[]>(
        getSelectedOptions(selectedItems),
    );
    const [noAssignValue, setNoAssignValue] = useState<{ label: string; value: string }[]>(noAssignDefaultValue);
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string | undefined>();
    const filteredSelectedOptions = options.filter(
        ({ practitionerRoles_Id: id1 }) => !selectedItems.some(({ practitionerRoles_Id: id2 }) => id2 === id1),
    );
    const [filteredAutocompleteOption, setFilteredAutocompleteOption] = useState<TPractitionnerInfo[]>([]);

    const allOption = options.reduce(
        (acc: { value: string; label: string }[], curr: TPractitionnerInfo) => [
            ...acc,
            { label: getPractitionnerName(curr.name), value: curr.practitionerRoles_Id },
        ],
        [],
    );

    useEffect(() => {
        if ([...(alreadySelectedOption || [])]?.sort().toString() !== [...(selectedItems || [])]?.sort().toString()) {
            handleSelect(
                selectedItems.reduce(
                    (acc: string[], curr: TPractitionnerInfo) => [...acc, curr.practitionerRoles_Id],
                    [],
                ),
            );
        }
    }, [selectedItems]);

    useEffect(() => {
        if ([...(alreadySelectedOption || [])]?.sort().toString() !== [...(selectedItems || [])]?.sort().toString()) {
            setSelectedItems(alreadySelectedOption);
            setSelectedOption(getSelectedOptions(alreadySelectedOption));
        }
    }, [alreadySelectedOption]);

    useEffect(() => {
        openDropdown ? setNoAssignValue([]) : setNoAssignValue(noAssignDefaultValue);
    }, [openDropdown]);

    useEffect(() => {
        searchValue && searchValue !== ''
            ? setFilteredAutocompleteOption(
                  filteredSelectedOptions.filter((o) =>
                      getPractitionnerName(o.name).toLowerCase().includes(searchValue.toLowerCase()),
                  ),
              )
            : setFilteredAutocompleteOption([]);
    }, [searchValue]);

    const dropdownContent = () => (
        <div className={!visibleOptions ? styles.selectedOption : undefined}>
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
                {dictionary?.select?.actions?.clear || 'No assignment'}
            </Button>
            <ScrollContent className={styles.optionsList}>
                {renderOptions(
                    filteredAutocompleteOption.length === 0 ? filteredSelectedOptions : filteredAutocompleteOption,
                    setSearchValue,
                    selectedItems,
                    setSelectedItems,
                    handleSelect,
                    assignedPractionnerRoles,
                )}
            </ScrollContent>
        </div>
    );
    return (
        <>
            <Select
                className={styles.selectInput}
                dropdownRender={dropdownContent}
                dropdownStyle={{ display: visibleOptions ? 'none' : 'undefined' }}
                mode="multiple"
                onDropdownVisibleChange={(open) => {
                    setOpenDropdown(open);
                }}
                onSearch={(e) => setSearchValue(e)}
                options={allOption}
                placeholder={dictionary?.select?.textInfo?.searchPlaceholder || 'Search'}
                searchValue={searchValue}
                style={{ width: '100%' }}
                tagRender={tagRender(selectedItems, setSelectedItems)}
                value={selectedOptions.length > 0 || visibleOptions ? selectedOptions : noAssignValue}
            />
            {visibleOptions && dropdownContent()}
        </>
    );
};

export default AssignmentsSelect;
