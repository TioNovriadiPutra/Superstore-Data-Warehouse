import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'dw.dim_customers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('customer_key').primary()
      table.uuid('customer_id').unique()
      table.string('customer_name', 50)
      table.string('segment', 20)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
