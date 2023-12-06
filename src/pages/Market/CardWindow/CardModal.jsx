import React from 'react';
import './CardModal.css';
import AddToCartButton from './AddCartButton';

const CardModal = ({ card, onClose }) => {
  // Log to check if the component is rendering and what card data it receives
  console.log('Rendering CardModal, card:', card);

  if (!card) return null; // Render nothing if there is no card

  // This function stops the click from propagating to the background
  const stopPropagation = (e) => {
    e.stopPropagation();
  };


  return (
    <div className="modal-background" onClick={onClose}> {/* Closes modal on background click */}
      <div className='modal-content' onClick={stopPropagation}>
        <button className="modal-close-button" onClick={onClose}>
          <i className="fas fa-arrow-left"></i> {/* Back arrow icon from FontAwesome */}
        </button>

        {/* Modal Header */}
        <div className='modal-header'>
          <h2 className='card-modal-name'>{card.name} (#{card.national_pokedex_numbers})</h2>
        </div>

        {/* Modal Image */}
        <div className='modal-image'>
          <img src={card.small_image_url || 'default-image.png'} alt={`Card ${card.name}`} />
          <AddToCartButton
            cardId={card.id}
            onAddSuccess={() => console.log("Added to cart successfully")}
            onAddError={(error) => console.log("Error adding to cart:", error)}
          />
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
    </div>

  );
};

export default CardModal;
