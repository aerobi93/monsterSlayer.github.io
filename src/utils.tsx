import { Collection, resolveTypeReferenceDirective } from "typescript"
import store from "./store"

export const round = function (min:number , max:number) {
  return Math.round(Math.random() * (max - min) + min)
}
export const monsterArray = [
  { 
    name : 'bat',
    pvMax: 100,
    manaMax:30,
    dommage: round(3, 5),
    special : round(5, 10),
    heal: 10,
  },
  {
    name : 'arka',
    pvMax: 120,
    manaMax:50,
    dommage: round(5, 8),
    special : round(7, 14),
    heal: 14,
  },
  {
    name : 'asmode',
    pvMax: 150,
    manaMax:80,
    dommage: round(7, 10),
    special : round(9, 15),
    heal: 18,
  },
  {
    name : 'astarte',
    pvMax: 180,
    manaMax:100,
    dommage: round(9, 12),
    special : round(11, 17),
    heal: 22,
  },
  {
    name : 'axolam',
    pvMax: 210,
    manaMax:120,
    dommage: round(11, 14),
    special : round(13, 19),
    heal: 24,
  },
  {
    name : 'dragoonTroll',
    pvMax: 230,
    manaMax:150,
    dommage: round(13, 15),
    special : round(15, 20),
    heal: 27,
  },
  {
    name : 'golum',
    pvMax: 260,
    manaMax:170,
    dommage: round(15, 17),
    special : round(17, 23),
    heal: 30,
  },
  {
    name : 'killy',
    pvMax: 290,
    manaMax:200,
    dommage: round(17, 20),
    special : round(19, 25),
    heal: 33,
  },
  {
    name : 'oger',
    pvMax: 350,
    manaMax:220,
    dommage: round(20, 25),
    special : round(22, 30),
    heal: 40,
  },
]
export const moving = (elementToMove: HTMLElement, elementTouch: HTMLElement, functionName : any , delai: number, nameWhoMove: string) => {
  let start = Date.now();
  let timer = setInterval(function() {
    let timePassed = Date.now() - start;
    
    if (timePassed >=  delai) {
      clearInterval(timer);
      setTimeout(() => {  
        if (functionName == "draw") {
          elementToMove.style.left ='inherit'
          elementToMove.style.right ='inherit'
        }
        if (functionName == "healing") {
          let gradient: HTMLElement | null;
          nameWhoMove == 'player' ?
            gradient= document.getElementById(store.getState().gamerName) :
            gradient =document.getElementById(store.getState().monsterName)
          elementToMove.style.transform = `rotate(0deg)`
          elementToMove.style.display= `none`
          elementToMove.parentElement!.style.bottom= 'inherit'
          setTimeout(() => {
            gradient!.style.background=`none`
          }, (1000 / 4  + 1))
        }
        if (functionName == "draw") {
          elementToMove.style.left ='inherit'
          elementToMove.style.right ='inherit'
        }

        if (functionName == "fire") { 
          elementToMove.style.top = '-24rem'
          elementToMove.style.display = 'none'
         
          if ( nameWhoMove == 'player') {
            elementToMove.style.left = '12rem'
          }
          if ( nameWhoMove == 'monster') {
            elementToMove.style.left = '-2rem'
          }
        }
        if (functionName == "draw" || functionName == "fire")
        elementTouch.style.backgroundColor= 'red'
        setTimeout(() => {
          elementTouch.style.backgroundColor= 'inherit'
        }, 50)
      }, 50);}

      if (functionName == "draw") {
        draw(timePassed, elementToMove, nameWhoMove )
      }
      if (functionName == "fire") {
        fire(timePassed, elementToMove, nameWhoMove )
      }
      if (functionName == "healing") {
        let gradient: HTMLElement | null;
        nameWhoMove == 'player' ? 
          gradient= document.getElementById(store.getState().gamerName) : 
          gradient =document.getElementById(store.getState().monsterName)
          gradient!.parentElement!.style.bottom= '22rem'
          setTimeout(() => {
            gradient!.style.background=`linear-gradient(transparent 30%, rgb(95, 255, 47))`;
          }, 1000 / 4);
        healing(timePassed, elementToMove, gradient!)
      }
  }, 20);
}

function draw(timePassed:number, elementToMove:HTMLElement, nameWhoMove: string) {
  if ( nameWhoMove == 'player') {
    elementToMove.style.left = timePassed / 2.5 + 'px'
  }
  else if (nameWhoMove = 'monster') {
    elementToMove.style.right = timePassed / 2.5 + 'px'
  }
}
function fire(timePassed:number, elementToMove:HTMLElement, nameWhoMove: string) {
  elementToMove.style.display = 'inherit'
  if  (elementToMove.clientHeight  < 70) {
    elementToMove.style.height = timePassed / 5 + 'px'
  }
  else if  (elementToMove.clientHeight  > 70) {
    if ( nameWhoMove == 'player') {
      elementToMove.style.left = timePassed / 2.25 + 'px'
    }
    else if (nameWhoMove = 'monster') {
      elementToMove.style.right = timePassed / 2.25 + 'px'
    }
  }
}
function healing(timePassed:number, elementToMove:HTMLElement, gradient: HTMLElement) {
  elementToMove.style.display= `inherit`
  elementToMove.style.transform = `rotate(${timePassed}deg)`
}
    

