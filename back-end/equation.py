import numpy as np
from datetime import datetime, timedelta

# Define User Data Class
class User:
    def __init__(self, salary, salary_date, accounts, bills):
        self.salary = salary  # Monthly salary amount
        self.salary_date = salary_date  # Date salary is received (e.g., 16th)
        self.accounts = accounts  # List of accounts (savings, checking, etc.)
        self.bills = bills  # List of fixed-cost bills

# Define Account Class
class Account:
    def __init__(self, balance, interest_rate, overdraft_fee, min_balance=0):
        self.balance = balance  # Current account balance
        self.interest_rate = interest_rate / 365  # Convert annual to daily rate
        self.overdraft_fee = overdraft_fee  # Fee if overdraft occurs
        self.min_balance = min_balance  # Minimum required balance

# Define Bill Class
class Bill:
    def __init__(self, name, amount, due_date, late_fee=0, interest_rate=0, flexibility=0):
        self.name = name  # Bill name (e.g., rent, credit card)
        self.amount = amount  # Fixed bill amount
        self.due_date = due_date  # Day of the month it's due
        self.late_fee = late_fee  # Late payment fee (if any)
        self.interest_rate = interest_rate / 365  # Convert annual to daily rate
        self.flexibility = flexibility  # Days bill can be shifted

# Simulate Daily Cash Flow to Compute Interest

def simulate_cash_flow(user, days=30):
    daily_balance = np.zeros(days)
    
    # Initialize balance with the sum of all accounts
    total_balance = sum(acc.balance for acc in user.accounts)
    salary_day = user.salary_date - 1  # Convert to zero-based index
    
    for day in range(days):
        # Add salary on the designated day
        if day == salary_day:
            total_balance += user.salary
        
        # Deduct bills due that day
        for bill in user.bills:
            if bill.due_date - 1 == day:  # Convert to zero-based index
                total_balance -= bill.amount
                
        # Store daily balance
        daily_balance[day] = total_balance
    
    # Compute interest earned per day (only positive balances earn interest)
    total_interest = sum(
        max(0, daily_balance[day]) * user.accounts[0].interest_rate for day in range(days)
    )
    
    return daily_balance, total_interest

# Optimize Bill Payment Dates

def optimize_bill_dates(user):
    best_schedule = {}
    max_savings = 0
    original_interest = simulate_cash_flow(user)[1]
    
    # Try shifting each bill within its flexibility range
    for bill in user.bills:
        best_date = bill.due_date
        for shift in range(-bill.flexibility, bill.flexibility + 1):
            temp_user = User(user.salary, user.salary_date, user.accounts, user.bills.copy())
            temp_user.bills[temp_user.bills.index(bill)].due_date += shift
            new_interest = simulate_cash_flow(temp_user)[1]
            savings = new_interest - original_interest
            
            if savings > max_savings:
                max_savings = savings
                best_date = bill.due_date + shift
                
        best_schedule[bill.name] = best_date
    
    return best_schedule, max_savings

# Example Usage
if __name__ == "__main__":
    accounts = [Account(balance=5000, interest_rate=0.02, overdraft_fee=35)]
    bills = [
        Bill("Rent", 1200, 13, flexibility=3),
        Bill("Credit Card", 300, 20, flexibility=5),
        Bill("Loan", 500, 5, flexibility=2)
    ]
    
    user = User(salary=4000, salary_date=16, accounts=accounts, bills=bills)
    optimized_schedule, savings = optimize_bill_dates(user)
    
    print("Optimized Payment Schedule:")
    for bill, date in optimized_schedule.items():
        print(f"{bill}: Pay on {date}th")
    
    print(f"Total Additional Savings: ${savings:.2f}")
