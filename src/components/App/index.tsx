import react from 'react';
import './styles.scss';
import { monsterArray  } from '../../utils'

import Header from '../../container/header';
import DivAllbutton from '../../container/AllDivButton';
import DivAllPlayer from '../../container/allDivPlayer';
import Instruction from '../../container/instruction';

interface app {
  beeingPlaying:boolean
  monsterPv : number,
  playerPv:number,
  level : number,
  changeLevel: any,
  begin: any, 
  end : any
}
const App = ({ beeingPlaying, monsterPv, playerPv, changeLevel, end, level }: app) => {
  if (beeingPlaying) {
    let flexButton: HTMLElement | null = document.querySelector('.allDivButton')
    if (flexButton) {
       flexButton.style.top = '-12rem'
    }
   
  }
  if ((monsterPv == 0 || playerPv == 0) && beeingPlaying) {
    setTimeout(() => {
      if (monsterPv == 0) {
        if (level >= monsterArray.length) {
          alert('vous avez termine le jeux')
          end()
        }
        const result = confirm("voulez vpus passez au niveau suivant")
        if (result) {
          changeLevel()
        }
      }
    }, 1000 *  1.5)
  }
  return (
    <div className='container'>
      <Header />
      { beeingPlaying && <DivAllPlayer />}
      {!beeingPlaying && <div className='container-whenBigin'> clique sur le touchPad pour commence la partie</div>}
      <DivAllbutton /> 
      {beeingPlaying && <Instruction />}  
    </div>
  )
}
export default App