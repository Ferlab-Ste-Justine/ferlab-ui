import { isNameExists } from './requestBiospecimen.utils';

describe('BiospecimenRequest utils', () => {
    test('isNameExists should find duplicate', () => {
        const data = [
            {
                created_date: '2023-12-18T20:03:16.113Z',
                id: '01bba984-2915-4e14-81ea-f706ca3fd545',
                setType: 'biospecimen-request',
                size: 2,
                tag: 'biospecimen Set',
                updated_date: '2023-12-18T20:03:16.113Z',
            },
            {
                created_date: '2023-07-18T20:03:16.113Z',
                id: '01bba984-2915-4e14-81ea-f706ca3fd541',
                setType: 'biospecimen-request',
                size: 2,
                tag: 'biospecimen Set 2',
                updated_date: '2023-08-18T20:03:16.113Z',
            },
        ];

        expect(isNameExists(data[0].tag, data)).toBeTruthy();
        expect(isNameExists('no existing set', data)).toBeFalsy();
    });
});
