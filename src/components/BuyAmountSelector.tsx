import React from 'react';
import './BuyAmountSelector.css'; // Importar el archivo CSS

interface BuyAmountSelectorProps {
  buyAmount: number | 'max';
  onSetBuyAmount: (amount: number | 'max') => void;
}

const BuyAmountSelector: React.FC<BuyAmountSelectorProps> = ({ buyAmount, onSetBuyAmount }) => {
  const amounts: (number | 'max')[] = [1, 10, 100, 'max'];

  return (
    <div className="buy-amount-selector">
      <span className="buy-amount-label">Cantidad:</span>
      {amounts.map(amount => (
        <button
          key={amount}
          onClick={() => onSetBuyAmount(amount)}
          className={`amount-button ${buyAmount === amount ? 'active' : ''}`}
        >
          {amount === 'max' ? 'Máx' : `x${amount}`}
        </button>
      ))}
    </div>
  );
};

export default BuyAmountSelector;
