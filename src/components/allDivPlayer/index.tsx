import react from 'react';
import DivPlayer from '../../container/allDivPlayer/player';
import './styles.scss';
interface allDivPlayer {
  gamerName? : string 
  monsterName?: string 
}
const AllDivPlayer = ({ gamerName, monsterName } : allDivPlayer) => (
  <div className='allDivPlayer'>
    <DivPlayer namePersonna={gamerName} />
    <DivPlayer namePersonna={monsterName} />
  </div>
)
export default AllDivPlayer