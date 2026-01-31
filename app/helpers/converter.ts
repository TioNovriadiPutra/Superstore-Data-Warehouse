export function percentFromLast(current: number, last: number): number {
  if (last === 0) {
    if (current === 0) return 0
    return 100
  }

  return Number((((current - last) / last) * 100).toFixed(2))
}

export function profitMargin(profit: number, sales: number): number {
  if (!sales || sales === 0) return 0
  return Number(((profit / sales) * 100).toFixed(2))
}
