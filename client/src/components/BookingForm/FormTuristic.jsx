import React, { useState } from 'react';

function FormTuristic({handleNext}) {
  const [currency, setCurrency] = useState('USD');
  const [isReturn, setIsReturn] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [departureDate, setDepartureDate] = useState('2024-10-04');
  const [departureTime, setDepartureTime] = useState('01:01');
  const [returnDate, setReturnDate] = useState('2024-10-04');
  const [returnTime, setReturnTime] = useState('00:00');
  const [from, setFrom] = useState('Aeropuerto Internacional de los Cabos');
  const [to, setTo] = useState('Los Cabos International Airport');


  
  const handleCurrencyChange = (currency) => {
    setCurrency(currency);
  };

  const handleReturnToggle = () => {
    setIsReturn(!isReturn);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      
      const formDataToStore = {
        currency,
        from,
        to,
        passengers,
        departureDate,
        departureTime,
        isReturn,
        returnDate,
        returnTime
      };
    
      // Guardar los datos en localStorage como una cadena JSON
      localStorage.setItem('formData', JSON.stringify(formDataToStore));
      handleNext()
    } catch (error) {
      console.log(error)
    } 
  
  };
  



  return (
  <div className='form-container'>


    <div className="booking-container">
      <h2>Book your shuttle</h2>
      <form onSubmit={handleSubmit}>

      <div className="currency-toggle">
        <button
          className={currency === 'USD' ? 'active' : ''}
          onClick={() => handleCurrencyChange('USD')}
        >
          USD
        </button>
        <button
          className={currency === 'MXN' ? 'active' : ''}
          onClick={() => handleCurrencyChange('MXN')}
        >
          MXN
        </button>
      </div>

        <div className="form-group">
          <label>From</label>
          <input type="text" value={from} onChange={(e) => setFrom(e.target.value)}  />
        </div>

        <div className="form-group">
          <label>To</label>
          <input type="text" value={to}  onChange={(e) => setTo(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Departure Date</label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Departure Time</label>
          <input
            type="time"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>¿How many passengers?</label>
          <select
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className="toggle-switch">
          <input
            type="checkbox"
            id="return-toggle"
            checked={isReturn}
            onChange={handleReturnToggle}
          />
          <label htmlFor="return-toggle">
            <span className="switch"></span>
            Would you like to add your return?
          </label>
        </div>

        {isReturn && (
          <>
            <div className="form-group">
              <label>Return Date</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Return Time</label>
              <input
                type="time"
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="button-container">
          <button type="submit" >BOOK NOW</button>
        </div>
      </form>
    </div>
    </div>

    
  );
}

export default FormTuristic;
