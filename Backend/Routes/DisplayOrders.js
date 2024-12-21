const express = require("express");
const router = express.Router();
const myOrder = require("../modules/Orders");
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

module.exports = router;
