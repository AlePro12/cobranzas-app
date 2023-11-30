export const formatCurrencyAmount = (currency: string, amount: number): string => {
  return new Intl.NumberFormat('es-ve', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

export const formatDate = (date: Date | null): string => {
  if (date === null) return 'Fecha no provista'
  return date.toLocaleDateString('es-ve', {
    dateStyle: 'long'
  })
}

export const formatDateTime = (date: Date): string => {
  const dateFormatted = date.toLocaleDateString('es-ve', {
    dateStyle: 'long'
  })
  const timeFormatted = date.toLocaleTimeString('es-ve', {
    timeStyle: 'medium'
  })
  return `${dateFormatted} a las ${timeFormatted}`
}
