import { connect } from "react-redux";
import store from '../../store'
import Button from "../../components/button";
import { round, moving } from "../../utils";
import { regainMana, begin, end, setGamerName, attack, heal, fireBall, fireCone, ice, reportBattle, changeDisplayAnimation} from '../../action'

let starPlayer: HTMLElement | null = document.getElementById('star-'+store.getState().gamerName)
let starMonster: HTMLElement | null = document.getElementById('star-'+store.getState().monsterName)
const mapStateToProps = (state : any) => ({
  displayAnimation : state.displayAnimation,
  monsterPv: state.monsterPv,
  playerPv: state.playerPv,
})
const mapDispatchToProps = (dispatch: any) => ({ 
  
  regainMana : () => {
    setTimeout(()=> {
      dispatch(regainMana())
    }, 1000 *1.5)
  },
  
  begin: () => {
    const result = prompt("choisisez un pseudo ")
    if (result) {
      let regex = /[a-zA-Z0-9]/g 
      if (result.match(regex)?.length === result.length){
        dispatch(setGamerName(result.trim()))
        dispatch(begin())
      }
      else if (result.match(regex)!.length < result.length) {
        alert('le speudo ne peut pas contenir de caractére spéciaux')
      }
    }
    else alert('une erreur est survenue')
  },
  attack: () => {
    let playerDiv: HTMLElement | null = document.getElementById(store.getState().gamerName)
    dispatch(changeDisplayAnimation())
    moving(playerDiv!, 'draw', 1000, 'player')
    setTimeout(()=> {
      dispatch(reportBattle('messageMonster'))
      dispatch(attack('player'))
    },1000)
  },

  fireBall: () => {console.log('fireball')
    let fireBallPlayer:HTMLElement | null = document.getElementById('fire-'+store.getState().gamerName)
    dispatch(changeDisplayAnimation())
    moving(fireBallPlayer!, 'fireBall', 1000, 'player')
  },

  monsterCounter: () => {
    
    let monsterDiv: HTMLElement | null = document.getElementById(store.getState().monsterName)
    dispatch(changeDisplayAnimation())
    moving(monsterDiv!, 'draw', 1000, 'monster')
    setTimeout(()=> {
      dispatch(reportBattle('messagePlayer'))
      dispatch(attack('monster'))
    },1000)
  },


  end: () => {
      dispatch(end())
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Button)