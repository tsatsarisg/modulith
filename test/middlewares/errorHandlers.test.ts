import errorHandler from '../../src/middlewares/errorHandler'

import { NextFunction, Request, Response } from 'express'
import { OperationalError } from '../../src/utils/OperationalError'
import { EError } from '../../src/ts/types/FranchiseTypes'

describe('errorHandler [middleware]', () => {
    it('should send an error response to the client',() => {
        const req: Request = {} as Request
        const res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        const err = new OperationalError('test', EError.BadRequest)
        const next = jest.fn()

        errorHandler(err, req, res, next)

        expect(res.status).toHaveBeenCalledWith(EError.BadRequest)
        expect(res.json).toHaveBeenCalledWith({message: 'test'})
    })

    it('should send an internal server error response to the client',() => {
        const req: Request = {} as Request
        const res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        const err = new Error() as OperationalError
        const next = jest.fn()

        errorHandler(err, req, res, next)

        expect(res.status).toHaveBeenCalledWith(EError.InternalServerError)
    })

    it('should call next if no error occurs',() => {
        const req: Request = {} as Request
        const res: Response =  {} as unknown as Response;
        
        const next = jest.fn()

        errorHandler(undefined, req, res, next)

        expect(next).toHaveBeenCalled()
    })
})
