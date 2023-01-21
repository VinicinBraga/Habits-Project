import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FiCheck } from 'react-icons/fi'
import { api } from '../lib/axios';

interface HabitDayListProps {
  date: Date
}

interface HabitsInfo {
  possibleHabits: {
  id: string
  title: string
  created_at: string
  }[],
  completedHabits: string[]
}

const HabitDayList = ({ date }: HabitDayListProps) => {

  const [habitsDayInfo, setHabitsDayInfo] = useState<HabitsInfo>()

  useEffect(() => {
    api.get('day', {
      params: {
       date: date.toISOString()
     }
    }).then(res => {
      setHabitsDayInfo(res.data)
   })
  }, [])
  
  const handleToggleHabit = async (habitId: string) => {
    await api.patch(`/habits/${habitId}/toggle`)
    const isHabitAlreadyCompleted = habitsDayInfo!.completedHabits.includes(habitId) //Troca ? por ! para fazer com que o typescript entenda que a habitsDayInfo não seja undefined.
    let completedHabits: string[] = []

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsDayInfo!.completedHabits.filter(id => id !== habitId)
     
    } else {
      completedHabits = [...habitsDayInfo!.completedHabits, habitId]
    }
    setHabitsDayInfo({
      possibleHabits: habitsDayInfo!.possibleHabits,
      completedHabits
    })
  }

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

  return (

      <div className="mt-6 flex flex-col gap-3">
        {habitsDayInfo?.possibleHabits.map(habit => {
          return (
            <Checkbox.Root
              key={habit.id}
              onCheckedChange={() => handleToggleHabit(habit.id)}
              checked={habitsDayInfo.completedHabits.includes(habit.id)}
              disabled={isDateInPast}
              className='flex items-center gap-3 group'
            >
              <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 '>
                <Checkbox.Indicator>
                  <FiCheck size={20} className='text-white'/>
                </Checkbox.Indicator>
              </div>
              <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-600'>
                {habit.title}
              </span>
            </Checkbox.Root>
          )
        })}    
      </div>
  )
}

export default HabitDayList