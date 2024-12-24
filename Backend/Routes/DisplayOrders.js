

const express = require("express");
const router = express.Router();
const myOrder = require("../modules/Orders");

const Buffer = require("buffer").Buffer;
 // This line should be at the top

// PayPal client credentials from environment variables
const CLIENT_ID = "AfKw6hNf1aDBORgmI0VfrBLqUPWdKwB0aT0FUjqMJA7swZDkjc4rYU0SYnRv1D7vG1DUpnx5_bdbau6O";
const CLIENT_SECRET = "EOGP-jG_gCm3fP6-hK8qhUZ0bx5_IeQ26y9QU0q70QGKOS4Woj0Ms9cUzPPb_egBnra0Kc_RXViJQ3lV";
// PayPal client credentials
// console.log("PayPal Client ID:", CLIENT_ID);
// console.log("PayPal Client Secret:", CLIENT_SECRET);

async function getAccessToken() {
  // Basic Authentication (Client ID and Secret)
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  // Make the POST request to get the access token
  const response = await fetch(
    "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth}`,
      },
      body: "grant_type=client_credentials", // Body to request client credentials
    }
  );

  const data = await response.json(); // Parse the response as JSON

  if (data.access_token) {
    // console.log("Access Token:", data.access_token);
    return data.access_token; // Return the access token
  } else {
    console.error("Error:", data);
  }
}
// Create Order
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
