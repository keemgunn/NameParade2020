function relocateCoords(event, canvasCoords){
  return {
    x: event.point.x + canvasCoords.x,
    y: event.point.y + canvasCoords.y
  }
}

function newPath(scope, {x,y}) {
  return new scope.Point(x,y)
}

function getDelta(scope, last, curr){
  return new scope.Point(
    curr.x - last.x,
    curr.y - last.y
  )
}

// const cornerAmount = 0.05; 

function Stroke(scope, {width, curr, delta}){
  console.log(width);
  let path = new scope.Path.Ellipse(
    newRect(scope, {width, delta})
  )
  path.fillColor = 'white';
  path.position = new scope.Point(
    curr.x - delta.x,
    curr.y - delta.y
  );
  path.rotate(delta.angle);
  return path
}

const strokeConfig = {
  length: 1.5 ,
  width: 0.8
}
function newRect(scope, {width, delta}){
  console.log(delta.length);
  return new scope.Rectangle({ 
    point: new scope.Point(0,0),
    size: new scope.Size(
      delta.length * strokeConfig.length , 
      width + (delta.length * strokeConfig.width)
    )
  })
}



export {
  relocateCoords,
  newPath,
  getDelta,
  Stroke

}