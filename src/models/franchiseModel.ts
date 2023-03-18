import { ObjectId } from 'mongodb'
import { EError, franchiseCategories, FranchiseProps } from '../ts/types/FranchiseTypes'
import { FranchiseCategories } from '../ts/types/FranchiseTypes'
import { OperationalError } from '../utils/OperationalError'

export default class Franchise {
    private _id?: ObjectId
    private name: string
    private category: FranchiseCategories

    constructor(props: FranchiseProps) {
        this._id = props._id
        this.name = props.name
        this.category = this.validateCategory(props.category)
    }

    public get getName(): string {
        return this.name
    }

    public set setName(value: string) {
        this.name = value
    }

    public get getCategory(): string {
        return this.category
    }

    private validateCategory = (category: string): FranchiseCategories => {
        if (franchiseCategories.includes(category)) 
            return category as FranchiseCategories
        else throw new OperationalError(`Given category isn't supported yet.`, EError.BadRequest)
    }

    public toJson() {
        return {
            id: this._id?.toString(),
            name: this.getName,
            category: this.getCategory
        }
    }
}
