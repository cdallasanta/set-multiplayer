import React from 'react';

export const Card = ({color, number, shape, shading}) => {
  return (
    <div className={`card ${color} ${number} ${shape} ${shading}`} />
  )
}