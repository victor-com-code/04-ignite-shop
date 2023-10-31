export function toCurrencyStyleFormat(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format((value as number) / 100)
}
