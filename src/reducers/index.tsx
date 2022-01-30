import { SET_GAMER_NAME, BEGIN, END, HEAL, ATTACK, CHANGE_LEVEL, REGAIN_MANA, CHANGE_DISPLAY_ANIMATION, REPORT_BATTLE, FIRE_BALL, LOST_MANA, FIRE_CONE } from '../action'
import { monsterArray, round } from '../utils'

const initialState = {
  level : 0,
  beeingPlaying : false,
  displayAnimation:false,
  dommage:'',
  //monster
  currentMonster : monsterArray[0],
  monsterName:  '',
  monsterPv: '',
  monsterMana:'',
  messageMonster: '',
  //player
  gamerName:'',
  playerPvMax: 100,
  playerPv: '',
  playerManaMax: 100,
  playerMana: '',
  lvUpPlayer: 100,
  messagePlayer: '', 
};
const reducer = (state:any = initialState, action:any = {})  => {
  switch(action.type) {
    case SET_GAMER_NAME:
      return {
        ...state,
        gamerName : action.value
      }
    case BEGIN: 
     return {
       ...state, 
       beeingPlaying: true,
       displayAnimation:false,
       playerPv: state.playerPvMax,
       playerMana: state.playerManaMax,
       monsterName: state.currentMonster.name,
       monsterPv : state.currentMonster.pvMax,
       monsterMana: state.currentMonster.manaMax,
     }
     case CHANGE_DISPLAY_ANIMATION: 
      return {
        ...state,
        displayAnimation : !state.displayAnimation
      }
     case REGAIN_MANA:{ 
       console.log(state. playerMana, state.monsterMana )
      return {
        ...state,
        monsterMana :state.monsterMana + 5 < state.monsterManaMax ? state.monsterMana + 5 : state.currentMonster.manaMax,
        playerMana: state.playerMana + 5 < state.playerManaMax ?  state.playerMana + 5 : state.playerManaMax
      } }
    case HEAL: {
       if (action.value == 'player') {
       return {
        ...state,
          playerMana : state.playerMana - 10,
          playerPv: state.playerPv + Math.floor(15 * ( state.lvUpPlayer) /100) >= state.playerPvMax ?
          state.playerPvMax: 
          state.playerPv + Math.floor(15 * ( state.lvUpPlayer) /100),
          messagePlayer: state.playerPv + Math.floor(15 * ( state.lvUpPlayer) /100) >= state.playerPvMax ? 
          'vous avez recuperez' + (state.playerPvMax  - state.playerPv) + 'pv' : 
          'vous avez recuperez' + Math.floor(15 * ( state.lvUpPlayer) /100) + 'pv'
        }
     }
        if (action.value == 'monster') {
          return {
            ...state,
            monsterMana : state.monsterMana - 10,
            monsterPv: state.monsterPv + state.actualMonster.heal >= state.monsterPvMax ?
            state.monsterPvMax: 
            state.monsterPv + state.actualMonster.heal,
            messageMonster: state.monsterPv + state.actualMonster.heal >= state.monsterPvMax ? 
            'le monstre  a recuperer' + (state.monsterPvMax  - state.monsterPv) + 'pv' : 
            'le monstre  a recuperer' + state.actualMonster.heal + 'pv'
          }
        }
      }
      case  REPORT_BATTLE: 
        return {
          ...state,
          [action.forWho]: action.forWho == 'monster' ?
            state.gamerName + ' a infliger ' + state.dommage + ' de degat' :
            state.monsterName + ' vous a infliger ' + state.dommage + ' de degat'

        }
      case ATTACK: {
        if (action.attacker == "player") {
          let dommageInflige = Math.floor( round(3 , 5) * (state.lvUpPlayer) / 100)
          return {
            ...state,
            dommage: dommageInflige,
            monsterPv : state.monsterPv - dommageInflige > 0 ? 
            state.monsterPv - dommageInflige :
            0
          }
        }
        if (action.attacker == "monster") {
          let dommageInflige = round(state.currentMonster.dommage_min, state.currentMonster.dommage_max)
          return {
            ...state,
            dommage: dommageInflige,
            playerPv : state.playerPv - dommageInflige > 0 ? 
            state.playerPv - dommageInflige :
            0
          }
        }
      }
      case LOST_MANA: 
        return {
          ...state,
          [action.value] : +[state[action.value]] - action.number
        }
      case FIRE_CONE :
        return {
          ...state,
          monsterPV: state.monnsterPV - (  state.lvUpPlayer / 100)
        }
      
      case FIRE_BALL: {
        if (action.attacker == "player") {
          let dommageInflige = Math.floor( round(10 , 15) * (state.lvUpPlayer) / 100)
          return {
            ...state,
            dommage: dommageInflige,
            monsterPv : state.monsterPv - dommageInflige > 0 ? 
            state.monsterPv - dommageInflige :
            0
          }
        }
        if (action.attacker == "monster") {
          let dommageInflige = round(state.currentMonster.special_min, state.currentMonster.special_max)
          return {
            ...state,
            dommage: dommageInflige,
            playerPv : state.playerPv - dommageInflige > 0 ? 
            state.playerPv - dommageInflige :
            0
          }
        }
      }

      case CHANGE_LEVEL: 
        return {
          ...state,
          level: state.level + 1,
          lvUpPlayer: state.lvUpPlayer + 20,
          playerPvMax : state.playerPvMax + 20,
          playerManaMax : state.playerPvMax + 20,
          monsterPv: monsterArray[state.level + 1].pvMax,
          monsterPvMax: monsterArray[state.level + 1].pvMax,
          monsterMana : monsterArray[state.level + 1].manaMax,
          monsterManaMax : monsterArray[state.level + 1].manaMax,
          monsterName: monsterArray[state.level + 1].name,
          messagePlayer: '',
          messageMonster : '', 
          displayAnimation : false
        }
      case END :
        return {
          ...state,
          level : 0,
          gamerName:'',
          monsterName: monsterArray[0],
          beeingPlaying : false,
          displayAnimation:false,
          monsterPvMax: '',
          monsterPv: 100, 
          playerPvMax: 100,
          playerPv: 100,
          monsterManaMax: 100,
          monsterMana: 100, 
          playerManaMax: 100,
          playerMana: 100, 
       }
    default: return state
  }
}
export default reducer