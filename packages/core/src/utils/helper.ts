/* export const getPositionAt = (value: string, subString: string, index: number) =>
  value.split(subString, index).join(subString).length;

export const extractFilename = (contentDisposition: string, defaultFileName: string = '') =>
  contentDisposition
    ?.split(';')
    .find((e) => e?.startsWith(' filename='))
    ?.split('=')?.[1] || defaultFileName; */