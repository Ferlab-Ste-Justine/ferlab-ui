import React, { useEffect, useState } from 'react';
import { Button, Select } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

import ScrollContent from '../../../layout/ScrollContent';
import AssignmentsTag from '../AssignmentsTag';
import { TPractitionnerInfo, TPractitionnerName } from '../types';

import styles from './index.module.scss';

export type TAssignmentsSelect = {
    options: TPractitionnerInfo[];
    visibleOptions?: boolean;
    handleSelect: (practitionerRoles_ids: string[]) => void;
    assignedPractionnerRoles: string[];
};

const getPractitionnerName = (name: TPractitionnerName) => `${name[0].given.join(' ')} ${name[0].family}`;

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

export const AssignmentsSelect = ({
    assignedPractionnerRoles,
    handleSelect,
    options,
    visibleOptions = false,
}: TAssignmentsSelect) => {
    const alreadySelectedOption = options.filter((r) => assignedPractionnerRoles?.includes(r.practitionerRoles_Id));
    const [selectedItems, setSelectedItems] = useState<TPractitionnerInfo[]>(alreadySelectedOption);
    const filteredOptions = options.filter(
        ({ practitionerRoles_Id: id1 }) => !selectedItems.some(({ practitionerRoles_Id: id2 }) => id2 === id1),
    );
    const selectedOptions = selectedItems.reduce(
        (acc: { value: string }[], curr: TPractitionnerInfo) => [...acc, { value: curr.practitionerRoles_Id }],
        [],
    );

    useEffect(() => {
        handleSelect(
            selectedItems.reduce((acc: string[], curr: TPractitionnerInfo) => [...acc, curr.practitionerRoles_Id], []),
        );
    }, [selectedItems]);

    return (
        <>
            <Select
                className={styles.selectInput}
                mode="multiple"
                open={false}
                options={selectedOptions}
                placeholder="Recherche"
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
                        }}
                        size="small"
                        type="link"
                    >
                        Aucune Assignation
                    </Button>
                    <ScrollContent className={styles.optionsList}>
                        {filteredOptions?.map((value: TPractitionnerInfo) => (
                            <Button
                                key={value.practitionerRoles_Id}
                                onClick={() => {
                                    setSelectedItems([...selectedItems, value]);
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
                        ))}
                    </ScrollContent>
                </div>
            )}
        </>
    );
};

export default AssignmentsSelect;
