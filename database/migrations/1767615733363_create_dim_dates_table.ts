import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'dw.dim_dates'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('date_key').primary()
      table.date('full_date').notNullable()
      table.integer('day_number')
      table.integer('month_number')
      table.string('month_name', 20)
      table.integer('quarter_number')
      table.integer('year_number')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
