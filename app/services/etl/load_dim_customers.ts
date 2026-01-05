export async function loadDimCustomers() {
  const { default: db } = await import('@adonisjs/lucid/services/db')

  await db.rawQuery(`
    INSERT INTO dw.dim_customers (
      customer_id,
      customer_name,
      segment
    )
    SELECT
      customer_id,
      customer_name,
      segment
    FROM customers
    ON CONFLICT (customer_id) DO NOTHING;
  `)
}
