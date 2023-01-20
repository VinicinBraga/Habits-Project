import React, { useEffect, useState } from 'react'
import HabitDay from './HabitDay';
import genereteDates from '../utils/generete-dates';
import { api } from '../lib/axios';
import dayjs from 'dayjs';

const weekDays = [
  'S','M','T','W','T','F','S'
]

const summaryDates = genereteDates()
const minimumNumberOfDays = 18 * 7
const amountDaysToFill = minimumNumberOfDays - summaryDates.length

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[]

const SummaryTable = () => {

  const [summary, setSummary] = useState<Summary>([])

  useEffect(() => {
    api.get('summary').then(res => {
      setSummary(res.data)
    })

  }, [])
  

  return (
    <div className="w-full flex mt-10">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, index) => {
          return (
            <div key={index} className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
              {weekDay}
            </div>
          )
        })}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3 cursor-pointer">
        {summaryDates.map((date, index) => {
          const dayInSummary = summary.find(day => {
            return dayjs(date).isSame(day.date, 'day')
          })

          return (
            <HabitDay
              key={index}
              date={date}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />)
        })}
        
        {amountDaysToFill > 0 && Array.from({ length: amountDaysToFill }).map((_, i) => {
          return <div key={i} className="w-10 h10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"></div>
        })}
      </div>
    </div>
  )
}

export default SummaryTable