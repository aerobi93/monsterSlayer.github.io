export const REGAIN_MANA = 'REGAIN_MANA'
export const BEGIN = 'BEGIN';
export const SET_GAMER_NAME = 'SET_GAMER_NAME'
export const END = 'END';
export const ATTACK = 'ATTACK'
export const HEAL = 'HEAL'
export const CHANGE_LEVEL = 'CHANGE_LEVEL'
export const CHANGE_DISPLAY_ANIMATION = 'CHANGE_DISPLAY_ANIMATION'

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

export const attack = (attacker:string, typeAttack: string) => ({
  type: ATTACK,
  attacker,
  typeAttack,
})

export const heal = (value:string) => ({
  type: HEAL, 
  value
})

export const changeLevel = () => ({
  type: CHANGE_LEVEL
})

export const changeDisplayAnimation = () => ({
  type : CHANGE_DISPLAY_ANIMATION
})