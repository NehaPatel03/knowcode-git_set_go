from flask import Flask, request, jsonify
from flask_cors import CORS  # Import Flask-CORS
import pickle
import numpy as np

# Load model, scaler, and label encoders
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

with open('label_encoders.pkl', 'rb') as f:
    label_encoders = pickle.load(f)

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse JSON request data
        data = request.json
        age = int(data['age'])
        state = label_encoders['STATE'].transform([data['state']])[0]
        annual_income = int(data['annual_income'])
        caste = label_encoders['CASTE'].transform([data['caste']])[0]
        gender = label_encoders['GENDER'].transform([data['gender']])[0]
        sector = label_encoders['SECTOR'].transform([data['sector']])[0]

        # Standardize numerical inputs
        scaled_features = scaler.transform([[age, annual_income]])[0]

        # Combine all features for the model
        features = np.hstack([scaled_features, state, caste, gender, sector])
        features = features.reshape(1, -1)

        # Make prediction
        prediction = model.predict(features)[0]

        # Return prediction as JSON
        return jsonify({"recommended_scheme": prediction})
    except Exception as e:
        # Return the error message in the response
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    # Enable debug mode and run the app
    app.run(debug=True)
