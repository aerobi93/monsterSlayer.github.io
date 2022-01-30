export const REGAIN_MANA = 'REGAIN_MANA'
export const BEGIN = 'BEGIN';
export const SET_GAMER_NAME = 'SET_GAMER_NAME'
export const END = 'END';
export const ATTACK = 'ATTACK'
export const FIRE_BALL = 'FIRE_BALL'
export const FIRE_CONE = 'FIRE_CONE'
export const ICE = 'ICE' 
export const HEAL = 'HEAL'
export const LOST_MANA = 'LOST_MANA'
export const CHANGE_LEVEL = 'CHANGE_LEVEL'
export const CHANGE_DISPLAY_ANIMATION = 'CHANGE_DISPLAY_ANIMATION'
export const REPORT_BATTLE = 'REPORT_BATTLE'

export const regainMana = () => ({
  type: REGAIN_MANA
})

export const begin = () => ({
  type: BEGIN
});

export const setGamerName = (value: string) => ({
  type: SET_GAMER_NAME,
  value
})

export const end = () => ({
  type: END
  });

export const attack = (attacker:string) => ({
  type: ATTACK,
  attacker,
})

export const fireBall = (attacker:string) => ({
  type: FIRE_BALL,
  attacker,
})

export const fireCone = () => ({
  type: FIRE_CONE,
})

export const ice = (attacker:string) => ({
  type: ICE,
  attacker,
})

export const heal = (value:string) => ({
  type: HEAL, 
  value
})

export const lostMana = (value: string, number: number) => ({
  type: LOST_MANA,
  value,
  number,
})
  

export const changeLevel = () => ({
  type: CHANGE_LEVEL
})

export const changeDisplayAnimation = () => ({
  type : CHANGE_DISPLAY_ANIMATION
})

export const reportBattle = (forWho:string) => ({
  type : REPORT_BATTLE,
  forWho,
})