from flask import Flask, jsonify, request
import numpy as np
from flask_cors import CORS
import requests
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)  # Enable CORS


API_BASE_URL = "http://api.nessieisreal.com"
API_KEY = "6cd820999961ca9408b6905214592126"
OVERDRAFT_FEE = 35  # Assume a standard overdraft fee
INTEREST_RATE = 0.02 / 365  # Assume 2% annual interest rate, converted to daily
LATE_FEE = 25  # Assume a standard late fee for missing bill payments

def fetch_user_data(customer_id):
    response = requests.get(f"{API_BASE_URL}/customers/{customer_id}?key={API_KEY}")
    return response.json()
  
def fetch_accounts(customer_id):
    response = requests.get(f"{API_BASE_URL}/customers/{customer_id}/accounts?key={API_KEY}")
    return response.json()

def fetch_recent_salaries(customer_id):
    """Fetch only the past 4 months of salary deposits."""
    four_months_ago = (datetime.today() - timedelta(days=120)).strftime("%Y-%m-%d")
    response = requests.get(f"{API_BASE_URL}/accounts/{customer_id}/deposits?key={API_KEY}")
    deposits = response.json()
    # print(deposits)
    
    income_deposits = [dep for dep in deposits if dep["description"] == "income" and dep["transaction_date"] >= four_months_ago]
    if not income_deposits:
        return 0, []
    
    salary_dates = sorted(set(int(dep["transaction_date"].split("-")[2]) for dep in income_deposits))
    avg_salary = sum(dep["amount"] for dep in income_deposits) / len(income_deposits)
    return avg_salary, salary_dates

def fetch_recent_bills(customer_id):
    """Fetch bills from all accounts in the past 4 months."""
    accounts = fetch_accounts(customer_id)
    four_months_ago = (datetime.today() - timedelta(days=120)).date()  # Ensure it's a date object
    all_bills = []

    for account in accounts:
        response = requests.get(f"{API_BASE_URL}/accounts/{account['_id']}/purchases?key={API_KEY}")
        purchases = response.json()

        print("Four months ago:", four_months_ago)

        # Correct filtering of recent bills
        recent_bills = [bill for bill in purchases if datetime.strptime(bill["purchase_date"], "%Y-%m-%d").date() >= four_months_ago]

        # Debugging prints
        for bill in purchases:
            bill_date = datetime.strptime(bill["purchase_date"], "%Y-%m-%d").date()
            print(f"Recent Bill Date: {bill_date}")

        print("Recent bills:", recent_bills, "\n")

        all_bills.extend(recent_bills)  # Append filtered bills to all_bills

    return all_bills
    
# Iterative Dynamic Programming Approach to Optimize Bill Payments

def dp_optimize_bill_payments(accounts, salary, salary_dates, bills, days=30):
    """Uses iterative DP to optimize savings while ensuring overdraft fees are charged daily."""
    MAX_BALANCE = 10000  # Define the discretized balance range
    OVERDRAFT_FEE = 35
    INTEREST_RATE = 0.0001  # Assume small daily interest
    LATE_FEE = 25

    dp = np.full((days + 1, MAX_BALANCE * 2), -float('inf'))  # DP table: maximize savings
    initial_balance = int(round(sum(acc["balance"] for acc in accounts)))
    initial_index = MAX_BALANCE + initial_balance  # Shift index to allow negative balances

    dp[0][initial_index] = 0  # Start with zero additional savings
    decision_table = {}  # Store best decisions
    savings_table = {}  # Track savings

    for day in range(days):
        for balance_index in range(2 * MAX_BALANCE):
            if dp[day][balance_index] == -float('inf'):
                continue
            
            balance = balance_index - MAX_BALANCE  # Convert index back to actual balance
            current_savings = dp[day][balance_index]  # Current max savings
            
            # Carry balance forward with interest applied
            new_balance = balance + (balance * INTEREST_RATE)
            new_index = int(round(new_balance)) + MAX_BALANCE
            if 0 <= new_index < 2 * MAX_BALANCE:
                if current_savings > dp[day + 1][new_index]:
                    dp[day + 1][new_index] = current_savings
                    decision_table[(day + 1, new_index)] = "No payment made today."
                    savings_table[(day + 1, new_index)] = current_savings

            # Apply overdraft fee if the balance is negative
            if balance < 0:
                overdrafted_balance = balance - OVERDRAFT_FEE
                overdrafted_index = int(round(overdrafted_balance)) + MAX_BALANCE
                if 0 <= overdrafted_index < 2 * MAX_BALANCE:
                    new_savings = current_savings - OVERDRAFT_FEE
                    if new_savings > dp[day + 1][overdrafted_index]:
                        dp[day + 1][overdrafted_index] = new_savings
                        decision_table[(day + 1, overdrafted_index)] = "Overdraft fee applied."
                        savings_table[(day + 1, overdrafted_index)] = new_savings

            # Process salary deposits
            if day + 1 in [d - 1 for d in salary_dates]:
                deposit_balance = balance + salary
                deposit_index = int(round(deposit_balance)) + MAX_BALANCE
                if 0 <= deposit_index < 2 * MAX_BALANCE:
                    if current_savings > dp[day + 1][deposit_index]:
                        dp[day + 1][deposit_index] = current_savings
                        decision_table[(day + 1, deposit_index)] = "Salary deposited."
                        savings_table[(day + 1, deposit_index)] = current_savings

            # Process bill payments
            for bill in bills:
                bill_day = int(bill["purchase_date"].split("-")[2]) - 1
                if bill_day == day:
                    new_balance = balance - bill["amount"]
                    new_index = int(round(new_balance)) + MAX_BALANCE
                    if 0 <= new_index < 2 * MAX_BALANCE:
                        if current_savings > dp[day + 1][new_index]:
                            dp[day + 1][new_index] = current_savings
                            decision_table[(day + 1, new_index)] = f"Paid {bill['description']} on time."
                            savings_table[(day + 1, new_index)] = current_savings
                    else:
                        # Consider delaying payment (incurs a late fee)
                        late_balance = balance - LATE_FEE
                        late_index = int(round(late_balance)) + MAX_BALANCE
                        if 0 <= late_index < 2 * MAX_BALANCE:
                            new_savings = current_savings - LATE_FEE
                            if new_savings > dp[day + 4][late_index]:
                                dp[day + 4][late_index] = new_savings
                                decision_table[(day + 4, late_index)] = f"Delayed {bill['description']} by 3 days."
                                savings_table[(day + 4, late_index)] = new_savings
    
    # Extract the optimal schedule
    best_schedule = {}
    explanation = {}
    daily_savings = {}

    best_balance_index = max(range(2 * MAX_BALANCE), key=lambda x: dp[days][x])
    
    for day in range(days, 0, -1):
        if (day, best_balance_index) in decision_table:
            explanation[day] = decision_table[(day, best_balance_index)]
        best_schedule[day] = best_balance_index - MAX_BALANCE  # Convert index back to balance
        daily_savings[day] = savings_table.get((day, best_balance_index), 0)  # Fetch savings

    return best_schedule, daily_savings, explanation


@app.route('/optimize', methods=['GET'])
def optimize():
    # customer_id = request.args.get('customer_id')
    customer_id = "67c3fb219683f20dd518cf28"
    accounts = fetch_accounts(customer_id)
    salary, salary_dates = fetch_recent_salaries(accounts[0]['_id'])  # Use the first account's ID for salary
    bills = fetch_recent_bills(customer_id)
    
    optimized_schedule, daily_savings, explanation = dp_optimize_bill_payments(accounts, salary, salary_dates, bills)
    
    # Format the response for the frontend
    response = {
        'optimized_schedule': optimized_schedule,
        'daily_savings': daily_savings,
        'explanation': explanation,
        'total_savings': sum(daily_savings.values())
    }
    
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
    # app.run(debug=True)
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
    # customer_id = "67c3fb219683f20dd518cf28"
    # accounts = fetch_accounts(customer_id)
    # print("HIHIHIHIHI")
    # print(accounts[0])
    
    # salary, salary_dates = fetch_recent_salaries(accounts[0]['_id'])
    # bills = fetch_recent_bills(customer_id)
    
    # optimized_schedule, daily_savings, explanation = dp_optimize_bill_payments(accounts, salary, salary_dates, bills)
    
    # print("Optimized Payment Schedule:")
    # for day, balance in optimized_schedule.items():
    #     print(f"Day {day}: Balance = ${balance:.2f}, Daily Saving: ${daily_savings.get(day, 0):.2f}, Reason: {explanation.get(day, 'No reason available')}")
    
    # total_savings = sum(daily_savings.values())
    # print(f"Total Additional Savings: ${total_savings:.2f}")
