import React from 'react';
import './Card.css';


const Card = ({ card, onCardClick }) => {
  return (
    <li className='card' onClick={() => onCardClick(card)}>
      <img src={card.small_image_url} alt={`Card ${card.name}`} />
      <h3>{card.name}</h3>
      <h3>#{card.national_pokedex_numbers}</h3>
      <p>Market Price: {card.price}</p>
    </li>
  );
};

export default Card;
