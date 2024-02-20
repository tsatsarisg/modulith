import { Request, Response } from 'express'
import {
    FranchiseProps,
    IFranchiseService,
} from '../../packages/franchise/franchise.interface'

export default class FranchiseController {
    constructor(private franchiseService: IFranchiseService) {
        this.franchiseService = franchiseService
    }

    async get(req: Request, res: Response) {
        const { id } = req.query
        if (!id) throw new Error('No matches found.')

        const franchise = await this.franchiseService.getFranchise(id as string)

        return res.status(200).json(franchise)
    }

    async list(req: Request, res: Response) {
        const franchises = await this.franchiseService.getFranchises(req.body)

        return res.status(200).json(franchises)
    }

    async create(req: Request, res: Response) {
        const franchiseProps: FranchiseProps = { ...req.body }

        return res
            .status(201)
            .json(await this.franchiseService.createFranchise(franchiseProps))
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id
        if (!id) return res.status(404)

        return res.json(await this.franchiseService.deleteFranchise(id))
    }
}
