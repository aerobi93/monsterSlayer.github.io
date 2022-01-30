import react from 'react';
import Button  from '../../container/button';
import './styles.scss';

interface allDivPlayer {
    beeingPlaying: boolean, 
    level: number, 
    levelUp: number,
}

const AllDivButton = ({ beeingPlaying, level, levelUp }: allDivPlayer) => (
  <div className='allDivButton'>
  {!beeingPlaying && <Button buttonName={'begin'} buttonClass={'allDivButton'} /> }
  {beeingPlaying && <Button buttonName={'attack'} buttonClass={'allDivButton'} />}
  {beeingPlaying && <Button buttonName={'fireBall'} buttonClass={'allDivButton'} />}
  {beeingPlaying && <Button buttonName={'fireCone'} buttonClass={'allDivButton'} />}
  {beeingPlaying && <Button buttonName={'heal'} buttonClass={'allDivButton'} />}
  {beeingPlaying && <Button buttonName={'giveUp'} buttonClass={'allDivButton'} />}
  </div>
)

export default AllDivButton