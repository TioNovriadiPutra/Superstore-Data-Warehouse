export async function loadDimLocations() {
  const { default: db } = await import('@adonisjs/lucid/services/db')

  await db.rawQuery(`
    INSERT INTO dw.dim_locations (
      city,
      state,
      region
    )
    SELECT DISTINCT
      city,
      state,
      region
    FROM locations
    ON CONFLICT DO NOTHING;
  `)
}
