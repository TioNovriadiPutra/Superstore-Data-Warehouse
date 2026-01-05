export async function loadDimProducts() {
  const { default: db } = await import('@adonisjs/lucid/services/db')

  await db.rawQuery(`
    INSERT INTO dw.dim_products (
      product_id,
      product_name,
      sub_category,
      category
    )
    SELECT
      product_id,
      product_name,
      sub_category,
      category
    FROM products
    ON CONFLICT (product_id) DO NOTHING;
  `)
}
