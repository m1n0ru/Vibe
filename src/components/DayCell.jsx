export default function DayCell({ date, isSelected, isToday, hasDiary, isCurrentMonth, onClick }) {
  let className = 'day-cell border rounded text-center py-1 '

  if (!isCurrentMonth) className += 'text-muted opacity-50 '
  if (isToday) className += 'fw-bold border-primary '
  if (isSelected) className += 'bg-primary text-white '
  else if (isCurrentMonth) className += 'bg-white '

  return (
    <div
      className={className}
      style={{ cursor: 'pointer', minHeight: '2.5rem', position: 'relative' }}
      onClick={onClick}
    >
      <span>{date.getDate()}</span>
      {hasDiary && (
        <span
          style={{
            position: 'absolute',
            bottom: '3px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: isSelected ? 'white' : '#0d6efd',
            display: 'block',
          }}
        />
      )}
    </div>
  )
}
