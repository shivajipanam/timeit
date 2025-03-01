# back-end/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# You can set these as environment variables in production
CUSTOMER_ID = os.environ.get('NESSIE_CUSTOMER_ID', 'your_customer_id_here')
API_KEY = os.environ.get('NESSIE_API_KEY', 'your_api_key_here')

@app.route('/api/create-account', methods=['POST'])
def create_account():
    # Get account details from frontend request
    account_data = request.json
    
    # Base URL for the Nessie API
    url = f'http://api.reimaginebanking.com/customers/{CUSTOMER_ID}/accounts?key={API_KEY}'
    
    # Prepare payload
    payload = {
        "type": account_data.get('type', 'Savings'),
        "nickname": account_data.get('nickname', 'New Account'),
        "rewards": account_data.get('rewards', 0),
        "balance": account_data.get('balance', 0)
    }
    
    # Make request to Nessie API
    response = requests.post(
        url,
        data=json.dumps(payload),
        headers={'content-type': 'application/json'}
    )
    
    # Return response to frontend
    return jsonify({
        'status': response.status_code,
        'message': 'Account created' if response.status_code == 201 else 'Failed to create account',
        'data': response.json() if response.status_code == 201 else None
    }), response.status_code

@app.route('/api/test-connection', methods=['GET'])
def test_connection():
    return jsonify({'message': 'Backend is connected'}), 200

if __name__ == '__main__':
    app.run(debug=True)