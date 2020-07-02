let offset = 1;
let x = 0;
function test() {
  x += (++offset % 2 == 1 ? offset : -offset);
  console.log("x: ", x);
  console.log("offset: ", offset);
}
