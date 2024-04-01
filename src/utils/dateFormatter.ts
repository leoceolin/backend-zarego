export const formatterDate = (date: Date) => {
  const currentDay = date.getDate()
  const currentMonth = date.getMonth() + 1
  const currentYear = date.getFullYear()
  const formattedDate = `${currentDay < 10 ? '0' + currentDay : currentDay}-${currentMonth < 10 ? '0' + currentMonth : currentMonth}-${currentYear}`;

  return formattedDate
}
