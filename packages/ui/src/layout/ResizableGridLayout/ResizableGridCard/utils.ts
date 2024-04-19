import { format } from 'date-fns';

export type TDictionary = {
    download?: {
        fileNameTemplate?: string;
        fileNameDateFormat?: string;
        preview?: string;
        download?: string;
        data?: string;
        svg?: string;
        png?: string;
        removeChart?: string;
    };
};

export type TDownloadSettings = {
    tsv: boolean;
    svg: boolean;
    png: boolean;
};

export enum DownloadKey {
    png = 'png',
    svg = 'svg',
    tsv = 'tsv',
}

export enum DownloadType {
    data = 'data',
    chart = 'chart',
}

export const fileNameFormatter = (
    fileNameTemplate: string,
    type: DownloadType,
    dateFormat: string,
    name: string,
    extension: string,
): string => {
    const formattedDate = format(new Date(), dateFormat);
    return fileNameTemplate
        .replace('%name', name.toLowerCase().replace(/ /g, ''))
        .replace('%type', type)
        .replace('%date', formattedDate)
        .replace('%extension', extension);
};

/**
 * Downloads an SVG element as an SVG file with the specified file name.
 *
 * @param {string} fileName - The name of the file to be downloaded.
 * @param {Element} svg - The SVG element to be downloaded.
 * @returns {Promise<void>} A promise that resolves once the download is complete.
 */
export const downloadToSvg = async (fileName: string, svg: Element) => {
    // Serialize the SVG element to a string
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svg);

    // Ensure SVG element has necessary XML namespaces
    if (!source.includes('xmlns="http://www.w3.org/2000/svg"')) {
        source = source.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if (!source.includes('xmlns:xlink="http://www.w3.org/1999/xlink"')) {
        source = source.replace('<svg', '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }

    // Add XML declaration and prepare SVG data URL
    const svgWithXmlDeclaration = `<?xml version="1.0" standalone="no"?>\r\n${source}`;
    const url = 'data:image/svg+xml;base64,' + btoa(svgWithXmlDeclaration);

    // Create an anchor element for download
    const a = document.createElement('a');
    a.download = `${fileName}.svg`;
    a.href = url;

    // Create a promise that resolves when the download is complete
    const downloadPromise = new Promise<void>((resolve) => {
        a.addEventListener(
            'click',
            () => {
                // Clean up after download
                document.body.removeChild(a);
                resolve();
            },
            { once: true },
        );
    });

    // Add the anchor element to the document body and trigger download
    document.body.appendChild(a);
    a.click();

    return downloadPromise;
};

export const populateMenuItems = (settings: TDownloadSettings, dictionary?: TDictionary) => {
    const items = [];

    if (settings.tsv) {
        items.push({
            key: DownloadKey.tsv,
            label: dictionary?.download?.data ?? 'Download data',
        });
    }

    if (settings.svg) {
        items.push({
            key: DownloadKey.svg,
            label: dictionary?.download?.svg ?? 'Download SVG',
        });
    }

    if (settings.png) {
        items.push({
            key: DownloadKey.png,
            label: dictionary?.download?.png ?? 'Download PNG',
        });
    }

    return items;
};
