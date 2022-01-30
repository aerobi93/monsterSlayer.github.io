import react from 'react'
import './styles.scss'
interface instruction {
    level: number
}
const Instruction = ({ level } : instruction) => {
  let normal_min = 3  * level
  let normal_max = 5  * level
  let special_min = 10  * level
  let special_max = 15  * level
  return(
    <div className='instruction'>
     <div className='instruction-flex-right'>
        <div className='instruction-flex' >
          <div className='instruction-motif instruction-motif--triangle'/>
          <div className='instruction-text'>ataque normal</div>
          <div className='instruction-dommage'>{normal_min} - {normal_max}</div>
        </div>
       
      <div className='instruction-flex' >
        <div className='instruction-motif instruction-motif--round'/>
        <div className='instruction-text'>regain</div>
        <div className='instruction-dommage'>{ 15 * level}</div>
      </div>
     </div>

     <div className='instruction-flex-center'>
     <div className='instruction-flex' >
        <div className='instruction-motif instruction-motif--start' />
        <div className='instruction-text'>quittez le jeux</div>
      </div>
     </div>
     
     <div className='instruction-flex-left'>
      <div className='instruction-flex' >
        <div className='instruction-motif instruction-motif--square'/>
        <div className='instruction-text'>fire ball</div>
        <div className='instruction-dommage'>{special_min} - {special_max}</div>
      </div>
    
      <div className='instruction-flex' >
        <div className='instruction-motif instruction-motif--cross'>X</div>
        <div className='instruction-text'>fire wall</div>
        <div className='instruction-dommage'>{level}/s</div>
        <div className='instruction-mini'> &#9888; firewall garder la touche enfonce</div> 
       </div>
     </div>


    </div>
  )
}
export default Instruction