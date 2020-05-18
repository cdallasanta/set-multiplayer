import React from 'react';

export const Card = ({id, color, number, shape, shading}) => {
  shapes = () => {
    let shapes = [];
    for (i = 0; i< number; i++){
      shapes += <div className={`${color} ${shape} ${shading}`}></div>
    }
    return shapes;
  }
  
  return (
    <div className={`card-holder`} id={id}>
      {showShapes()}
    </div>
  )
}