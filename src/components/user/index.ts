import { Collection } from 'mongodb'
import User from './user.model'
import UserRepository from './user.repository'
import UserService from './user.service'

export interface IUserService {
    getUser(id: string): Promise<User>
    createUser(props: { email: string; password: string }): Promise<User>
    deleteUser(id: string): Promise<void>
}

export const buildUserService = (userCollection: Collection): IUserService => {
    const userRepo = new UserRepository(userCollection)
    return new UserService(userRepo)
}
