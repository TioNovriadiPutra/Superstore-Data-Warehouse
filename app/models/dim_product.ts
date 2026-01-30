import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import FactSale from './fact_sale.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class DimProduct extends BaseModel {
  @column({ isPrimary: true })
  declare producKey: number

  @column()
  declare productId: string

  @column()
  declare productName: string

  @column()
  declare subCategory: string

  @column()
  declare category: string

  @hasMany(() => FactSale)
  declare sales: HasMany<typeof FactSale>
}
