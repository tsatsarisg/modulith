import { Request, Response } from 'express'
import FranchiseRepository from '../repositories/franchise.repository'
import FranchiseService from '../services/franchiseService'
import { FranchiseGetRequest } from '../ts/interfaces/FranchiseInterfaces'
import { FranchiseProps } from '../ts/types/FranchiseTypes'
import { franchiseCollection } from '..'

export default class FranchiseController {
    private franchiseService: FranchiseService

    constructor() {
        const franchiseRepository = new FranchiseRepository(
            franchiseCollection()
        )
        this.franchiseService = new FranchiseService(franchiseRepository)
    }

    async get(req: FranchiseGetRequest, res: Response) {
        const { id } = req.query
        if (!id) throw new Error('No matches found.')

        const franchise = await this.franchiseService.getFranchise(id as string)

        return res.status(200).json(franchise)
    }

    async list(req: FranchiseGetRequest, res: Response) {
        const franchises = await this.franchiseService.getFranchises(req.body)

        return res.status(200).json(franchises)
    }

    async create(req: Request, res: Response) {
        const franchiseProps: FranchiseProps = { ...req.body }

        return res
            .status(201)
            .json(await this.franchiseService.createFranchise(franchiseProps))
    }

    async update(req: FranchiseGetRequest, res: Response) {
        const { id } = req.query
        if (!id) throw new Error('No matches found.')

        const franchise = await this.franchiseService.updateFranchise(
            id as string,
            req.body
        )

        return res.status(200).json(franchise)
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id
        if (!id) return res.status(404)

        return res.json(await this.franchiseService.deleteFranchise(id))
    }
}
