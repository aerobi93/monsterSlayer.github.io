import { connect } from "react-redux";
import store from '../../store'
import Button from "../../components/button";
import { round, moving } from "../../utils";
import { regainMana, begin, end, setGamerName, attack, heal, changeDisplayAnimation} from '../../action'
import { displayPartsToString } from "typescript";
const mapStateToProps = (state : any) => ({
  displayAnimation : state.displayAnimation,
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
  end: () => {
      dispatch(end())
  },
  attack: (value: string, attacker:string, dommage:number) => {
    const playerDiv: HTMLElement | null = document.getElementById(store.getState().gamerName)
    let monsterDiv: HTMLElement | null = document.getElementById(store.getState().monsterName)
    let firePlayer:HTMLElement | null = document.getElementById('fire-'+store.getState().gamerName)
    let fireMonster:HTMLElement | null = document.getElementById('fire-'+store.getState().monsterName)
    let starMonster: HTMLElement | null = document.getElementById('star-'+store.getState().monsterName)
    dispatch(changeDisplayAnimation())
    if (value== 'magicFire'  && store.getState().playerMana -20 < 0) {
      alert("vos n avez plus assez de mana votre sort a echouer")  
    } 
    else if ( value== 'magicFire' && store.getState().playerMana -20 >= 0)  {
      moving(firePlayer!, monsterDiv!, 'fire', 1000, 'player' )
      setTimeout(() => {
         dispatch(attack('player','special')) 
      }, 1000)
     }
    else if (value== 'attack') {
      moving(playerDiv!, monsterDiv!,  'draw', 1000, 'player')
      setTimeout(() => {
         dispatch(attack('player','normal')) 
      }, 1000)
    } 
    setTimeout(()=> {
      if (store.getState().monsterPv > 0) {
        let random: number = round(1, 3)
        if (random == 1) {
          moving(monsterDiv!, playerDiv!,  'draw', 1000, 'monster')
          setTimeout(() => {
            dispatch(attack('monster', 'normal')) 
            dispatch(changeDisplayAnimation())
          }, 1000)
        }
        else if (random == 2 && store.getState().monsterMana - 10 >= 0) {
          moving(starMonster!, playerDiv!,  'healing', 1000, 'monster')
          setTimeout(() => {
            dispatch(heal('monster'))
            dispatch(changeDisplayAnimation())
          }, 1000);
        }
        else if (random == 3 && store.getState().monsterMana - 20 >= 0) {
          moving(fireMonster!, playerDiv!, 'fire', 1000, 'monster' )
          setTimeout(() => {
            dispatch(changeDisplayAnimation())
            dispatch(attack('monster', 'special'))
          }, 1000)
        }
        else {
          moving(monsterDiv!, playerDiv!,  'draw', 1000, 'monster')
          setTimeout(() => {
            dispatch(attack('monster', 'normal')) 
            dispatch(changeDisplayAnimation())
          }, 1000)
        }
      }    
   }, 1000)
  },

  heal: () => {
    const playerDiv: HTMLElement | null = document.getElementById(store.getState().gamerName)
    let monsterDiv: HTMLElement | null = document.getElementById(store.getState().monsterName)
    let fireMonster:HTMLElement | null = document.getElementById('fire-'+store.getState().monsterName)
    let starPlayer: HTMLElement | null = document.getElementById('star-'+store.getState().gamerName)
    let starMonster: HTMLElement | null = document.getElementById('star-'+store.getState().monsterName)
  
    if (store.getState().playerMana - 10 < 0) {
      alert("vos n avez plus assez de mana votre sort a echouer")
    }
    else if ((store.getState().playerMana - 10 > 0 ) ){
      dispatch(changeDisplayAnimation())
      moving(starPlayer!, playerDiv!,  'healing', 1000, 'player')
       setTimeout(() => {
        dispatch(heal('player'))
       }, 1000);
       
       setTimeout(()=> {
        if (store.getState().monsterPv > 0) {
          let random: number = round(1, 3)
          if (random == 1) {
            moving(monsterDiv!, playerDiv!,  'draw', 1000, 'monster')
            setTimeout(() => {
              dispatch(attack('monster', 'normal')) 
              dispatch(changeDisplayAnimation())
            }, 1000)
          }
          else if (random == 2 && store.getState().monsterMana - 10 >= 0) {
            moving(starMonster!, playerDiv!,  'healing', 1000, 'monster')
            setTimeout(() => {
              dispatch(heal('monster'))
              dispatch(changeDisplayAnimation())
            }, 1000);
          }
          else if (random == 3 && store.getState().monsterMana - 20 >= 0) {
            moving(fireMonster!, playerDiv!, 'fire', 1000, 'monster' )
            setTimeout(() => {
              dispatch(changeDisplayAnimation())
              dispatch(attack('monster', 'special'))
            }, 1000)
          }
          else {
            moving(monsterDiv!, playerDiv!,  'draw', 1000, 'monster')
            setTimeout(() => {
              dispatch(attack('monster', 'normal')) 
              dispatch(changeDisplayAnimation())
            }, 1000)
          }  
        }     
     }, 1000)
    }
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Button)