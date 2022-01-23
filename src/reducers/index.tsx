import { SET_GAMER_NAME, BEGIN, END, HEAL, ATTACK, CHANGE_LEVEL, REGAIN_MANA, CHANGE_DISPLAY_ANIMATION } from '../action'
import { monsterArray, round } from '../utils'

const initialState = {
  level : 0,
  beeingPlaying : false,
  displayAnimation:false,
  actualMonster : monsterArray[0],
  monsterName:  monsterArray[0].name,
  monsterPvMax: monsterArray[0].pvMax,
  monsterPv: '',
  monsterManaMax:  monsterArray[0].manaMax,
  monsterMana:'',
  messageMonster: '',
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
       monsterPv : state.monsterPvMax,
       monsterMana: state.monsterManaMax,
     }
     case CHANGE_DISPLAY_ANIMATION: 
      return {
        ...state,
        displayAnimation : !state.displayAnimation
      }
     case REGAIN_MANA: 
      return {
        ...state,
        monsterMana :state.monsterMana +5 < state.monsterManaMax ? state.monsterMana + 5 : state.monsterManaMax,
        playerMana: state.playerMana + 5 < state.playerManaMax ?  state.playerMana + 5 : state.playerManaMax
      } 
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
      
      case ATTACK: {
        
        if( action.attacker == 'player') {
          return {
            ...state,
            playerMana : action.typeAttack == 'special' ? state.playerMana - 20 : state.playerMana ,
            monsterPv: state.monsterPv - (( action.typeAttack == 'normal' ? round(3, 10) : round(10, 15) ) * (state.lvUpPlayer ) / 100) <= 0 ?
              0 :
              state.monsterPv - (( action.typeAttack == 'normal' ? round(3, 10) : round(10, 15) ) * (state.lvUpPlayer ) / 100),
            messageMonster: state.gamerName + ' vous a infliger ' + (( action.typeAttack == 'normal' ? round(3, 10) : round(10, 15) ) * (state.lvUpPlayer ) / 100) + ' de dommage'
          }
        }
        if( action.attacker == 'monster') {
          return {
            ...state,
            monsterMana : action.typeAttack == 'special' ? state.monsterMana - 20 : state.monsterMana,
            playerPv: state.playerPv - (action.typeAttack== 'normal' ? state.actualMonster.dommage : state.actualMonster.special) <= 0 ?
              0 :
              state.playerPv - (action.typeAttack== 'normal' ? state.actualMonster.dommage : state.actualMonster.special),
            messagePlayer: state.monsterName + ' vous a infliger ' + (action.typeAttack== 'normal' ? state.actualMonster.dommage : state.actualMonster.special) + ' de dommage'
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
          monsterPvMax: 100,
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