import React from 'react';
import './CardListerModal.css';
import Sell from './Sell';

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
    <div className='collection-modal-content'>
      <span className='collection-close' onClick={handleCloseClick}>&times;</span>

      {/* Modal Header */}
      <div className='collection-modal-header'>
        <h2 className='collection-card-modal-name'>{card.name} (#{card.national_pokedex_numbers})</h2>
         <Sell card={card} />
      </div>

      {/* Modal Image */}
      <div className='collection-modal-image'>
        <img src={card.small_image_url || 'default-image.png'} alt={`Card ${card.name}`} />
      </div>

      <div className='collection-modal-description'>
        <div className='collection-column'>
          {card.rarity && <p className='collection-card-modal-rarity'>Rarity: {card.rarity}</p>}
          {card.artist && <p className='collection-card-modal-artist'>Artist: {card.artist}</p>}
          {card.flavor_text && <p className='collection-card-modal-flavortext'>Flavor Text: {card.flavor_text}</p>}
          {card.national_pokedex_numbers && <p className='collection-card-modal-pokedex'>Pokedex: {card.national_pokedex_numbers}</p>}
        </div>
        <div className='collection-column'>
          {<p className='collection-card-modal-price'>Price: ${card.price !== null ? card.price.toFixed(2) : '0.00'}</p>}
          {card.hp && <p className='collection-card-modal-hp'>HP: {card.hp}</p>}
          {card.level && <p className='collection-card-modal-level'>Level: {card.level}</p>}
          {card.supertype && <p className='collection-card-modal-supertype'>Supertype: {card.supertype}</p>}
          {card.set && <p className='collection-card-modal-set'>Set: {card.set}</p>}
        </div>
        
      </div>

    </div>
  );
};

export default CardListerModal;
