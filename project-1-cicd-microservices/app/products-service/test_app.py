from app import app
import json

def test_health_check():
    client = app.test_client()
    response = client.get('/health')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data["status"] == "UP"

def test_get_products():
    client = app.test_client()
    response = client.get('/api/products')
    assert response.status_code == 200
    products = json.loads(response.data)
    assert len(products) >= 1
    assert "name" in products[0]
