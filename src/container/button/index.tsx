import { connect } from "react-redux";
import store from '../../store'
import Button from "../../components/button";
import { round, moving } from "../../utils";
import { regainMana, begin, end, setGamerName, attack, heal, fireBall, fireCone, ice, lostMana, reportBattle, changeDisplayAnimation} from '../../action'


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
    let playerDiv: HTMLElement | null = document.getElementById(store.getState().gamerName)
    dispatch(changeDisplayAnimation())
    moving(playerDiv!, 'draw', 1000, 'player')
    setTimeout(()=> {
      dispatch(attack('player'))
      dispatch(reportBattle('messageMonster'))
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
        dispatch(reportBattle('messageMonster'))
      }, 1000);  
    }
  },
  heal : () => {
    let starPlayer: HTMLElement | null = document.getElementById('star-'+store.getState().gamerName)
    dispatch(changeDisplayAnimation())
    moving(starPlayer!, 'heal', 1000, 'player')
    dispatch(lostMana('playerMana', 10))
    setTimeout(() => {
        dispatch(heal('player'))
    }, 1000);  
  }, 

  fireCone : () => {
    let date = Date.now();
    let fireBallPlayer:HTMLElement | null = document.getElementById('fireBall-'+store.getState().gamerName)
    let endtimer  = function () {
      clearInterval(timer)
      dispatch(reportBattle('messageMonster'))
      fireBallPlayer!.style.transform='scaleX(-1)'
      fireBallPlayer!.style.visibility='hidden'
      fireBallPlayer!.style.left='10rem'
      fireBallPlayer!.style.height ='10px'
      fireBallPlayer!.style.width ='20%'
    }
  
    let button = document.querySelector('.allDivButton-button--fireCone')
    button?.addEventListener('mouseup', endtimer) 
    dispatch(changeDisplayAnimation()) 
    fireBallPlayer!.style.visibility='visible'
    fireBallPlayer!.style.transform='rotate(0deg)'
    fireBallPlayer!.style.left='12rem'
    let timer = setInterval (() => {
      let interval = Date.now() - date 
      if (interval < 1000 )
         if (parseInt(fireBallPlayer!.style.height) < 100 || !fireBallPlayer!.style.height) {
          fireBallPlayer!.style.height = interval / 5 + 'px'
         }
         if (parseInt(fireBallPlayer!.style.width) < 170 || !fireBallPlayer!.style.width) {
          fireBallPlayer!.style.width = interval / 5 + '%'
         }
      if (interval % 3 == 0 && parseInt(fireBallPlayer!.style.width) >= 170) {
        if (store.getState().playerMana > 0 && store.getState().monsterPv >= 0) {
          dispatch(lostMana('playerMana', 1))
          dispatch(fireCone())
        }
        else if (store.getState().playerMana <= 0) {
          alert('vous n avez plus assez de mana')
        }
      }
    },20)
  },
  monsterCounter: () => {
    setTimeout(() => {
    }, 150 )
    let random = round(1, 3)
    let monsterDiv: HTMLElement | null = document.getElementById(store.getState().monsterName)
    dispatch(changeDisplayAnimation())
   
    if (random == 1) {
      moving(monsterDiv!, 'draw', 1000, 'monster') 
        setTimeout(()=> {
          dispatch(attack('monster'))
        dispatch(reportBattle('messagePlayer'))
      },1000)
    }
    else if (random == 2 && (store.getState().monsterMana - 20) > 0 ) {
      let fireBallMonster:HTMLElement | null = document.getElementById('fireBall-'+store.getState().monsterName)
      moving(fireBallMonster!, 'fireBall', 1000, 'monster')  
      dispatch(lostMana('monsterMana', 20))
      setTimeout(()=> {
        dispatch(fireBall('monster'))
        dispatch(reportBattle('messagePlayer'))
      
      }, 1000) 
    }
    else if (random == 3 && (store.getState().monsterMana - 10) > 0 ) {
      let starMonster: HTMLElement | null = document.getElementById('star-'+store.getState().monsterName)
      moving(starMonster!, 'heal', 1000, 'monster')
      dispatch(lostMana('monsterMana', 10))
      setTimeout(() => {
          dispatch(heal('monster'))
      }, 1000);  
    }
    else {
      moving(monsterDiv!, 'draw', 1000, 'monster')
      setTimeout(()=> {
        dispatch(attack('monster'))
        dispatch(reportBattle('messagePlayer'))
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