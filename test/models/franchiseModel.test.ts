import plainToClass from '../../src/utils/plainToClass'
import Franchise from '../../src/models/franchiseModel'
import { ObjectId } from 'mongodb'
import { EError, FranchiseProps } from '../../src/ts/types/FranchiseTypes'
import { OperationalError } from '../../src/utils/OperationalError'

describe('franchiseModels [models]', () => {
    it('should throw error if category isn\'t supported',() => {
        const sampleJSONArray = { name: 'test', category: 'Bakedsry'}

        try {
            const testFranchise = new Franchise(sampleJSONArray as FranchiseProps)
        } catch (e) {
            const {statusCode} = e as OperationalError
            expect(statusCode).toBe(400)
        }
    })

    it('should return a franchise object',() => {
        const sampleJSONArray = { name: 'test', category: 'Bakery'}
        const testFranchise = new Franchise(sampleJSONArray as FranchiseProps)
        expect(testFranchise.getName).toBe('test')
        expect(testFranchise.getCategory).toBe('Bakery')
        expect(testFranchise.toJson()).toStrictEqual({id: undefined, name: 'test', category: 'Bakery'})
    })
})
