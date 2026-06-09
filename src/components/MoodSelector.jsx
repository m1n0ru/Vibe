const MOODS = ['😊', '😐', '😢', '😡', '🎉']

export default function MoodSelector({ selected, onChange }) {
  return (
    <div className="d-flex gap-2 mb-3">
      {MOODS.map((mood) => (
        <button
          key={mood}
          type="button"
          className={`btn btn-lg p-1 ${selected === mood ? 'border border-primary border-2' : 'border border-light'}`}
          style={{ background: 'none', fontSize: '1.6rem', lineHeight: 1 }}
          onClick={() => onChange(mood === selected ? '' : mood)}
        >
          {mood}
        </button>
      ))}
    </div>
  )
}
