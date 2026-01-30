import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { percentFromLast, profitMargin } from '../helpers/converter.js'

export default class AnalyticsController {
  async getKPI({ response }: HttpContext) {
    try {
      const now = new Date()

      const currentYear = now.getFullYear()
      const currentMonth = now.getMonth() + 1

      const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1
      const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear

      const current = await db
        .from('fact_sales')
        .join('dim_dates', 'fact_sales.date_key', 'dim_dates.date_key')
        .where('dim_dates.year_number', currentYear)
        .where('dim_dates.month_number', currentMonth)
        .sum('fact_sales.sales as sales')
        .sum('fact_sales.profit as profit')
        .sum('fact_sales.quantity as quantity')
        .first()

      const last = await db
        .from('fact_sales')
        .join('dim_dates', 'fact_sales.date_key', 'dim_dates.date_key')
        .where('dim_dates.year_number', lastMonthYear)
        .where('dim_dates.month_number', lastMonth)
        .sum('fact_sales.sales as sales')
        .sum('fact_sales.profit as profit')
        .sum('fact_sales.quantity as quantity')
        .first()

      const currentSales = Number(current?.sales ?? 0)
      const lastSales = Number(last?.sales ?? 0)

      const currentProfit = Number(current?.profit ?? 0)
      const lastProfit = Number(last?.profit ?? 0)

      const currentQuantity = Number(current?.quantity ?? 0)
      const lastQuantity = Number(last?.quantity ?? 0)

      const currentMargin = profitMargin(currentProfit, currentSales)
      const lastMargin = profitMargin(lastProfit, lastSales)

      return response.ok({
        data: {
          sales: {
            value: currentSales,
            percent_from_last: percentFromLast(currentSales, lastSales),
          },
          profit: {
            value: currentProfit,
            percent_from_last: percentFromLast(currentProfit, lastProfit),
          },
          quantity: {
            value: currentQuantity,
            percent_from_last: percentFromLast(currentQuantity, lastQuantity),
          },
          profit_margin: {
            value: currentMargin,
            percent_from_last: percentFromLast(currentMargin, lastMargin),
          },
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getTrend({ request, response }: HttpContext) {
    try {
      const mode = request.input('mode')
      const year = request.input('year')

      if (!mode || !['yearly', 'monthly'].includes(mode)) {
        return response.badRequest({
          message: 'mode must be yearly or monthly',
        })
      }

      if (mode === 'monthly' && !year) {
        return response.badRequest({
          message: 'year is required for monthly mode',
        })
      }

      if (mode === 'yearly') {
        const rows = await db
          .from('fact_sales')
          .join('dim_dates', 'fact_sales.date_key', 'dim_dates.date_key')
          .select('dim_dates.year_number')
          .sum('fact_sales.sales as total_sales')
          .sum('fact_sales.profit as total_profit')
          .sum('fact_sales.quantity as total_quantity')
          .groupBy('dim_dates.year_number')
          .orderBy('dim_dates.year_number')

        return response.ok({
          data: rows.map((row: any) => {
            const sales = Number(row.total_sales ?? 0)
            const profit = Number(row.total_profit ?? 0)

            return {
              period: row.year_number.toString(),
              total_sales: sales,
              total_profit: profit,
              total_quantity: Number(row.total_quantity ?? 0),
              profit_margin: sales > 0 ? Number(((profit / sales) * 100).toFixed(2)) : 0,
            }
          }),
        })
      }

      if (!year) {
        throw new Error('Year is required for monthly trend')
      }

      const rows = await db
        .from('fact_sales')
        .join('dim_dates', 'fact_sales.date_key', 'dim_dates.date_key')
        .select('dim_dates.year_number', 'dim_dates.month_number', 'dim_dates.month_name')
        .where('dim_dates.year_number', year)
        .sum('fact_sales.sales as total_sales')
        .sum('fact_sales.profit as total_profit')
        .sum('fact_sales.quantity as total_quantity')
        .groupBy('dim_dates.year_number', 'dim_dates.month_number', 'dim_dates.month_name')
        .orderBy('dim_dates.month_number')

      return response.ok({
        data: rows.map((row: any) => {
          const sales = Number(row.total_sales ?? 0)
          const profit = Number(row.total_profit ?? 0)

          return {
            period: row.month_name.trim(),
            total_sales: sales,
            total_profit: profit,
            total_quantity: Number(row.total_quantity ?? 0),
            profit_margin: sales > 0 ? Number(((profit / sales) * 100).toFixed(2)) : 0,
          }
        }),
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getSalesByCategory({ response }: HttpContext) {
    try {
      const rows = await db
        .from('fact_sales')
        .join('dim_products', 'fact_sales.product_key', 'dim_products.product_key')
        .select('dim_products.category')
        .sum('fact_sales.sales as total_sales')
        .groupBy('dim_products.category')
        .orderBy('total_sales', 'desc')

      return response.ok({
        data: rows.map((row: any) => ({
          category: row.category,
          total_sales: Number(row.total_sales ?? 0),
        })),
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getSalesByRegion({ response }: HttpContext) {
    try {
      const rows = await db
        .from('fact_sales')
        .join('dim_locations', 'fact_sales.location_key', 'dim_locations.location_key')
        .select('dim_locations.region')
        .sum('fact_sales.sales as total_sales')
        .groupBy('dim_locations.region')
        .orderBy('total_sales', 'desc')

      return response.ok({
        data: rows.map((row: any) => ({
          region: row.region,
          total_sales: Number(row.total_sales ?? 0),
        })),
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getProfitScatter({ response }: HttpContext) {
    try {
      const rows = await db
        .from('fact_sales')
        .join('dim_products', 'fact_sales.product_key', 'dim_products.product_key')
        .select('dim_products.product_name')
        .sum('fact_sales.sales as sales')
        .sum('fact_sales.profit as profit')
        .groupBy('dim_products.product_name')

      return response.ok({ data: rows })
    } catch (error) {
      console.log(error)
    }
  }

  async getSalesBySubCategory({ response }: HttpContext) {
    try {
      const rows = await db
        .from('fact_sales')
        .join('dim_products', 'fact_sales.product_key', 'dim_products.product_key')
        .select('dim_products.sub_category')
        .sum('fact_sales.sales as total_sales')
        .sum('fact_sales.profit as total_profit')
        .groupBy('dim_products.sub_category')
        .orderBy('total_sales', 'desc')

      return response.ok({ data: rows })
    } catch (error) {
      console.log(error)
    }
  }

  async getSalesBySegment({ response }: HttpContext) {
    try {
      const rows = await db
        .from('fact_sales')
        .join('dim_customers', 'fact_sales.customer_key', 'dim_customers.customer_key')
        .select('dim_customers.segment')
        .sum('fact_sales.sales as total_sales')
        .sum('fact_sales.profit as total_profit')
        .groupBy('dim_customers.segment')

      return response.ok({ data: rows })
    } catch (error) {
      console.log(error)
    }
  }

  async getProductPerformance({ request, response }: HttpContext) {
    try {
      const limit = Number(request.input('limit', 20))

      const rows = await db
        .from('fact_sales')
        .join('dim_products', 'fact_sales.product_key', 'dim_products.product_key')
        .select('dim_products.product_name')
        .sum('fact_sales.sales as total_sales')
        .sum('fact_sales.profit as total_profit')
        .sum('fact_sales.quantity as total_quantity')
        .groupBy('dim_products.product_name')
        .orderBy('total_sales', 'desc')
        .limit(limit)

      return response.ok({ data: rows })
    } catch (error) {
      console.log(error)
    }
  }
}
