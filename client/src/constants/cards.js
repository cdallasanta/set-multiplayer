const CARDS = [];

const COLORS = ["red", "blue", "purple"];
const SHADING = ["solid", "striped", "empty"];
const SHAPE = ["diamond", "oval", "squiggle"];
const NUMBER = [1,2,3];
var id = 0;


COLORS.forEach(color => {
  SHADING.forEach(shading => {
    SHAPE.forEach(shape => {
      NUMBER.forEach(num => {
        CARDS.push({
          id: id,
          color: color,
          shading: shading,
          shape: shape,
          number: num
        });
        id++;
      })
    })
  })
});

export default CARDS;