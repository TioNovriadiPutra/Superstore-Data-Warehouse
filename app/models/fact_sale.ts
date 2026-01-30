import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import DimDate from './dim_date.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import DimCustomer from './dim_customer.js'
import DimProduct from './dim_product.js'
import DimLocation from './dim_location.js'

export default class FactSale extends BaseModel {
  @column({ isPrimary: true })
  declare salesId: number

  @column()
  declare quantity: number

  @column()
  declare sales: number

  @column()
  declare discount: number

  @column()
  declare profit: number

  @column()
  declare dateKey: number

  @column()
  declare customerKey: number

  @column()
  declare productKey: number

  @column()
  declare locationKey: number

  @belongsTo(() => DimDate)
  declare date: BelongsTo<typeof DimDate>

  @belongsTo(() => DimCustomer)
  declare customer: BelongsTo<typeof DimCustomer>

  @belongsTo(() => DimProduct)
  declare product: BelongsTo<typeof DimProduct>

  @belongsTo(() => DimLocation)
  declare location: BelongsTo<typeof DimLocation>
}
