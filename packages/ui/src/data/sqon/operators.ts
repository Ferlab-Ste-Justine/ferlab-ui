export enum FieldOperators {
    '>' = '>',
    '<' = '<',
    between = 'between',
    '>=' = '>=',
    '<=' = '<=',
    in = 'in',
    'not-in' = 'not-in',
    'some-not-in' = 'some-not-in',
    all = 'all',
}

export enum RangeOperators {
    '>' = '>',
    '<' = '<',
    between = 'between',
    '>=' = '>=',
    '<=' = '<=',
}

export enum TermOperators {
    in = 'in',
    'not-in' = 'not-in',
    all = 'all',
    'some-not-in' = 'some-not-in'
}

export enum BooleanOperators {
    and = 'and',
    or = 'or',
    not = 'not',
}