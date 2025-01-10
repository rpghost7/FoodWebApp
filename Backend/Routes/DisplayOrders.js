

const express = require("express");
const router = express.Router();
const myOrder = require("../modules/Orders");

const Buffer = require("buffer").Buffer;



const CLIENT_ID = "<Enter your Client ID from paypal business account";
const CLIENT_SECRET = "<Enter your Client secret also from the paypal business account>";


async function getAccessToken() {

  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  
  const response = await fetch(
    "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth}`,
      },
      body: "grant_type=client_credentials", 
    }
  );

  const data = await response.json(); // Parse the response as JSON

  if (data.access_token) {
   
    return data.access_token; 
  } else {
    console.error("Error:", data);
  }
}

const createOrder = async (item) => {
  const accessToken = await getAccessToken();

  const response = await fetch(
    "https://api-m.sandbox.paypal.com/v2/checkout/orders",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: item.value,
            },
          },
        ],
      }),
    }
  );

  const data = await response.json();
  
  if (!data.id) {
    throw new Error("Failed to create order.");
  }

  return data;
};
// Capture Order
const captureOrder = async (orderID) => {
  const accessToken = await getAccessToken();
  

  const response = await fetch(
    `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();
  

  if (!data.id) {
    throw new Error("Failed to capture order.");
  }

  return data;
};

router.post("/order-data", async (req, res) => {
  try {
    let email = req.body.email;
    let order_data = req.body.order_data;
    let date = req.body.date;
      

    let userData = await myOrder.findOne({ email });
    if (userData) {
      // Append the new order_data with date to existing orders
      userData.orders.push({ date: date, order_data: order_data });

      // Save the updated user data
      await userData.save();
      res.json({ success: true });
    } else {
      await myOrder.create({
        email: email,
        orders: [{ date: date, order_data: order_data }],
      });
      res.json({ success: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
router.post("/myOrders", async (req, res) => {
  try {
    let email = req.body.email;

    let userData = await myOrder.findOne({ email });
    if (userData) {
      res.json({ order: userData.orders });
    } else {
      res.json({ message: "You haven't ordered anything yet" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
// Create Order Route
router.post("/orders", async (req, res) => {
  try {
      const order = await createOrder(req.body);
      res.status(200).json(order);
  } catch (error) {
      console.error("Error creating order:", error.message);
      res.status(500).json({ error: "Failed to create order." });
  }
});
router.post("/orders/:orderID/capture", async (req, res) => {
  try {
    const { orderID } = req.params;
    console.log("Capture Order Endpoint Called with Order ID:", orderID); // Debug log

    const capture = await captureOrder(orderID);
    res.status(200).json(capture);
  } catch (error) {
    console.error("Error in Capture Order Endpoint:", error.message);
    res.status(500).json({ error: "Failed to capture order.", details: error.message });
  }
});

module.exports = router;
