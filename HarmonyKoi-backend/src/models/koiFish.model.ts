import { DataTypes, Model } from "sequelize"

import SQLModel from "~/constants/SQLModel"
import UUIDModel from "~/constants/UUIDModel"
import sequelize from "~/databases/database"

import { Element } from "./element.model"
import { PatternType } from "./patternType.model"
import { Reticulation } from "./reticulation.model"
import { Veriety } from "./veriety.model"

const tableName = "KoiFish"

export const KoiFish = sequelize.define<KoiFishInstance>(tableName, {
  ...UUIDModel,
  verietyId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  elementId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  baseColor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  patternTypeId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  reticulationId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  metallic: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  symbolism: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ...SQLModel
})

KoiFish.belongsTo(Veriety, {
  foreignKey: "verietyId",
  as: "veriety"
})

KoiFish.belongsTo(Element, {
  foreignKey: "elementId",
  as: "element"
})

KoiFish.belongsTo(PatternType, {
  foreignKey: "patternTypeId",
  as: "patternType"
})

KoiFish.belongsTo(Reticulation, {
  foreignKey: "reticulationId",
  as: "reticulation"
})

export interface KoiFishAttributes {
  id?: string
  verietyId: string
  elementId: string
  name: string
  description: string | null
  imageUrl: string | null
  baseColor: string
  patternTypeId: string
  reticulationId: string
  metallic: boolean
  symbolism: string | null
  price: number
  isDeleted?: boolean
}

// Define KoiFishInstance interface
export interface KoiFishInstance extends Model<KoiFishAttributes>, KoiFishAttributes {}
