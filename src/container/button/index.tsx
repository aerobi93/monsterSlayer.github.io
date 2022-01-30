import { connect } from "react-redux";
import store from '../../store'
import Button from "../../components/button";
import { round, moving } from "../../utils";
import { regainMana, begin, end, setGamerName, attack, heal, fireBall, fireCone, ice, lostMana, reportBattle, changeDisplayAnimation} from '../../action'

let starPlayer: HTMLElement | null = document.getElementById('star-'+store.getState().gamerName)
let starMonster: HTMLElement | null = document.getElementById('star-'+store.getState().monsterName)
const mapStateToProps = (state : any) => ({
  displayAnimation : state.displayAnimation,
  monsterPv: state.monsterPv,
  playerPv: state.playerPv,
})
const mapDispatchToProps = (dispatch: any, state: any) => ({ 
  
  regainMana : () => {
    setTimeout(()=> {
      dispatch(regainMana())
    }, 1000 * 2.1)
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
    console.log('attack')
    let playerDiv: HTMLElement | null = document.getElementById(store.getState().gamerName)
    dispatch(changeDisplayAnimation())
    moving(playerDiv!, 'draw', 1000, 'player')
    setTimeout(()=> {
      dispatch(reportBattle('messageMonster'))
      dispatch(attack('player'))
    },1000)
  },

  fireBall: () => {
    let fireBallPlayer:HTMLElement | null = document.getElementById('fireBall-'+store.getState().gamerName)
    dispatch(changeDisplayAnimation())
    if (store.getState().playerMana - 20 < 0) {
      moving(fireBallPlayer!, 'fireBall', 400, 'player')
      setTimeout(() => {
        alert("le sort a echouer")
      }, 400);
    }   
    else {
      moving(fireBallPlayer!, 'fireBall', 1000, 'player')
      dispatch(lostMana('playerMana', 20))
      setTimeout(() => {
          dispatch(fireBall('player'))
      }, 1000);  
    }
  },
  fireCone: (value?: boolean) => {
    let fireBallPlayer:HTMLElement | null = document.getElementById('fireBall-'+store.getState().gamerName)
    fireBallPlayer!.style.visibility='visible'
    fireBallPlayer!.style.left='19rem'
    fireBallPlayer!.style.top='3em'
    let start = Date.now();
    let timer = setInterval(function() {
      let timePassed = Date.now() - start; 
      if (value) {
        console.log("ok")
        clearInterval(timer);
        }
      if (parseInt(fireBallPlayer!.style.height) < 100) {
        fireBallPlayer!.style.height= timePassed  + 'px'
      }
      else if (parseInt(fireBallPlayer!.style.width ) < 125){
        fireBallPlayer!.style.width= 25 + (timePassed ) + '%'
      }
    }, 100);      
  },
  monsterCounter: () => {
    let random = 2
    let monsterDiv: HTMLElement | null = document.getElementById(store.getState().monsterName)
    dispatch(changeDisplayAnimation())
   
    if (random == 1) {
      moving(monsterDiv!, 'draw', 1000, 'monster') 
        setTimeout(()=> {
        dispatch(reportBattle('messagePlayer'))
        dispatch(attack('monster'))
      },1000)
    }
    else if (random == 2 && (store.getState().monsterMana - 20) > 0 ) {
      let fireBallMonster:HTMLElement | null = document.getElementById('fireBall-'+store.getState().monsterName)
      moving(fireBallMonster!, 'fireBall', 1000, 'monster')  
      dispatch(lostMana('monsterMana', 20))
      setTimeout(()=> {
        dispatch(fireBall('monster'))
      }, 1000) 
    }
    else {
      moving(monsterDiv!, 'draw', 1000, 'monster') 
      dispatch(lostMana('monsterMana', 20))
      setTimeout(()=> {
        dispatch(reportBattle('messagePlayer'))
        dispatch(attack('monster'))
      },1000)
    }
  },

  end: () => {
    let flexButton: HTMLElement | null = document.querySelector('.allDivButton')
    if (flexButton) {
       flexButton.style.top = '12rem'
    }
      dispatch(end())
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Button)