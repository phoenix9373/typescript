/**
 * Let's make a game 🕹
 */
type Direction = "up" | "down" | "left" | "right";
type Position = {
  x: number;
  y: number;
};
function move(direction: Direction, position: Position): Position {
  switch (direction) {
    case "up":
      position.y += 1;
      return position;
    case "down":
      position.y -= 1;
      return position;
    case "left":
      position.x -= 1;
      return position;
    case "right":
      position.x += 1;
      return position;
    default:
      throw Error("unknown direction");
  }
}
const position: Position = {
  x: 0,
  y: 0,
};

console.log(position); // { x: 0, y: 0}
move("up", position);
console.log(position); // { x: 0, y: 1}
move("down", position);
console.log(position); // { x: 0, y: 0}
move("left", position);
console.log(position); // { x: -1, y: 0}
move("right", position);
console.log(position); // { x: 0, y: 0}
