
const { Router }= require('express');
const router = Router();
const paypal = require('@paypal/checkout-server-sdk');
const {LoginBooking} = require('../controllers/LoginBooking');
const {RegisterBooking} = require('../controllers/RegisterBooking');
const {DestailsBookings} = require('../controllers/DestailsBookings');
require('dotenv').config();

const environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID, 
    process.env.PAYPAL_CLIENT_SECRET
  );
  const client = new paypal.core.PayPalHttpClient(environment);
  
  router.post('/create-order', async (req, res) => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '10.00', // Precio del producto
                breakdown: {
                    item_total: {
                        currency_code: 'USD',
                        value: '10.00' // Asegúrate de que el total aquí coincida
                    }
                }
            },
            items: [{
                name: "Nombre del producto",
                unit_amount: {
                    currency_code: 'USD',
                    value: '10.00'
                },
                quantity: '1'
            }]
        }]
    });

    try {
        const order = await client.execute(request);
        const approvalLink = order.result.links.find(link => link.rel === 'approve').href;

        // Enviar el enlace de aprobación al cliente
        res.status(201).json({ id: order.result.id, approvalLink });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.response ? err.response : 'Error al crear la orden');
    }
});
  
  
  // Ruta para capturar la orden
  router.post('/capture-order', async (req, res) => {
    const { orderID } = req.body;
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});
  
    try {
      const capture = await client.execute(request);
      res.status(200).json(capture.result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al capturar la orden');
    }
  });

router.post('/login-booking', LoginBooking );
router.post('/register-booking', RegisterBooking );
router.get('/detalles-booking', DestailsBookings );



module.exports = router




















