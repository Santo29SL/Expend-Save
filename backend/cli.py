import requests
import json
import os

BASE_URL = 'http://localhost:5000/api'
TOKEN_FILE = 'token.txt'

def get_headers():
    if not os.path.exists(TOKEN_FILE):
        return {'Content-Type': 'application/json'}
    with open(TOKEN_FILE, 'r') as f:
        token = f.read().strip()
    return {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {token}'
    }

def print_response(response):
    try:
        print(json.dumps(response.json(), indent=2))
    except json.decoder.JSONDecodeError:
        print(response.text)

def register():
    print("\n--- Register User ---")
    username = input("Username: ")
    password = input("Password: ")
    salary = input("Monthly Salary: ")
    target_savings = input("Target Savings: ")
    
    data = {"username": username, "password": password, "monthlySalary": int(salary) if salary else 0, "targetSavings": int(target_savings) if target_savings else 0}
    response = requests.post(f"{BASE_URL}/users", json=data)
    
    if response.status_code == 201:
        print("Registration successful!")
        token = response.json().get('token')
        with open(TOKEN_FILE, 'w') as f:
            f.write(token)
    else:
        print("Registration failed!")
    print_response(response)

def login():
    print("\n--- Login ---")
    username = input("Username: ")
    password = input("Password: ")
    
    data = {"username": username, "password": password}
    response = requests.post(f"{BASE_URL}/users/login", json=data)
    
    if response.status_code == 200:
        print("Login successful!")
        token = response.json().get('token')
        with open(TOKEN_FILE, 'w') as f:
            f.write(token)
    else:
        print("Login failed!")
    print_response(response)

def get_me():
    print("\n--- Get My Profile ---")
    response = requests.get(f"{BASE_URL}/users/me", headers=get_headers())
    print_response(response)

def add_transaction():
    print("\n--- Add Transaction ---")
    desc = input("Description: ")
    amount = float(input("Amount: "))
    type_ = input("Type (income/expense): ")
    category = input("Category: ")
    
    data = {"description": desc, "amount": amount, "type": type_, "category": category}
    response = requests.post(f"{BASE_URL}/transactions", json=data, headers=get_headers())
    print_response(response)

def get_transactions():
    print("\n--- Get Transactions ---")
    response = requests.get(f"{BASE_URL}/transactions", headers=get_headers())
    print_response(response)

def get_schemes():
    print("\n--- Get All Schemes ---")
    response = requests.get(f"{BASE_URL}/schemes")
    print_response(response)

def calculate_returns():
    print("\n--- Calculate Returns ---")
    goal = float(input("Goal Amount: "))
    tenure = int(input("Tenure (Months): "))
    scheme_id = input("Scheme ID (get from 'Get All Schemes'): ")
    
    data = {"goalAmount": goal, "tenureMonths": tenure, "schemeId": scheme_id}
    response = requests.post(f"{BASE_URL}/schemes/calculate", json=data)
    print_response(response)

def get_ai_suggestion():
    print("\n--- Get AI Suggestion ---")
    goal = float(input("Goal Amount: "))
    tenure = int(input("Tenure (Months): "))
    risk = input("Risk Preference (Low/Medium/High): ")
    salary = float(input("Monthly Salary: "))
    
    data = {"goalAmount": goal, "tenureMonths": tenure, "riskPreference": risk, "salary": salary}
    response = requests.post(f"{BASE_URL}/ai/suggest", json=data, headers=get_headers())
    print_response(response)

def main():
    while True:
        print("\n=== Expend & Save CLI Tester ===")
        print("1. Register")
        print("2. Login")
        print("3. Get My Profile")
        print("4. Add Transaction")
        print("5. Get Transactions")
        print("6. Get All Investment Schemes")
        print("7. Calculate Scheme Returns")
        print("8. Get AI Suggestion")
        print("9. Exit")
        
        choice = input("Select an option: ")
        
        try:
            if choice == '1':
                register()
            elif choice == '2':
                login()
            elif choice == '3':
                get_me()
            elif choice == '4':
                add_transaction()
            elif choice == '5':
                get_transactions()
            elif choice == '6':
                get_schemes()
            elif choice == '7':
                calculate_returns()
            elif choice == '8':
                get_ai_suggestion()
            elif choice == '9':
                if os.path.exists(TOKEN_FILE):
                    os.remove(TOKEN_FILE)
                break
            else:
                print("Invalid choice")
        except requests.exceptions.ConnectionError:
            print("Error: Could not connect to the server. Is the Node.js backend running?")

if __name__ == "__main__":
    main()
