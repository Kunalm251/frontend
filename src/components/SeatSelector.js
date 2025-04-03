import React, { useState } from 'react';
import './SeatSelector.css';

const SeatSelector = ({ onSeatSelect }) => {
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const cols = [1, 2, 3, 4, 5, 6];
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
    onSeatSelect(selectedSeats);
  };

  return (
    <div className="seat-map">
      {rows.map(row => (
        <div key={row} className="seat-row">
          {cols.map(col => {
            const seat = `${row}${col}`;
            return (
              <button
                key={seat}
                className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                onClick={() => toggleSeat(seat)}
              >
                {col}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SeatSelector;