import './app.css'
import { useState } from 'react';

let zombieFighters = [
  {
    id: 1,
    name: 'Survivor',
    price: 12,
    strength: 6,
    agility: 4,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/0c2d6b.png',
  },
  {
    id: 2,
    name: 'Scavenger',
    price: 10,
    strength: 5,
    agility: 5,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/033a16.png',
  },
  {
    id: 3,
    name: 'Shadow',
    price: 18,
    strength: 7,
    agility: 8,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/262c36.png',
  },
  {
    id: 4,
    name: 'Tracker',
    price: 14,
    strength: 7,
    agility: 6,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/3c1e70.png',
  },
  {
    id: 5,
    name: 'Sharpshooter',
    price: 20,
    strength: 6,
    agility: 8,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/4b2900.png',
  },
  {
    id: 6,
    name: 'Medic',
    price: 15,
    strength: 5,
    agility: 7,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5a1e02.png',
  },
  {
    id: 7,
    name: 'Engineer',
    price: 16,
    strength: 6,
    agility: 5,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5e103e.png',
  },
  {
    id: 8,
    name: 'Brawler',
    price: 11,
    strength: 8,
    agility: 3,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/67060c.png',
  },
  {
    id: 9,
    name: 'Infiltrator',
    price: 17,
    strength: 5,
    agility: 9,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/ac3220.png',
  },
  {
    id: 10,
    name: 'Leader',
    price: 22,
    strength: 7,
    agility: 6,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/e41f26.png',
  },
]


const App = () => {

  const [zombieSquad, setZombieSquad] = useState([])
  const [fightersArray, setFightersArray] = useState(zombieFighters)
  const [money, setMoney] = useState(100)
  const [message, setMessage] = useState('')

  const totalStrength = zombieSquad.reduce((sum, fighter) => sum + fighter.strength, 0 // 0 is the starting value passed to reduce()
  )

  const totalAgility = zombieSquad.reduce((sum, fighter) => sum + fighter.agility, 0
  )

  const handleAddFighter = (newFighter) => {
    if (money >= newFighter.price) {
      console.log(newFighter)
      const newSquad = [...zombieSquad, newFighter]
      setZombieSquad(newSquad)
      console.log(zombieSquad)

      setFightersArray(originalFighters => originalFighters.filter(fighter => fighter.id !== newFighter.id)
      )
      console.log(fightersArray)

      setMoney(originalBalance => originalBalance - newFighter.price)
      setMessage('')
    } else {
      setMessage("You can't afford this fighter!")
    }

  }

  const handleRemoveFighter = (fighterToRemove) => {

    const newSquad = zombieSquad.filter((fighter) => fighter.id !== fighterToRemove.id)
    setZombieSquad(newSquad);
    console.log(newSquad)

    setFightersArray(originalFighters => {
      const alreadyExists = originalFighters.some(f => f.id === fighterToRemove.id);
      if (!alreadyExists) {
        return [...originalFighters, fighterToRemove]; // How to append it to the original array using the spread operator
      }
      return originalFighters;
    }) 

    setMoney(originalBalance => originalBalance + fighterToRemove.price)
    setMessage('')

  }

  return (
    <div id="root">
      <h1>Zombie Attack!</h1>
      <p>Money: {money}</p>
      <p>Strength: {totalStrength}</p>
      <p>Agility : {totalAgility}</p>
      <div className="error">{message}</div>

      <h2>Your Squad</h2>
      {zombieSquad.length > 0 ? (
        <ul>
          {zombieSquad.map((squadFighter) => (
            <li key={squadFighter.id}>
              <h3>{squadFighter.name}</h3>
              <img src={squadFighter.img} alt={squadFighter.name} />
              <p>Price: ${squadFighter.price}</p>
              <p>Strength: {squadFighter.strength}</p>
              <p>Agility: {squadFighter.agility}</p>
              <button onClick={() => handleRemoveFighter(squadFighter)}>Kill </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Add some fighters to your squad, quick!</p>
      )}

      <h2>Available fighters</h2>
      <ul>
        {fightersArray.map((fighter) => (
          <li key={fighter.id}>
            <h3>{fighter.name}</h3>
            <img src={fighter.img} alt={fighter.name} />
            <p>Price: ${fighter.price}</p>
            <p>Strength: {fighter.strength}</p>
            <p>Agility: {fighter.agility}</p>
            <button onClick={() => handleAddFighter(fighter)}>Add</button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App


// Syntax for reduce()
// array.reduce((accumulator, currentItem) => {
//   return updatedAccumulator;
// }, initialValue);
// Allows you to reduce the array to a single value or sum in this case

// totalStrength doesn't need to be a state variable because it doesn't need to trigger a re-render (the set arrays state variables already do that so the total strength is just calculated based on the updated array). I think you could also do this with the money variable, too.

// some() checks if at least one item in the array matches a condition (it returns a boolean)