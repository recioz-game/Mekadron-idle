import React from 'react';

interface BuyAmountSelectorProps {
  buyAmount: number | 'max';
  onSetBuyAmount: (amount: number | 'max') => void;
}

const BuyAmountSelector: React.FC<BuyAmountSelectorProps> = ({ buyAmount, onSetBuyAmount }) => {
  const amounts: (number | 'max')[] = [1, 10, 100, 'max'];

  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', alignItems: 'center' }}>
      <span style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>Cantidad:</span>
      {amounts.map(amount => (
        <button
          key={amount}
          onClick={() => onSetBuyAmount(amount)}
          style={{
            padding: '0.5rem',
            backgroundColor: buyAmount === amount ? '#F59E0B' : '#374151',
            color: 'white',
            border: `1px solid ${buyAmount === amount ? '#F59E0B' : '#4B5563'}`,
            borderRadius: '4px',
            cursor: 'pointer',
            minWidth: '40px',
            textAlign: 'center'
          }}
        >
          {amount === 'max' ? 'Máx' : `x${amount}`}
        </button>
      ))}
    </div>
  );
};

export default BuyAmountSelector;
