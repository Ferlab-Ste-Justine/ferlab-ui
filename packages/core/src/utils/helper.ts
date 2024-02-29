export const extractFilename = (contentDisposition: string, defaultFileName: string = '') =>
  contentDisposition
    ?.split(';')
    .find((e) => e?.startsWith(' filename='))
    ?.split('=')?.[1] || defaultFileName;

export const downloadFile = (blob: Blob, filename: string) => {
  const downloadLinkElement = document.createElement('a');
  downloadLinkElement.href = window.URL.createObjectURL(blob);
  downloadLinkElement.download = filename;
  document.body.appendChild(downloadLinkElement);
  downloadLinkElement.click();
  document.body.removeChild(downloadLinkElement);
  URL.revokeObjectURL(downloadLinkElement.href);
};