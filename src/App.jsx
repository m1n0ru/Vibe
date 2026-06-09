import { useState, useCallback } from 'react'
import Header from './components/Header'
import CalendarView from './components/CalendarView'
import DiaryEditor from './components/DiaryEditor'
import { getDiaryDates } from './utils/storage'

function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function App() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selectedKey, setSelectedKey] = useState(todayKey())
  const [diaryDates, setDiaryDates] = useState(getDiaryDates)

  function handlePrev() {
    if (month === 0) { setYear(y => y - 1); setMonth(11) }
    else setMonth(m => m - 1)
  }

  function handleNext() {
    if (month === 11) { setYear(y => y + 1); setMonth(0) }
    else setMonth(m => m + 1)
  }

  const refreshDiaryDates = useCallback(() => {
    setDiaryDates(getDiaryDates())
  }, [])

  return (
    <div className="d-flex flex-column vh-100">
      <Header year={year} month={month} onPrev={handlePrev} onNext={handleNext} />
      <div className="d-flex flex-grow-1 overflow-hidden">
        <div className="border-end bg-light" style={{ width: '340px', minWidth: '340px', overflowY: 'auto' }}>
          <CalendarView
            year={year}
            month={month}
            selectedKey={selectedKey}
            diaryDates={diaryDates}
            onSelectDate={setSelectedKey}
          />
        </div>
        <div className="flex-grow-1 overflow-auto">
          <DiaryEditor
            selectedKey={selectedKey}
            onDiaryChange={refreshDiaryDates}
          />
        </div>
      </div>
    </div>
  )
}
