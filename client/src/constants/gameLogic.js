import CARDS from './cards';

const checkForMatch = (cards) => {
  let card1 = CARDS[cards[0]];
  let card2 = CARDS[cards[1]];
  let card3 = CARDS[cards[2]];

  return (
    isSet(card1.number, card2.number, card3.number) &&
    isSet(card1.shape, card2.shape, card3.shape) &&
    isSet(card1.shading, card2.shading, card3.shading) &&
    isSet(card1.color, card2.color, card3.color)
  );
}

const isSet = (attr1, attr2, attr3) => {
  return(
    (attr1 === attr2 && attr1 === attr3)
    ||
    (attr1 !== attr2 && attr1 !== attr2 && attr2 !== attr3)
  );
}

export { checkForMatch };