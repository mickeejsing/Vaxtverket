/**
 * Returns an array of dates.
 *
 * @param {string} weeks - Number of weeks.
 * @returns {Array} - An array of dates.
 */
function datesFromNow (weeks) {
  const now = new Date()

  weeks = weeks.split(' ')
  const dates = []

  weeks.forEach(week => {
    const later = new Date()
    later.setDate(now.getDate() + (week * 7))
    dates.push(later.toDateString())
  })

  return dates
}

// Exports
module.exports = datesFromNow
