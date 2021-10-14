export const ArrangerValues = {
    missing: '__missing__',
    noData: ' No Data',
    true: '1',
    false: '0',
}

export const AggregateValues= {
    true: 'true',
    false: 'false'
}
export const keyEnhance = (key: string, s: string = ArrangerValues.noData): string | boolean => {
  switch (key) {
    case ArrangerValues.missing:
      return s;
    case ArrangerValues.true:
      return AggregateValues.true;
    case ArrangerValues.false:
      return AggregateValues.false;
    default:
      return key;
  }
};

export const keyEnhanceBooleanOnly = (key: string) => {
  switch (key) {
    case ArrangerValues.true:
      return AggregateValues.true;
    case ArrangerValues.true:
      return AggregateValues.false;
    default:
      return key;
  }
};

export const dotToUnderscore = (str: string) => str.replaceAll('.', '__');
export const underscoreToDot = (str: string) => str.replaceAll('__', '.');
