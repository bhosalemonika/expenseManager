export const defaultNotificationReads = {}
function getDate(date) {
  if (!date) return 0
  const value = String(date).includes('T')
    ? date
    : `${date}T00:00:00`

  return new Date(value).getTime() || 0
}

export function buildTransactionNotifications(expenses = []) {
  return [...expenses]
    .sort((a, b) => getDate(b.date) - getDate(a.date))
    .map((expense, index) => {
      const income = Boolean(expense.income)
      return {
        id: `transaction:${expense.id || index}`,
        type: income ? 'income' : 'expense',
        title: income ? 'Income recorded' : 'Expense recorded',
        merchant: expense.title || 'Untitled',
        category: expense.category || 'Uncategorized',
        amount: Math.abs(Number(expense.amount) || 0),
        date: expense.date || '',
        income,
      }
    })
}

export function getUnreadNotificationCount(
  notifications,
  readNotifications
) {
  return notifications.filter(
    (notification) => !readNotifications[notification.id]
  ).length
}