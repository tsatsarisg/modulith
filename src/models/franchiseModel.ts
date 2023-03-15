import { IFranchise } from '../ts/interfaces/FranchiseInterfaces'
import { FranchiseCategories } from '../ts/types/FranchiseTypes'

export default class Franchise {
    private name: string
    private category: FranchiseCategories

    constructor(props: IFranchise) {
        this.name = props.name
        this.category = props.category
    }

    public get getName(): string {
        return this.name
    }

    public set setName(value: string) {
        this.name = value
    }
}
