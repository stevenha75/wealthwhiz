const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || "sandbox";
const PLAID_URL = `https://${PLAID_ENV}.plaid.com`;

// Step 1: Create Link Token
app.post("/api/create-link-token", async (req, res) => {
  try {
    const response = await axios.post(`${PLAID_URL}/link/token/create`, {
      client_id: PLAID_CLIENT_ID,
      secret: PLAID_SECRET,
      user: { client_user_id: "unique_user_id" },
      client_name: "Wealth Whiz",
      products: ["transactions"],
      country_codes: ["US"],
      language: "en",
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.response.data });
  }
});

// Step 2: Exchange Public Token for Access Token
app.post("/api/exchange-public-token", async (req, res) => {
  const { public_token } = req.body;
  try {
    const response = await axios.post(`${PLAID_URL}/item/public_token/exchange`, {
      client_id: PLAID_CLIENT_ID,
      secret: PLAID_SECRET,
      public_token,
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.response.data });
  }
});

// Step 3: Fetch Transactions
app.post("/api/get-transactions", async (req, res) => {
  const { access_token } = req.body;
  try {
    const response = await axios.post(`${PLAID_URL}/transactions/get`, {
      client_id: PLAID_CLIENT_ID,
      secret: PLAID_SECRET,
      access_token,
      start_date: "2023-01-01",
      end_date: "2023-12-31",
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.response.data });
  }
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
