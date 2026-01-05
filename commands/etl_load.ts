import { loadDimCustomers } from '#services/etl/load_dim_customers'
import { loadDimDates } from '#services/etl/load_dim_dates'
import { loadDimLocations } from '#services/etl/load_dim_locations'
import { loadDimProducts } from '#services/etl/load_dim_products'
import { loadFactSales } from '#services/etl/load_fact_sales'
import { BaseCommand } from '@adonisjs/core/ace'
import { CommandOptions } from '@adonisjs/core/types/ace'

export default class EtlLoad extends BaseCommand {
  static commandName = 'etl:load'
  static description = 'Load data from OLTP to Data Warehouse'

  static options: CommandOptions = {
    startApp: true,
    allowUnknownFlags: false,
    staysAlive: false,
  }

  async run() {
    this.logger.info('ETL started...')

    await loadDimDates()
    await loadDimCustomers()
    await loadDimProducts()
    await loadDimLocations()
    await loadFactSales()

    this.logger.success('ETL finished successfully')
  }
}
