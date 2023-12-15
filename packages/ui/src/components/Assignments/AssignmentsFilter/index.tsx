import React, { ReactElement, useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, Space } from 'antd';
import type { FilterConfirmProps } from 'antd/es/table/interface';

import ScrollContent from '../../../layout/ScrollContent';
import StackLayout from '../../../layout/StackLayout';
import AssignmentsTag from '../AssignmentsTag';
import { IAssignmentsDictionary, TPractitionnerInfo, TPractitionnerName } from '../types';

import styles from './index.module.scss';

export type TAssignmentsFilter = {
    dictionary?: IAssignmentsDictionary | Record<string, never>;
    options: TPractitionnerInfo[];
    confirm?: (param?: FilterConfirmProps) => void;
    selectedKeys?: React.Key[];
    setSelectedKeys?: (selectedKeys: React.Key[]) => void;
};

export const getPractitionnerName = (name: TPractitionnerName): string =>
    `${name[0].given.join(' ')} ${name[0].family}`;

const handleSelect = (
    value: string,
    selectedKeys: React.Key[],
    setSelectedKeys: (selectedKeys: React.Key[]) => void,
) => {
    selectedKeys.includes(value)
        ? setSelectedKeys(selectedKeys.filter((item: React.Key) => item !== value))
        : setSelectedKeys([value, ...selectedKeys]);
};

const AssignmentsFilter = ({
    confirm,
    dictionary,
    options,
    selectedKeys,
    setSelectedKeys,
}: TAssignmentsFilter): ReactElement => {
    const [searchValue, setSearchValue] = useState<string | undefined>();
    const [filteredOption, setFilteredOption] = useState<TPractitionnerInfo[]>([]);
    const [selectedOption, setSelectedOption] = useState<React.Key[]>(selectedKeys ? selectedKeys : []);
    useEffect(() => {
        searchValue
            ? setFilteredOption(
                  options.filter((o) => getPractitionnerName(o.name).toLowerCase().includes(searchValue.toLowerCase())),
              )
            : setFilteredOption(options);
    }, [searchValue]);

    useEffect(() => {
        if (selectedKeys && setSelectedKeys) {
            setSelectedKeys(selectedOption);
        }
    }, [selectedOption]);

    useEffect(() => {
        !searchValue && setFilteredOption(options);
    }, [options]);

    const handleSearch = (confirm?: (param?: FilterConfirmProps) => void) => {
        confirm && confirm();
    };
    return (
        <>
            <div className={styles.assignmentContainer}>
                <Input
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={dictionary?.filter?.textInfo?.searchPlaceholder?.toString() || 'Search'}
                    suffix={<SearchOutlined />}
                    value={searchValue}
                />
                <ScrollContent className={styles.checkBoxContainer}>
                    <Space direction="vertical" size={8}>
                        {!searchValue && (
                            <Checkbox
                                checked={selectedKeys?.includes('noAssign') ? true : false}
                                key={'noAssign'}
                                onChange={(e) => {
                                    handleSelect(e.target.value, selectedOption, setSelectedOption);
                                }}
                                type="checkbox"
                                value={'noAssign'}
                            >
                                <AssignmentsTag background={false} dictionary={dictionary} unAssign={true} />
                            </Checkbox>
                        )}
                        {filteredOption?.map((value: TPractitionnerInfo) => (
                            <Checkbox
                                checked={selectedOption.includes(value.practitionerRoles_Id) ? true : false}
                                key={value.practitionerRoles_Id}
                                onChange={(e) => {
                                    handleSelect(e.target.value, selectedOption, setSelectedOption);
                                }}
                                type="checkbox"
                                value={value.practitionerRoles_Id}
                            >
                                <AssignmentsTag
                                    background={false}
                                    email={value.email ? value.email : ''}
                                    name={getPractitionnerName(value.name)}
                                    organization={value.ldm}
                                />
                            </Checkbox>
                        ))}
                    </Space>
                </ScrollContent>
            </div>

            <StackLayout className={styles.filterFooter} horizontal>
                <Button
                    className={styles.resetButton}
                    disabled={selectedOption.length === 0 ? true : false}
                    onClick={() => setSelectedOption([])}
                    size="small"
                    type="text"
                >
                    {dictionary?.filter?.actions?.reset || 'Reset'}
                </Button>
                <Button
                    onClick={() => {
                        setSearchValue(undefined);
                        handleSearch(confirm);
                    }}
                    size="small"
                    type="primary"
                >
                    {dictionary?.filter?.actions?.filter || 'Filter'}
                </Button>
            </StackLayout>
        </>
    );
};

export default AssignmentsFilter;
