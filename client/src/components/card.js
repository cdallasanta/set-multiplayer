import React from 'react';
import '../stylesheets/cards.scss';

const Card = ({data: {id, color, number, shape, shading}}) => {
  const showShapes = () => {
    let shapesArr = [];
    for (let i = 0; i < number; i++){
      shapesArr.push(<div className={`${color} ${shape} ${shading}`} key={i} />)
    }
    return shapesArr;
  }
  
  return (
    <div className={`card-holder`} id={0}>
      {showShapes()}
    </div>
  )
}

export default Card;