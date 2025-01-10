const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Plaid and OpenAI Configurations
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || "sandbox";
const PLAID_URL = `https://${PLAID_ENV}.plaid.com`;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your .env file
});

// Create Plaid Link Token
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
    console.error("Error creating link token:", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

// Exchange Public Token
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
    console.error("Error exchanging public token:", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

// Simulated Transactions Endpoint
app.post("/api/get-transactions", async (req, res) => {
  try {
    const transactions = [
      { category: "Groceries", amount: 250 },
      { category: "Rent", amount: 1200 },
      { category: "Entertainment", amount: 200 },
      { category: "Transportation", amount: 150 },
      { category: "Savings", amount: 500 },
    ];
    res.json({ transactions });
  } catch (err) {
    console.error("Error fetching transactions:", err.message);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

app.post("/api/generate-budget", async (req, res) => {
    const { grossIncome, transactions } = req.body;
  
    const prompt = `
      I have a monthly gross income of $${grossIncome}.
      Here are my transactions:
      ${JSON.stringify(transactions, null, 2)}
  
      Based on this data, create a detailed monthly budget for each category.
      Provide the output as plain text, and do not include any formatting or JSON structure.
    `;
  
    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      });
  
      // Get the raw response from OpenAI
      const budget = chatCompletion.choices[0].message.content.trim();
  
      // Wrap raw text in a JSON response for the frontend
      res.json({ budget });
    } catch (err) {
      console.error("Error generating budget:", err.message);
      res.status(500).json({ error: "Failed to generate budget. Please try again later." });
    }
  });  

const PORT = 8000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
