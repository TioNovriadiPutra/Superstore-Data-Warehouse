import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'dw.dim_locations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('location_key').primary()
      table.string('city', 50)
      table.string('state', 50)
      table.string('region', 50)

      table.unique(['city', 'state', 'region'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
