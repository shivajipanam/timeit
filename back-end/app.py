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


# # Mock data for development
# MOCK_ATMS = {
#     "data": [
#         {
#             "_id": "atm1",
#             "name": "Capital One ATM - Downtown",
#             "address": {
#                 "street_number": "123",
#                 "street_name": "Main St",
#                 "city": "Chicago",
#                 "state": "IL"
#             },
#             "accessibility": "24/7 Access",
#             "amount_left": 5000.00
#         },
#         {
#             "_id": "atm2",
#             "name": "Capital One ATM - University",
#             "address": {
#                 "street_number": "456",
#                 "street_name": "Campus Dr",
#                 "city": "Urbana",
#                 "state": "IL"
#             },
#             "accessibility": "Lobby Hours Only",
#             "amount_left": 12500.00
#         }
#     ]
# }

# MOCK_CUSTOMERS = {
#     "data": [
#         {
#             "_id": "cust1",
#             "first_name": "John",
#             "last_name": "Doe",
#             "address": {
#                 "street_number": "100",
#                 "street_name": "Market St",
#                 "city": "Chicago",
#                 "state": "IL"
#             }
#         },
#         {
#             "_id": "cust2",
#             "first_name": "Jane",
#             "last_name": "Smith",
#             "address": {
#                 "street_number": "200",
#                 "street_name": "State St",
#                 "city": "Champaign",
#                 "state": "IL"
#             }
#         }
#     ]
# }

# MOCK_ACCOUNTS = {
#     "cust1": {
#         "data": [
#             {
#                 "_id": "acc1",
#                 "type": "Checking",
#                 "nickname": "Primary Checking",
#                 "balance": 5432.10,
#                 "rewards": 0
#             },
#             {
#                 "_id": "acc2",
#                 "type": "Savings",
#                 "nickname": "Emergency Fund",
#                 "balance": 12345.67,
#                 "rewards": 0
#             }
#         ]
#     },
#     "cust2": {
#         "data": [
#             {
#                 "_id": "acc3",
#                 "type": "Credit Card",
#                 "nickname": "Rewards Card",
#                 "balance": 1250.00,
#                 "rewards": 5000
#             }
#         ]
#     }
# }

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
    print("HIHIHIHIHIHIHIHI")
    print(jsonify(response.json))
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