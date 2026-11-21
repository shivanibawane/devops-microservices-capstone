const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;
const PRODUCTS_URL = process.env.PRODUCTS_SERVICE_URL || 'http://localhost:5001';
const CART_URL = process.env.CART_SERVICE_URL || 'http://localhost:5002';

app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', service: 'frontend', timestamp: new Date() });
});

app.get('/', async (req, res) => {
    try {
        let products = [];
        try {
            const response = await axios.get(`${PRODUCTS_URL}/api/products`, { timeout: 2000 });
            products = response.data;
        } catch (e) {
            products = [{ id: 1, name: 'Sample Item (fallback)', price: 9.99 }];
        }

        const itemsHtml = products.map(p => `
            <div style="border:1px solid #ddd; padding:12px; margin:8px; border-radius:6px; display:inline-block; width:200px;">
                <h3>${p.name}</h3>
                <p>Price: $${p.price}</p>
                <button onclick="alert('Item added!')">Add to Cart</button>
            </div>
        `).join('');

        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>DevOps Capstone Store</title>
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 40px; background: #f9fafb; color: #111827; }
                    header { background: #1e293b; color: white; padding: 20px; border-radius: 8px; }
                    .catalog { margin-top: 20px; display: flex; flex-wrap: wrap; }
                    .badge { background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
                </style>
            </head>
            <body>
                <header>
                    <h1>DevOps Capstone Store</h1>
                    <span class="badge">Production Ready</span>
                </header>
                <h2>Featured Products</h2>
                <div class="catalog">${itemsHtml}</div>
            </body>
            </html>
        `);
    } catch (err) {
        res.status(500).send('Frontend render error');
    }
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Frontend service listening on port ${PORT}`);
    });
}

module.exports = app;
