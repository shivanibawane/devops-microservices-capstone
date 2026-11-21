const express = require('express');
const app = express();

const PORT = process.env.PORT || 5002;
app.use(express.json());

// In-memory cart store
const cartStore = {};

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', service: 'cart-service', items_in_store: Object.keys(cartStore).length });
});

app.get('/api/cart/:userId', (req, res) => {
    const userId = req.params.userId;
    res.status(200).json({ userId, items: cartStore[userId] || [] });
});

app.post('/api/cart/:userId', (req, res) => {
    const userId = req.params.userId;
    const item = req.body;
    if (!cartStore[userId]) {
        cartStore[userId] = [];
    }
    cartStore[userId].push(item);
    res.status(201).json({ message: 'Item added', cart: cartStore[userId] });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Cart service listening on port ${PORT}`);
    });
}

module.exports = app;
