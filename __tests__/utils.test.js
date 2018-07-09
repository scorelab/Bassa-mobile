import { formatBytes, prepareRequestBody } from '../app/helpers/utils';

describe('formatBytes()', () => {
    it('should return null if a parameter is not passed', () => {
        expect(formatBytes())
            .toBeNull();
    });

    it('should give the string representation of a given byte value', () => {
        const byteVals = [1024, 0, 1024000];
        const returnVals = ['1.024 KB', '0 Bytes', '1.024 MB']

        expect(byteVals.map(val => formatBytes(val)))
        .toEqual(returnVals);
    });
});

describe('prepareRequestBody()', () => {
    it('should return the stringified body of a given object', () => {
        const params = {
            fname: 'Gayashan',
            lname: 'Kalhara'
        }

        expect(prepareRequestBody(params))
        .toEqual('fname=Gayashan&lname=Kalhara');
    });
});