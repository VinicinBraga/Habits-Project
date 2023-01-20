interface ProgressBarProps {
  progress: number
}


const ProgressBar = (props: ProgressBarProps) => {
  const progressStyle = {
    width: `${props.progress}%`
  }
  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div
        role="progressbar"
        aria-label='habits progress completed on this day'
        className="h-3 bg-violet-600 rounded-xl"
        style={progressStyle}
      />
  </div>
  )
}

export default ProgressBar