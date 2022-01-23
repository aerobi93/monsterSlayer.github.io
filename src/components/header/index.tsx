import react from 'react'
import './styles.scss';

interface props {
    level : number
}
const Header = ({ level} : props) => (
<div className='header'>
    <h1 className='header-title'>monster slayer</h1>
    <h3 className='header-level'>level {level}</h3> 
</div>
)
export default Header;