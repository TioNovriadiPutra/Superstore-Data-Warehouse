import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'dw.fact_sales'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('sales_id').primary()

      table.integer('quantity')
      table.float('sales')
      table.float('discount')
      table.float('profit')

      table.integer('date_key').references('date_key').inTable('dw.dim_dates')

      table.integer('customer_key').references('customer_key').inTable('dw.dim_customers')

      table.integer('product_key').references('product_key').inTable('dw.dim_products')

      table.integer('location_key').references('location_key').inTable('dw.dim_locations')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
