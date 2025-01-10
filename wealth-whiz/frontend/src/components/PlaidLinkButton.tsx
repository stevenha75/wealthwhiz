import React, { useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";

interface PlaidLinkButtonProps {
  onSuccess: () => void; // Callback to notify parent component when bank linking is successful
}

const PlaidLinkButton: React.FC<PlaidLinkButtonProps> = ({ onSuccess }) => {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  useEffect(() => {
    // Fetch link token from the backend
    const fetchLinkToken = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/create-link-token", {
          method: "POST",
        });
        const data = await response.json();
        setLinkToken(data.link_token);
      } catch (error) {
        console.error("Error fetching link token:", error);
      }
    };

    fetchLinkToken();
  }, []);

  const onSuccessHandler = async (publicToken: string, metadata: any) => {
    console.log("Public Token:", publicToken);

    // Exchange public token for access token
    try {
      const response = await fetch("http://localhost:8000/api/exchange-public-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_token: publicToken }),
      });
      const data = await response.json();
      console.log("Access Token:", data.access_token);

      // Fetch transactions
      await fetchTransactions(data.access_token);

      // Notify the parent component of success
      onSuccess();
    } catch (error) {
      console.error("Error exchanging public token:", error);
    }
  };

  const fetchTransactions = async (accessToken: string) => {
    try {
      const response = await fetch("http://localhost:8000/api/get-transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: accessToken }),
      });
      const data = await response.json();
      console.log("Transactions:", data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const { open, ready } = usePlaidLink({
    token: linkToken || "",
    onSuccess: onSuccessHandler, // Call the custom success handler
  });

  if (!linkToken) {
    return <div>Loading...</div>;
  }

  return (
    <button onClick={() => open()} disabled={!ready}>
      Link Bank Account
    </button>
  );
};

export default PlaidLinkButton;
