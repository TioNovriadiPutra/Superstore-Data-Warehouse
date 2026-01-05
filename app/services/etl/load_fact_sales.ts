export async function loadFactSales() {
  const { default: db } = await import('@adonisjs/lucid/services/db')

  await db.rawQuery(`
    INSERT INTO dw.fact_sales (
      quantity,
      sales,
      discount,
      profit,
      date_key,
      customer_key,
      product_key,
      location_key
    )
    SELECT
      od.quantity,
      od.sales,
      od.discount,
      od.profit,
      dd.date_key,
      dc.customer_key,
      dp.product_key,
      dl.location_key
    FROM order_details od
    JOIN orders o ON o.order_id = od.order_id
    JOIN dw.dim_dates dd
      ON dd.full_date = o.order_date
    JOIN dw.dim_customers dc
      ON dc.customer_id = o.customer_id
    JOIN dw.dim_products dp
      ON dp.product_id = od.product_id
    JOIN locations l ON l.location_id = o.location_id
    JOIN dw.dim_locations dl
      ON dl.city = l.city
     AND dl.state = l.state
     AND dl.region = l.region;
  `)
}
