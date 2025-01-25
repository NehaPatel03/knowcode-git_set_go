from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)

# Enable CORS
CORS(app)

# Load the ML model, scaler, and encoders
model = pickle.load(open("model.pkl", "rb"))
scaler = pickle.load(open("scaler.pkl", "rb"))
label_encoders = pickle.load(open("label_encoders.pkl", "rb"))

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Parse JSON input
        data = request.json
        input_data = pd.DataFrame([data])

        # Preprocess input data
        for column, encoder in label_encoders.items():
            input_data[column] = encoder.transform(input_data[column])
        scaled_data = scaler.transform(input_data)

        # Make prediction
        prediction = model.predict(scaled_data)
        return jsonify({"prediction": prediction[0]})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
