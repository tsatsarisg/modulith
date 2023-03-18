import plainToClass from '../../src/utils/plainToClass'
import Franchise from '../../src/models/franchiseModel'
describe('plainToClass [utils]', () => {
    it('should return a typed array',() => {
        const sampleJSONArray = [{_id:'id', name: 'test', category:'test'}]
        const typedArray = plainToClass(sampleJSONArray, Franchise)

        expect(typedArray).toHaveLength(1)
        expect(typedArray[0].getName).toEqual('test')
    })
})
