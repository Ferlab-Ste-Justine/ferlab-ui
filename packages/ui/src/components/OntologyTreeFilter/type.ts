import { DataNode } from 'antd/lib/tree';

export interface ILegacyOntologyTreeData {
    key: string;
    doc_count: number;
    top_hits: {
        parents: string[];
    };
    filter_by_term: {
        doc_count: number;
    };
}

export interface IOntologyTreeData {
    key: string;
    doc_count: number;
    top_hits: {
        parents: string[];
        children: string[];
    };
    filter_by_term: {
        doc_count: number;
    };
}

export interface IOntologyDataNode extends Omit<DataNode, 'children' | 'key'> {
    path: string;
    key: string;
    name: string;
    children: IOntologyDataNode[];
    checked?: boolean;
    participantsWithExactTerm: number;
    participantsCount: number;
    disabled?: boolean;
    hasSearchTerm?: boolean;
}
