function Timeline(anime){
  return anime.timeline({
    autoplay: false,
  })
}
function keys(value, delay, duration, endDelay, easing){
  return {
    value, delay, duration, endDelay, easing
  }
}


export {
  Timeline,
  keys,


}
