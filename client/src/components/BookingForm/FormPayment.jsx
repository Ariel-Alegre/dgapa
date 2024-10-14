import React, { useState, useEffect } from "react";

const FormPayment = () => {
  const [data, setData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    airline: "",
    flightNumber: "",
    comments: "",
    paymentMethod: "",
  });
  const [cartItems, setCartItems] = useState([]);

  console.log(cartItems)
  useEffect(() => {
    // Leer el carrito de localStorage usando el userId y sincronizar las cantidades en el menú
    const cart = JSON.parse(localStorage.getItem(`formData`)) || [];
    setCartItems(cart);

  
  }, [setCartItems]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handlePaymentChange = (method) => {
    console.log(method);
    setData({
      ...data,
      paymentMethod: method,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", data);
  };

  return (
    <div className="FormPayment-container">

      <div className="title-client">
        <strong>Client information</strong>
        <hr />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flight-form">
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={data.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={data.country}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="airline">Airline:</label>
            <input
              type="text"
              id="airline"
              name="airline"
              value={data.airline}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="flightNumber">Flight Number:</label>
            <input
              type="text"
              id="flightNumber"
              name="flightNumber"
              value={data.flightNumber}
              onChange={handleChange}
            />
          </div>

          <div className="full-width">
            <label htmlFor="comments">Comments:</label>
            <textarea
              id="comments"
              name="comments"
              value={data.comments}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <div className="title-client">
          <strong>Payment methods</strong>
          <hr />
        </div>

        <div className="payment-methods">
          <div className="payment-option">
            <img
              src="https://www.conectasoftware.com/wp-content/uploads/2020/03/Paypal_logo.png"
              alt="PayPal"
              className={data.paymentMethod === "PayPal" ? "selected" : ""}
            />
            <button
              type="button"
              className={data.paymentMethod === "PayPal" ? "selected" : ""}
              onClick={() => handlePaymentChange("PayPal")}
            >
              Seleccionar PayPal
            </button>
          </div>

          <div className="payment-option">
            <img
              src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cash-in-hand-icon-cartoon-style-png-image_5211912.jpg"
              alt="Efectivo"
              className={
                data.paymentMethod === "Efectivo" ? "selected" : ""
              }
            />
            <button
              type="button"
              className={
                data.paymentMethod === "Efectivo" ? "selected" : ""
              }
              onClick={() => handlePaymentChange("Efectivo")}
            >
              Seleccionar Efectivo
            </button>
          </div>
        </div>
      {/*  <div className="full-width">
          <button type="submit">Submit</button>
        </div>  */}
      </form>
     <div>

     </div>

    </div>
  );
};

export default FormPayment;
