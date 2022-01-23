import react from 'react'
interface button {
  buttonName: string,
  buttonClass: string, 
  displayAnimation?: boolean,
  regainMana : any
  begin?: any, 
  end? : any,
  attack?: any
  heal? : any
}
const Button = ({
  buttonName,
  buttonClass, 
  displayAnimation,
  regainMana,
  begin,
  end,
  attack,
  heal
}: button) => {
  const handlerClick = (evt: any) => {
    if (evt.target.name == 'begin') {
      begin()
    }
    else if (evt.target.name == 'giveUp') {
      end()
    }
    if (!displayAnimation) {
      setTimeout(() => {
        regainMana()
     },1000 * 1.5)
     
      if (evt.target.name == 'attack' || (evt.target.name == 'magicFire')) {
      attack(evt.target.name)
      }
      else if (evt.target.name == 'heal') {
      heal()
      }
    }
    
  }  
  return (
    <button 
      className={`${buttonClass}-button ${buttonClass}-button--${buttonName} `}
      name={buttonName}
      onClick={(evt) => handlerClick(evt)}
      >
        {buttonName}
      </button>
  )
}

export default Button