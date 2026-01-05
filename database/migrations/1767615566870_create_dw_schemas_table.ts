import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'dw_schemas'

  async up() {
    this.schema.raw('CREATE SCHEMA IF NOT EXISTS dw')
  }

  async down() {
    this.schema.raw('DROP SCHEMA IF EXISTS dw CASCADE')
  }
}
