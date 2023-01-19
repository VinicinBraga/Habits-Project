import React from 'react'

const NewHabitForm = () => {
  return (
    <form>
      <label htmlFor='title'>
        Qual o seu comprometimento?
      </label>
      <input type="text"
        id='title'
        placeholder='ex.: Exercicios, dormir bem, etc...'
        autoFocus
      />
   </form>
  )
}

export default NewHabitForm