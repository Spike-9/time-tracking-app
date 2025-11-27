interface DurationDisplayProps {
  minutes: number
}

export function DurationDisplay({ minutes }: DurationDisplayProps) {
  if (minutes < 60) {
    return <span>{minutes}分钟</span>
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (remainingMinutes === 0) {
    return <span>{hours}小时</span>
  }

  return (
    <span>
      {hours}小时 {remainingMinutes}分钟
    </span>
  )
}
