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
        if (functionName =='heal') {
          elementToMove.style.visibility='hidden'
        }
        let whoIsred  = whoAction == 'player' ? monsterred : playerred
        let whoIsTouch  = whoAction == 'player' ? monsterDiv : playerDiv 
        whoIsTouch!.style.display ='none'
        whoIsred!.style.display = 'inherit'
        setTimeout(()=> {
          whoIsTouch!.style.display ='inherit'
          whoIsred!.style.display = 'none'
        },50)
      }, 100)
     
    }
    if (functionName == "draw") {
      draw(timePassed, delai, elementToMove, whoAction )
    }
    if (functionName == "fireBall") {
      
      fireBall(timePassed, delai, elementToMove, whoAction )
    }
    if (functionName == "heal") {
      
      heal(timePassed, delai, elementToMove, whoAction )
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
    elementToMove.style.left = timePassed / 1.5 + 'px'
  }
  if (whoAction = 'monster') {
    elementToMove.style.right = timePassed / 1.5 + 'px'
  }
}

function fireBall(timePassed:number, delai:number,  elementToMove:HTMLElement, whoAction:string) {
  let playerDiv: HTMLElement | null = document.getElementById(store.getState().gamerName)
  let monsterDiv: HTMLElement | null = document.getElementById(store.getState().monsterName)
  let imageToMove: HTMLElement| null
  whoAction == 'player' ? imageToMove = playerDiv : imageToMove = monsterDiv

  if (timePassed >= delai) {
    setTimeout(() => {
      elementToMove.style.height= "400px"
      whoAction == 'player' ?  imageToMove!.style.right = 'inherit' : imageToMove!.style.left = 'inherit';
      whoAction == 'player' ?  elementToMove!.style.left = '10rem' : elementToMove!.style.right = '-14rem';
      imageToMove!.style.bottom= 'inherit'
      elementToMove.style.height= '0px'
    }, 1)
  }
   
  if (timePassed < 100){
    imageToMove!.style.bottom = timePassed / 2   + 'px'  
    if (whoAction == 'player') {
      imageToMove!.style.right = timePassed / 1.25   + 'px' 
      imageToMove!.style.transform= `rotate(${ 360 - timePassed / 30 })`
    }
    else if (whoAction == 'monster') {
      imageToMove!.style.left = timePassed / 1.25   + 'px' 
      imageToMove!.style.transform= `rotate(${ timePassed / 30 })`
    }
  }
  else if (timePassed > 100 && timePassed < 200){
    imageToMove!.style.bottom = -timePassed / 7  + 'px' 
    if (whoAction == 'player') {
      imageToMove!.style.right = timePassed / 1.25   + 'px' 
      imageToMove!.style.transform= `rotate(${timePassed / 30 })`
    }
    else if (whoAction == 'monster') {
      imageToMove!.style.left = timePassed / 1.25   + 'px' 
      imageToMove!.style.transform= `rotate(${ 360 -timePassed / 30 })`
    }
  }
  else if (timePassed > 300) {
    elementToMove.style.visibility='visible'
    if (elementToMove.clientHeight <= 70) {
        elementToMove.style.height = timePassed / 10 + 'px' 
    }
    else if (elementToMove.clientHeight > 70) {
      if (whoAction == 'player') {
          elementToMove.style.left = 10 + (timePassed  / 25) + 'rem'
      }
      else if (whoAction == 'monster') {
        elementToMove.style.right= -14 + (timePassed  / 25) + 'rem'
      } 
    }
  }
}

function heal(timePassed:number, delai:number,  elementToMove:HTMLElement, whoAction:string){
  elementToMove.style.visibility='visible'
  elementToMove.style.transform = `rotate(${timePassed }deg)`
}
