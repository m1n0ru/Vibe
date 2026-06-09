import DayCell from './DayCell'

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土']

function toDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function buildCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const days = []

  // 前月の埋め日
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push({ date: new Date(year, month, 1 - (firstDay.getDay() - i)), isCurrentMonth: false })
  }
  // 当月
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push({ date: new Date(year, month, d), isCurrentMonth: true })
  }
  // 翌月の埋め日
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false })
  }
  return days
}

export default function CalendarView({ year, month, selectedKey, diaryDates, onSelectDate }) {
  const today = toDateKey(new Date())
  const days = buildCalendarDays(year, month)
  const diarySet = new Set(diaryDates)

  return (
    <div className="p-3">
      <div className="d-grid mb-1" style={{ gridTemplateColumns: 'repeat(7, 1fr)', display: 'grid', gap: '2px' }}>
        {WEEKDAYS.map((w, i) => (
          <div
            key={w}
            className={`text-center small fw-semibold ${i === 0 ? 'text-danger' : i === 6 ? 'text-primary' : 'text-secondary'}`}
          >
            {w}
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
        {days.map(({ date, isCurrentMonth }, i) => {
          const key = toDateKey(date)
          return (
            <DayCell
              key={i}
              date={date}
              isSelected={key === selectedKey}
              isToday={key === today}
              hasDiary={diarySet.has(key)}
              isCurrentMonth={isCurrentMonth}
              onClick={() => onSelectDate(key)}
            />
          )
        })}
      </div>
    </div>
  )
}
