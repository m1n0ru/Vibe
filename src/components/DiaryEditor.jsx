import { useState, useEffect } from 'react'
import MoodSelector from './MoodSelector'
import { loadDiary, saveDiary, deleteDiary } from '../utils/storage'

export default function DiaryEditor({ selectedKey, onDiaryChange }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [mood, setMood] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!selectedKey) return
    const diary = loadDiary(selectedKey)
    setTitle(diary?.title || '')
    setBody(diary?.body || '')
    setMood(diary?.mood || '')
    setSaved(false)
  }, [selectedKey])

  function handleSave() {
    saveDiary(selectedKey, { title, body, mood })
    setSaved(true)
    onDiaryChange()
  }

  function handleDelete() {
    deleteDiary(selectedKey)
    setTitle('')
    setBody('')
    setMood('')
    setSaved(false)
    onDiaryChange()
  }

  if (!selectedKey) {
    return (
      <div className="p-4 text-muted d-flex align-items-center justify-content-center h-100">
        <p>カレンダーから日付を選択してください</p>
      </div>
    )
  }

  const [year, month, day] = selectedKey.split('-')
  const displayDate = `${year}年${parseInt(month)}月${parseInt(day)}日`

  return (
    <div className="p-4">
      <h5 className="mb-3 text-primary">{displayDate}</h5>
      <MoodSelector selected={mood} onChange={setMood} />
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="タイトル（任意）"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setSaved(false) }}
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="今日はどんな一日でしたか？"
          rows={10}
          value={body}
          onChange={(e) => { setBody(e.target.value); setSaved(false) }}
        />
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-primary" onClick={handleSave}>
          保存
        </button>
        {loadDiary(selectedKey) && (
          <button className="btn btn-outline-danger" onClick={handleDelete}>
            削除
          </button>
        )}
        {saved && <span className="text-success align-self-center small">✓ 保存しました</span>}
      </div>
    </div>
  )
}
