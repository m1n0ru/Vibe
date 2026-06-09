export default function Header({ year, month, onPrev, onNext }) {
  return (
    <nav className="navbar navbar-dark bg-primary px-3">
      <span className="navbar-brand fw-bold fs-4">📔 ClenderDiary</span>
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-outline-light btn-sm" onClick={onPrev}>＜</button>
        <span className="text-white fw-semibold" style={{ minWidth: '7rem', textAlign: 'center' }}>
          {year}年 {month + 1}月
        </span>
        <button className="btn btn-outline-light btn-sm" onClick={onNext}>＞</button>
      </div>
    </nav>
  )
}
