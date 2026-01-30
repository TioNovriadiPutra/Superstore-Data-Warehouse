import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import FactSale from './fact_sale.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class DimLocation extends BaseModel {
  @column({ isPrimary: true })
  declare locationKey: number

  @column()
  declare city: string

  @column()
  declare state: string

  @column()
  declare region: string

  @hasMany(() => FactSale)
  declare sales: HasMany<typeof FactSale>
}
