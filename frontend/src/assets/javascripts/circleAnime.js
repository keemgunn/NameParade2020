import anime from 'animejs'

function Timeline(){
  return anime.timeline({
    autoplay: false,
  })
}

function keys(value, delay, duration, endDelay){
  return {
    value, delay, duration, endDelay
  }
}

function backCircleDashOff(){
  return [anime.setDashoffset, 0]
}



export {
  Timeline,
  keys,



  backCircleDashOff




}
