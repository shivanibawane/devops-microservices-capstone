from flask import Flask, jsonify
import os

app = Flask(__name__)

PRODUCTS = [
    {"id": 1, "name": "DevOps Handbook (Hardcover)", "price": 34.99, "category": "Books"},
    {"id": 2, "name": "Docker & Kubernetes Pro Mug", "price": 14.50, "category": "Merch"},
    {"id": 3, "name": "Mechanical Keyboard (RGB)", "price": 89.00, "category": "Hardware"},
    {"id": 4, "name": "Terraform Cloud Pin", "price": 5.00, "category": "Swag"}
]

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "UP", "service": "products-service"}), 200

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(PRODUCTS), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port)
