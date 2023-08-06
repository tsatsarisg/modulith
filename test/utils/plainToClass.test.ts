import plainToClass from '../../src/utils/plainToClass'
import Franchise from '../../src/models/franchise.model'
describe('plainToClass [utils]', () => {
    it('should return a typed array', () => {
        const sampleJSONArray = [
            { _id: 'id', name: 'test', category: 'Bakery' },
        ]
        const typedArray = plainToClass(sampleJSONArray, Franchise)

        expect(typedArray).toHaveLength(1)
        expect(typedArray[0].getName).toEqual('test')
    })
})
