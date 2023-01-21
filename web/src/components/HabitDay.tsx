import * as Popover from '@radix-ui/react-popover';
import ProgressBar from './ProgressBar';
import clsx from 'clsx'
import dayjs from 'dayjs';
import HabitDayList from './HabitDayList';


interface HabitDayProps {
  date: Date
  completed?: number
  amount?: number
}

const HabitDay = ({completed = 0, amount = 0, date }: HabitDayProps) => {

  const completedPercent = amount > 0 ? Math.round((completed / amount) * 100) : 0
  
  const dayInMounth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx('w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg', {
          'bg-zinc-900 border-zinc-800-800': completedPercent === 0, 
          'bg-violet-900 border-violet-700': completedPercent > 0 && completedPercent < 20,
          'bg-violet-800 border-violet-600': completedPercent >= 20 && completedPercent < 40,
          'bg-violet-700 border-violet-500': completedPercent >= 40 && completedPercent < 60,
          'bg-violet-600 border-violet-400': completedPercent >= 60 && completedPercent < 80,
          'bg-violet-500 border-violet-300': completedPercent >= 80 && completedPercent < 90,
          'bg-violet-400 border-violet-200': completedPercent >= 90 && completedPercent <= 100, 
        })}

      />
      <Popover.Portal>
        <Popover.Content className='min-w-[320px] w-full p-6 rounded-2xl bg-zinc-900 flex flex-col'>
          <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
          <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayInMounth}</span>      
          
          <ProgressBar progress={completedPercent} />
          <HabitDayList date={date} />
          <Popover.Arrow className='w-4 h-2 fill-zinc-900'/>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default HabitDay
