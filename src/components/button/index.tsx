import React from 'react';

interface button {
  buttonName: string,
  buttonClass: string, 
  displayAnimation?: boolean,
  monsterPv:number,
  playerPv: number,
  regainMana : any
  begin?: any, 
  end? : any,
  attack?: any,
  fireBall?: any, 
  fireCone?: any,
  ice?: any, 
  heal? : any,
  monsterCounter?:any,
}
const Button = ({
  buttonName,
  buttonClass, 
  displayAnimation,
  monsterPv,
  playerPv,
  regainMana,
  begin,
  end,
  attack,
  fireBall,
  fireCone,
  ice,
  heal,
  monsterCounter,
}: button) => {
  const handlerClick = (evt: any, value?: boolean) => {
    if (!displayAnimation) {
      if (monsterPv > 0 && playerPv > 0) {
        setTimeout(() => {
          regainMana()
        },1000 * 1.5)
        }
      if (evt.target.name !== 'begin' && evt.target.name !== 'giveUp' && evt.target.name !== 'fireCone') {
        setTimeout(() => {
          monsterCounter()
        },1000)
      }
      if (evt.target.name == 'begin') {
        begin()
      }
      else if (evt.target.name == 'giveUp') {
        end()
      }
      else if (evt.target.name == 'heal') {
        heal()
      }
      else if (evt.target.name == 'attack') {
        attack()
      }
      else if (evt.target.name == 'fireBall') {
        fireBall()
      }
      else if (evt.target.name == 'fireCone') {
        if (value) {
          monsterCounter()
        }
        fireCone(value)
      }
    }
  }  
  if ( buttonName !== 'fireCone' ) {
    return (
        <button 
          className={`${buttonClass}-button ${buttonClass}-button--${buttonName} `}
          name={buttonName}
          onClick={(evt) => handlerClick(evt)}
        />
    )
  }
  else {
    return (
      <button 
        className={`${buttonClass}-button ${buttonClass}-button--${buttonName} `}
        name={buttonName}
        onMouseDown={(evt) => handlerClick(evt)}
        onMouseUp={(evt)=> handlerClick(evt, true)}
      />
    )
  }
}
export default Button