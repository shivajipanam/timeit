const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const NESSIE_API_KEY = 'your_api_key_here';
const NESSIE_BASE_URL = 'http://api.nessieisreal.com';

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, accountId } = req.body;
    if (!username || !accountId) {
        return res.status(400).json({ error: 'Username and account ID are required' });
    }

    try {
        // Fetch customer associated with the account ID
        const accountResponse = await axios.get(${NESSIE_BASE_URL}/accounts/${accountId}/customer?key=${NESSIE_API_KEY});
        const customerId = accountResponse.data ? accountResponse.data._id : null;

        if (!customerId) {
            return res.status(404).json({ error: 'Account not found or no customer associated' });
        }

        // Fetch customer details
        const customerResponse = await axios.get(${NESSIE_BASE_URL}/customers/${customerId}?key=${NESSIE_API_KEY});
        const customer = customerResponse.data;

        if (customer && customer.first_name.toLowerCase() === username.toLowerCase()) {
            return res.json({ success: true, message: 'Login successful' });
        } else {
            return res.status(401).json({ error: 'Invalid username or account ID' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred', details: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(Server running on port ${PORT});
});