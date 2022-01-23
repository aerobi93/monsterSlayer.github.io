import react from 'react';
import Button  from '../../container/button';
import './styles.scss';

interface allDivPlayer {
    beeingPlaying: boolean
}

const AllDivPlayer = ({ beeingPlaying}: allDivPlayer) => (
    <div className='allDivButton'>
    {!beeingPlaying && <Button buttonName={'begin'} buttonClass={'allDivButton'} />}
    {beeingPlaying && <Button buttonName={'attack'} buttonClass={'allDivButton'} />}
    {beeingPlaying && <Button buttonName={'magicFire'} buttonClass={'allDivButton'} />}
    {beeingPlaying && <Button buttonName={'heal'} buttonClass={'allDivButton'} />}
    {beeingPlaying && <Button buttonName={'giveUp'} buttonClass={'allDivButton'} />}
    </div>
)
export default AllDivPlayer