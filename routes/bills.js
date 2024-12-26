//routes/bills.js
const express = require('express');
const Bill = require('../models/Bill'); // Adjust the path to the Bill model

const router = express.Router();

// 1. Get all bills
router.get('/api/bills', async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// 2. Add a new bill
router.post('/api/bills', async (req, res) => {
  const {
    companyname,
    gstno,
    billingname,
    location,
    from,
    to,
    products,
    basicvalue,
    discountamount,
    gstamount,
    grandtotal,
    billingstatus,
  } = req.body;

  if (!companyname || !gstno || !billingname || !location || !from || !to || !products || !basicvalue || !gstamount || !grandtotal) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  try {
    const newBill = new Bill({
      companyname,
      gstno,
      billingname,
      location,
      from,
      to,
      products,
      basicvalue,
      discountamount,
      gstamount,
      grandtotal,
      billingstatus: billingstatus || false,
    });

    await newBill.save();
    res.status(201).json(newBill);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// 3. Update billing status
router.put('/api/bills/:id/billingstatus', async (req, res) => {
  const { billingstatus } = req.body;

  if (billingstatus === undefined) {
    return res.status(400).json({ message: 'Billing status is required' });
  }

  try {
    const updatedBill = await Bill.findByIdAndUpdate(
      req.params.id,
      { billingstatus },
      { new: true }
    );

    if (!updatedBill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    res.status(200).json(updatedBill);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
