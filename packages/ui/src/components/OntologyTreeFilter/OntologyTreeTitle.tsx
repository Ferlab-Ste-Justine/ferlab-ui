import React from 'react';
import { Col, Row, Tag, Typography } from 'antd';

import { cleanNodeKey, CODE_REGEX, extractCodeAndTitle, HP_CODE, MONDO_CODE } from './utils';

import styles from './index.module.css';

type TSearchterm = {
    query: string;
    regex: string;
    before: string;
    term: string;
    after: string;
};

type TOntologyTreeTitle = {
    name: string;
    participantsWithExactTerm: number;
    searchTerm?: TSearchterm;
    participantsCount: number;
};

export const findOccurenceIndex = (name: string, query: string): number => {
    let index = name.toLowerCase().indexOf(query.toLowerCase());
    if (index == -1) {
        index = cleanNodeKey(name).toLowerCase().indexOf(query.toLowerCase());
    }

    return index;
};

const SearchResultTreeTitle = ({ name, query }: { name: string; query: string }) => {
    const nameLeftParenthesis = name.indexOf('(');
    const queryLeftParenthesis = query.indexOf('(');

    // since special character are removed, need to manage case  "331)"
    if (queryLeftParenthesis == -1 && query.slice(-1) === ')') {
        query = query.substring(0, query.length - 1);
    }

    // from name
    const firstIndex = findOccurenceIndex(name, query);
    let lastIndex = firstIndex + query.length;
    const beforeText = name.substring(0, firstIndex);
    const termText = name.substring(firstIndex, lastIndex);
    let afterText = name.substring(lastIndex);

    // Query has left parenthesis e.g. "morphology (HP:00", "morphology (hp:0012331)"
    if (queryLeftParenthesis != -1) {
        const termTextTitle = termText.substring(0, termText.indexOf('('));
        const termTextCode = termText.substring(termText.indexOf('('));
        return (
            <>
                <Typography.Text>
                    {beforeText}
                    <div className={styles.highlight}>{termTextTitle}</div>
                </Typography.Text>
                <Typography.Text className={styles.code} type="secondary">
                    <div className={styles.highlight}>{termTextCode}</div>
                    {afterText}
                </Typography.Text>
            </>
        );
    }

    // Query constaint code only e.g. HP:0001654
    if (query.toLowerCase().startsWith(HP_CODE) || query.toLowerCase().startsWith(MONDO_CODE)) {
        const termTextTitle = name.substring(0, nameLeftParenthesis);
        return (
            <>
                <Typography.Text>{termTextTitle}</Typography.Text>
                <Typography.Text className={styles.code} type="secondary">
                    (<div className={styles.highlight}>{termText}</div>
                    {afterText}
                </Typography.Text>
            </>
        );
    }

    // Query has no parenthesis but still contains a code e.g. "morphology HP:00" or "007"
    // Parenthesis must be added to keep the correct style
    if (lastIndex > nameLeftParenthesis) {
        // Manage code query e.g. "HP:007", "007", "P:007"
        const code = name.substring(nameLeftParenthesis);
        const queryCodeIndex = code.toLowerCase().indexOf(query.toLowerCase());
        if (queryCodeIndex != -1) {
            const beforeTextCode = code.slice(0, queryCodeIndex);
            const termTextCode = code.replace(beforeTextCode, '').slice(0, query.length);
            const termTextTitle = name.slice(0, name.indexOf('('));
            return (
                <>
                    <Typography.Text>{termTextTitle}</Typography.Text>
                    <Typography.Text className={styles.code} type="secondary">
                        {beforeTextCode}
                        <div className={styles.highlight}>{termTextCode}</div>
                        {afterText}
                    </Typography.Text>
                </>
            );
        }

        // Manage word + code e.g. "morphology HP:00", "morphology hp:0012443"
        lastIndex = lastIndex + 1; // manage missing left parenthesis
        const termText = name.substring(firstIndex, lastIndex);
        afterText = afterText.slice(1);
        const termTextCode = termText.slice(nameLeftParenthesis - lastIndex);
        const termTextTitle = termText.slice(0, termText.indexOf('('));

        return (
            <>
                <Typography.Text>
                    {beforeText}
                    <div className={styles.highlight}>{termTextTitle}</div>
                </Typography.Text>
                <Typography.Text className={styles.code} type="secondary">
                    <div className={styles.highlight}>{termTextCode}</div>
                    {afterText}
                </Typography.Text>
            </>
        );
    }

    // Query only contains title term e.g. "morphology"
    const termTextCode = name.substring(nameLeftParenthesis);
    afterText = afterText.replace(termTextCode, '');

    return (
        <Typography.Text>
            {beforeText}
            <div className={styles.highlight}>{termText}</div>
            {afterText}

            <Typography.Text className={styles.code} type="secondary">
                {termTextCode}
            </Typography.Text>
        </Typography.Text>
    );
};

const OntologyTreeTitle = ({
    name,
    participantsCount,
    participantsWithExactTerm,
    searchTerm,
}: TOntologyTreeTitle): JSX.Element => {
    const { code, title } = extractCodeAndTitle(name);

    return (
        <div className={styles.treeNodeTitle}>
            <div>
                {searchTerm ? (
                    <SearchResultTreeTitle name={name} query={searchTerm.query} />
                ) : (
                    <>
                        {title}
                        <Typography.Text className={styles.code} type="secondary">
                            {code}
                        </Typography.Text>
                    </>
                )}
            </div>
            <div className={styles.treeNodeParticipants}>
                <Row>
                    <Col className={styles.treeNodeParticipantsCount} md={12}>
                        <Tag>{participantsWithExactTerm}</Tag>
                    </Col>
                    <Col className={styles.treeNodeParticipantsCount} md={12}>
                        <Tag>{participantsCount}</Tag>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default OntologyTreeTitle;
