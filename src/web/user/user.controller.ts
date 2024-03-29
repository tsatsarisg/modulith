import { IUserService } from '@components/user'
import Joi from 'joi'
import { Request, Response } from 'express'

const createSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})

export default class UserController {
    constructor(private userService: IUserService) {
        this.userService = userService
    }

    get = async (req: Request, res: Response) => {
        const { id } = req.query
        if (!id) return res.status(400).json({ message: 'No id provided.' })

        const franchise = await this.userService.getUser(id as string)

        return res.status(200).json(franchise)
    }

    create = async (req: Request, res: Response) => {
        const { error, value } = createSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ error })
        }

        const franchise = await this.userService.createUser(value)

        return res.status(201).json(franchise)
    }

    delete = async (req: Request, res: Response) => {
        const id = req.params.id
        if (!id) return res.status(400).json({ message: 'No id provided.' })

        return res.json(await this.userService.deleteUser(id))
    }
}
