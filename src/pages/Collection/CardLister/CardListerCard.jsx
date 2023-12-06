import React from 'react';
import './CardListerCard.css';


const CardListerCard = ({ card, onCardClick }) => {
  return (
    <li className='card' onClick={() => onCardClick(card)}>
      <img src={card.small_image_url} alt={`Card ${card.name}`} />
      <h3>{card.name}</h3>
      <h3>#{card.national_pokedex_numbers}</h3>
      <p>Price: {card.price}</p>
    </li>
  );
};

export default CardListerCard;
