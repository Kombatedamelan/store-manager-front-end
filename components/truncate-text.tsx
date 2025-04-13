interface TruncateTextProps {
  text: string
  maxLength: number
  className?: string
}

export function TruncateText({ text, maxLength, className = "" }: TruncateTextProps) {
  if (text.length <= maxLength) {
    return <span className={className}>{text}</span>
  }

  return (
    <span className={className} title={text}>
      {text.substring(0, maxLength)}...
    </span>
  )
}
