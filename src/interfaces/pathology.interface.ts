import { Model, Optional } from "sequelize"

enum Status{
    "active",
    "inactive"
}

export interface PathologyInterface{
    id?: number
    name:string
    status:Status
}

interface PathologyCreationAttributes extends Optional<PathologyInterface, "id"> {}

export interface PathologyInstance extends Model<PathologyInterface, PathologyCreationAttributes>, PathologyInterface {}