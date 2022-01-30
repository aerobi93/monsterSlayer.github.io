import react from 'react';
import { monsterArray } from '../../utils'

interface divplayer {
  namePersonna?: string,
  gamerName: string,
  monsterPvMax: number,
  monsterPv : number, 
  playerPvMax: number,
  playerPv: number,
  monsterManaMax: number,
  monsterMana: number, 
  playerManaMax: number,
  playerMana: number, 
  messageMonster? :string,
  messagePlayer?:string
}
const DivPlayer = ({
  namePersonna,
  gamerName,
  monsterPvMax,
  monsterPv, 
  playerPvMax,
  playerPv,
  monsterManaMax,
  monsterMana, 
  playerManaMax,
  playerMana,
  messageMonster,
  messagePlayer
}: divplayer) => {
  let pv = namePersonna === gamerName ? playerPv : monsterPv
  let pvMax = namePersonna === gamerName ? playerPvMax : monsterPvMax
  let mana = namePersonna === gamerName ? playerMana : monsterMana
  let manaMax = namePersonna === gamerName ? playerManaMax : monsterManaMax
  let message = namePersonna === gamerName ? messagePlayer: messageMonster
  let picture: string =''
  let player:string = namePersonna === gamerName ? 'player' : 'monster'
  const find = monsterArray.find((picture) => {
    return picture.name == namePersonna
  })
  find ? picture = `${namePersonna}.png` : picture = 'warrior.png'
  
  return(
    <figure className='divPlayer'>
      <span className='divPlayer-star' id={'star-'+namePersonna}>&#9733;</span>
      <img className='divPlayer-image' src={picture} id={namePersonna} />
      <div className='divPlayer-red' id={`red-${namePersonna}`} />
      <h3 className='divPlayer-playerName'> {namePersonna}</h3>
      <progress className='divPlayer-pv'max={pvMax} value={pv} />
      <span className='divPlayer-pvText'>{pv} pv</span>
      <progress className='divPlayer-mana'max={manaMax} value={mana} />
      <span className='divPlayer-manaText'>{mana} pm</span> 
       <div className = 'divPlayer-fireBallContainer'>
        <img className={'divPlayer-fireBall divPlayer-fireBall--'+player}  src={'fire.png'} id={'fireBall-'+namePersonna}/>
      </div>
      <span className='divPlayer-message'>{message}</span>
      </figure>
  )
}
export default DivPlayer