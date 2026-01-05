import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'dw.dim_products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('product_key').primary()
      table.uuid('product_id').unique()
      table.string('product_name', 50)
      table.string('sub_category', 50)
      table.string('category', 50)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
