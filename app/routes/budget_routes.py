from flask import Blueprint, request, jsonify

budget_bp = Blueprint('budget', __name__)

@budget_bp.route('/budget/create', methods=['POST'])
def create_budget():
    data = request.get_json()
    salary = data.get('salary')  # User's salary input
    percentages = data.get('percentages')  # Budget categories and percentages

    # Calculate the budget
    budget = {}
    for category, percentage in percentages.items():
        budget[category] = (salary * percentage) / 100

    return jsonify(budget), 200
