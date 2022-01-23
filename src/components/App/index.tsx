import react from 'react';
import './styles.scss';
import { monsterArray  } from '../../utils'

import Header from '../../container/header';
import DivAllbutton from '../../container/AllDivButton';
import DivAllPlayer from '../../container/allDivPlayer';

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
      <DivAllbutton />   
    </div>
  )
}
export default App