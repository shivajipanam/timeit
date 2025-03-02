# backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)  # Enable CORS

# Get API key from environment variable or use a default for development
API_KEY = os.environ.get('NESSIE_API_KEY', '6cd820999961ca9408b6905214592126')
BASE_URL = 'http://api.nessieisreal.com'

@app.route('/api/atms', methods=['GET'])
def get_atms():
    """Get all ATM locations"""
    response = requests.get(f'{BASE_URL}/atms?key={API_KEY}')
    return jsonify(response.json())

    """Get mock ATM locations"""
    # return jsonify(MOCK_ATMS)

@app.route('/api/branches', methods=['GET'])
def get_branches():
    """Get all branch locations"""
    response = requests.get(f'{BASE_URL}/branches?key={API_KEY}')
    return jsonify(response.json())

    """Get mock branch locations"""
    # return jsonify({"data": []})  # Empty for brevity

@app.route('/api/customers', methods=['GET'])
def get_customers():
    """Get all customers"""
    response = requests.get(f'{BASE_URL}/customers?key={API_KEY}')
    return (jsonify(response.json()))

    """Get mock customers"""
    # return jsonify(MOCK_CUSTOMERS)

@app.route('/api/accounts/<customer_id>', methods=['GET'])
def get_accounts(customer_id):
    """Get accounts for a specific customer"""
    response = requests.get(f'{BASE_URL}/customers/{customer_id}/accounts?key={API_KEY}')
    return jsonify(response.json())

    """Get accounts for a specific customer"""
    # if customer_id in MOCK_ACCOUNTS:
    #     return jsonify(MOCK_ACCOUNTS[customer_id])
    # else:
    #     return jsonify({"data": []})

if __name__ == '__main__':
    app.run(debug=True)