import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import FactSale from './fact_sale.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class DimDate extends BaseModel {
  @column({ isPrimary: true })
  declare dateKey: number

  @column.date()
  declare fullDate: DateTime

  @column()
  declare dayNumber: number

  @column()
  declare monthNumber: number

  @column()
  declare monthName: string

  @column()
  declare quarterNumber: number

  @column()
  declare yearNumber: number

  @hasMany(() => FactSale)
  declare sales: HasMany<typeof FactSale>
}
