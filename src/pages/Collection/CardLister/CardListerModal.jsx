import React from 'react';
import './CardListerModal.css';
//import Sell from './Sell';

const CardListerModal = ({ card, onClose }) => {
  // Log to check if the component is rendering and what card data it receives
  console.log('Rendering CardModal, card:', card);

  if (!card) {
    console.log('Card is null, not rendering modal.');
    return null;
  }

  const handleCloseClick = (e) => {
    e.stopPropagation(); // Prevents the modal from closing when the content is clicked
    console.log('Closing modal');
    onClose();
  };

  return (
    <div className='modal-content'>
      <span className='close' onClick={handleCloseClick}>&times;</span>

      {/* Modal Header */}
      <div className='modal-header'>
        <h2 className='card-modal-name'>{card.name} (#{card.national_pokedex_numbers})</h2>
      </div>

      {/* Modal Image */}
      <div className='modal-image'>
        <img src={card.small_image_url || 'default-image.png'} alt={`Card ${card.name}`} />
      </div>

      <div className='modal-description'>
        <div className='column'>
          {card.rarity && <p className='card-modal-rarity'>Rarity: {card.rarity}</p>}
          {card.artist && <p className='card-modal-artist'>Artist: {card.artist}</p>}
          {card.flavor_text && <p className='card-modal-flavortext'>Flavor Text: {card.flavor_text}</p>}
          {card.national_pokedex_numbers && <p className='card-modal-pokedex'>Pokedex: {card.national_pokedex_numbers}</p>}
        </div>
        <div className='column'>
          {card.price && <p className='card-modal-price'>Price: {card.price}</p>}
          {card.hp && <p className='card-modal-hp'>HP: {card.hp}</p>}
          {card.level && <p className='card-modal-level'>Level: {card.level}</p>}
          {card.supertype && <p className='card-modal-supertype'>Supertype: {card.supertype}</p>}
          {card.set && <p className='card-modal-set'>Set: {card.set}</p>}
        </div>
        
        
        
      </div>

    </div>
  );
};

export default CardListerModal;