export async function loadDimDates() {
  const { default: db } = await import('@adonisjs/lucid/services/db')

  await db.rawQuery(`
    INSERT INTO dw.dim_dates (
      date_key,
      full_date,
      day_number,
      month_number,
      month_name,
      quarter_number,
      year_number
    )
    SELECT DISTINCT
      TO_CHAR(order_date, 'YYYYMMDD')::INT,
      order_date,
      EXTRACT(DAY FROM order_date),
      EXTRACT(MONTH FROM order_date),
      TO_CHAR(order_date, 'Month'),
      EXTRACT(QUARTER FROM order_date),
      EXTRACT(YEAR FROM order_date)
    FROM orders
    ON CONFLICT (date_key) DO NOTHING;
  `)
}
