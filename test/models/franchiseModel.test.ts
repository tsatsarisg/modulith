import { FranchiseProps } from '../../src/packages/franchise/franchise.interface'
import Franchise from '../../src/packages/franchise/franchise.model'

describe('franchiseModels [models]', () => {
    it("should throw error if category isn't supported", () => {
        const sampleJSONArray = { name: 'test', category: 'Bakedsry' }

        expect(new Franchise(sampleJSONArray as FranchiseProps)).toThrow()
    })

    it('should return a franchise object', () => {
        const sampleJSONArray = { name: 'test', category: 'Bakery' }
        const testFranchise = new Franchise(sampleJSONArray as FranchiseProps)
        expect(testFranchise.getName).toBe('test')
        expect(testFranchise.getCategory).toBe('Bakery')
        expect(testFranchise.toJson()).toStrictEqual({
            id: undefined,
            name: 'test',
            category: 'Bakery',
        })
    })
})
