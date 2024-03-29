// export interface User {
//     id: string
//     email: string
//     password: string
// }

import { userCollection } from 'index'
import User from './user.model'
import UserRepository from './user.repository'
import UserService from './user.service'

export interface IUserService {
    getUser(id: string): Promise<User>
    createUser(props: { email: string; password: string }): Promise<User>
    deleteUser(id: string): Promise<void>
}

const userRepo = new UserRepository(userCollection)
export const userService = new UserService(userRepo)
