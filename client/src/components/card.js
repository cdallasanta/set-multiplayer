import React from 'react';
import '../stylesheets/cards.scss';

const Card = ({data: {id, color, number, shape, shading}, selectCard, selected}) => {
  const showShapes = () => {
    let shapesArr = [];
    for (let i = 0; i < number; i++){
      shapesArr.push(<div className={`${color} ${shape} ${shading}`} key={i} data-id={id} />)
    }
    return shapesArr;
  }
  
  return (
    <div className={`card-holder${selected ? " selected" : ""}`} id={id} onClick={selectCard} data-id={id} >
      {showShapes()}
    </div>
  )
}

export default Card;