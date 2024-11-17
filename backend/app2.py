from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the trained model and the encoder
model_crop = joblib.load('fertilizer_model1.pkl')
encoder = joblib.load('encoder1.pkl')

@app.route('/fertilizer-predict', methods=['POST'])
def predict():
    data = request.json

    # Extract input data from the request
    soiltype = data.get("soiltype")
    croptype = data.get("croptype")
    nitrogen = data.get("nitrogen")
    phosphorus = data.get("phosphorus")
    potassium = data.get("potassium")
    moisture = data.get("moisture")
    humidity = data.get("humidity")
    temperature = data.get("temperature")
    # lang = data.get("lang")

    # Preprocess input data as required by your model
    # Assuming your model expects a numpy array of these features
    input_data = np.array([[nitrogen, phosphorus, potassium, humidity,  moisture, temperature]])

    # Make prediction using the loaded model
    recommendation = model.predict(input_data)

    response = {
        "soiltype": soiltype,
        "croptype": croptype,
        "nitrogen": nitrogen,
        "phosphorous": phosphorus,
        "pottasium": potassium,
        "moisture": moisture,
        "humidity": humidity,
        "temperature": temperature,
        # "lang": lang,
        # "recommendation": recommendation.tolist()  # Convert numpy array to list for JSON serialization
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
