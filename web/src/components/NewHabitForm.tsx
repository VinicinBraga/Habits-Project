import { AiOutlineCheck } from 'react-icons/ai'
import { FiCheck } from 'react-icons/fi'
import * as Checkbox from '@radix-ui/react-checkbox';
import { FormEvent, useState } from 'react';
import { api } from '../lib/axios';

const avaibleWeekDays = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday","Saturday",
]

const NewHabitForm = () => {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  const createNewHabit = async (event: FormEvent) => {
    event.preventDefault()
    
    if (!title || weekDays.length === 0) {
      alert('Please, Create a commitment and recurrence to "Confirm"') 
      return
    }
    await api.post('habits', {
      title,
      weekDays
    })
    setTitle('')
    setWeekDays([])
    alert('Habit created successfully!')
  }

  const handleToggleWeekDay = (weekDay: number ) => {
    if (weekDays.includes(weekDay)) {
      const weekDayswithOneRemoved = weekDays.filter(day => day !== weekDay)
      setWeekDays(weekDayswithOneRemoved)
    } else {
      const weekDayswithOneRemoved = [...weekDays, weekDay]
      setWeekDays(weekDayswithOneRemoved)
    }
  }

  return (
    <form
      onSubmit={createNewHabit}
      className='w-full flex flex-col mt-6'>
      <label
        htmlFor='title'
        className='font-semibold leading-tight'>
        What is your commitment?
      </label>

      <input
        className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400'
        type="text"
        id='title'
        placeholder='ex.: Exercicios, dormir bem, etc...'
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor='' className='font-semibold leading-tight mt-4'>
        What is the recurrence?
      </label>
      <div className="flex flex-col gap-2 mt-3">
        {avaibleWeekDays.map((weekDay, index) => {
          return (
            <Checkbox.Root
              key={weekDay}
              className='flex items-center gap-3 group'
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleToggleWeekDay(index)}
            >
              <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 transition-colors'>
                <Checkbox.Indicator>
                  <FiCheck size={20} className='text-white'/>
                </Checkbox.Indicator>
              </div>
              <span className='text-white leading-tight'>
                {weekDay}
              </span>
            </Checkbox.Root>
          )
        })}
      </div>
      <button type='submit' className='mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600  hover:bg-green-500'>
        <AiOutlineCheck size={20} />
        Confirm
      </button>
   </form>
  )
}

export default NewHabitForm