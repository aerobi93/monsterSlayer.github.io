import store from "./store"

export const round = function (min:number , max:number) {
  return Math.round(Math.random() * (max - min) + min)
}
export const monsterArray = [
  { 
    name : 'bat',
    pvMax: 100,
    manaMax:30,
    dommage_min: 3,
    dommage_max: 7,
    special_min : 10,
    special_max: 15,
    heal: 10,
  },
  {
    name : 'arka',
    pvMax: 120,
    manaMax:50,
    dommage_min: 5,
    dommage_max: 9,
    special_min : 12,
    special_max: 17,
    heal: 14,
  },
  {
    name : 'asmode',
    pvMax: 150,
    manaMax:80,
    dommage_min: 7,
    dommage_max: 11,
    special_min : 15,
    special_max: 20,
    heal: 18,
  },
  {
    name : 'astarte',
    pvMax: 180,
    manaMax:100,
    dommage_min: 10,
    dommage_max: 14,
    special_min : 17,
    special_max: 22,
    heal: 22,
  },
  {
    name : 'axolam',
    pvMax: 210,
    manaMax:120,
    dommage_min: 12,
    dommage_max: 16,
    special_min : 19,
    special_max: 23,
    heal: 24,
  },
  {
    name : 'dragoonTroll',
    pvMax: 230,
    manaMax:150,
    dommage_min: 15,
    dommage_max: 19,
    special_min : 21,
    special_max: 26,
    heal: 27,
  },
  {
    name : 'golum',
    pvMax: 260,
    manaMax:170,
    dommage_min: 17,
    dommage_max: 21,
    special_min : 23,
    special_max: 28,
    heal: 30,
  },
  {
    name : 'killy',
    pvMax: 290,
    manaMax:200,
    dommage_min: 20,
    dommage_max: 24,
    special_min : 27,
    special_max: 33,
    heal: 33,
  },
  {
    name : 'oger',
    pvMax: 350,
    manaMax:220,
    dommage_min: 22,
    dommage_max: 27,
    special_min : 29,
    special_max: 34,
    heal: 40,
  },
]
export const moving = (elementToMove: HTMLElement, functionName : any , delai: number, whoAction: string ) => {
  let playerDiv: HTMLElement | null = document.getElementById(store.getState().gamerName)
  let monsterDiv: HTMLElement | null = document.getElementById(store.getState().monsterName)
  let playerred: HTMLElement | null = document.getElementById(`red-${store.getState().gamerName}`)
  let monsterred: HTMLElement | null = document.getElementById(`red-${store.getState().monsterName}`)
  
  let start = Date.now();
  let timer = setInterval(function() {
    let timePassed = Date.now() - start;  
    if (timePassed >=  delai) {
      clearInterval(timer);
      setTimeout(()=> {
        let whoIsred  = whoAction == 'player' ? monsterred : playerred
        let whoIsTouch  = whoAction == 'player' ? monsterDiv : playerDiv
        whoIsTouch!.style.display ='none'
        whoIsred!.style.display = 'inherit'
        setTimeout(()=> {
          whoIsTouch!.style.display ='inherit'
          whoIsred!.style.display = 'none'
        },50)
      }, 50)
     
    }
    if (functionName == "draw") {
      draw(timePassed, delai, elementToMove, whoAction )
    }
    if (functionName == "fireBall") {
      fireBall(timePassed, delai, elementToMove, whoAction )
    
    }

  }, 20);
}

function draw(timePassed:number, delai:number,  elementToMove:HTMLElement, whoAction:string) {
  if (timePassed >= delai) {
    setTimeout(() => {
      elementToMove.style.left = 'inherit'
      elementToMove.style.right = 'inherit'
    }, 1)
  }
  if ( whoAction == 'player') {
    elementToMove.style.left = timePassed / 2.5 + 'px'
  }
  if (whoAction = 'monster') {
    elementToMove.style.right = timePassed / 2.5 + 'px'
  }
}

function fireBall(timePassed:number, delai:number,  elementToMove:HTMLElement, whoAction:string) {
  let playerDiv: HTMLElement | null = document.getElementById(store.getState().gamerName)
  let monsterDiv: HTMLElement | null = document.getElementById(store.getState().monsterName)
  if (timePassed >= delai) {
      setTimeout(()=> {
        playerDiv!.style.right= 'inherit'
        playerDiv!.style.bottom= 'inherit'
      elementToMove.style.left = 'inherit'
      elementToMove.style.visibility='hidden'
      elementToMove.style.height= '0px'
      },51)
    }
   console.log(elementToMove.style.height)
    if (timePassed < 100){
      playerDiv!.style.bottom = timePassed / 2   + 'px'  
      playerDiv!.style.right = timePassed / 1.25   + 'px' 
      playerDiv!.style.transform= `rotate(${360 - timePassed / 30})`
     }
    else if (timePassed > 100 && timePassed < 200){
      playerDiv!.style.bottom = -timePassed / 7  + 'px'  
      playerDiv!.style.right = timePassed / 1.25  + 'px' 
      playerDiv!.style.transform= `rotate(${timePassed / 30})`
     }
    if (timePassed > 300) {
      elementToMove.style.visibility='visible'
      if (elementToMove.clientHeight <= 70) {
          elementToMove.style.height = timePassed / 10 + 'px' 
      }
      else if (elementToMove.clientHeight > 70) {
        elementToMove.style.left = timePassed  / 2 + 'px'
      }
    }
}
