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
    transferKey: string; // key e.g. node
    path: string; // path to the node. e.g. parent/parent
    key: string; // path + key e.g. parent/parent/node
    name: string;
    children: IOntologyDataNode[];
    checked?: boolean;
    participantsWithExactTerm: number;
    participantsCount: number;
    disabled?: boolean;
    hasSearchTerm?: boolean;
}
