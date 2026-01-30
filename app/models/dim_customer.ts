import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import FactSale from './fact_sale.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class DimCustomer extends BaseModel {
  @column({ isPrimary: true })
  declare customerKey: number

  @column()
  declare customerId: string

  @column()
  declare customerName: string

  @column()
  declare segment: string

  @hasMany(() => FactSale)
  declare sales: HasMany<typeof FactSale>
}
