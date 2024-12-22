from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model_fertilizer = joblib.load('./model/fertilizer_model.pkl')
encoder_fertilizer = joblib.load('./model/encoder.pkl')
dataset = pd.read_csv('fertilizer.csv')

model_crop = joblib.load('fertilizer_model1.pkl')
encoder_crop = joblib.load('encoder1.pkl')

@app.route('/fertilizer-predict', methods=['POST'])
def fertilizer_predict():
    try:
        data = request.json

        input_data = pd.DataFrame(
            [[data['nitrogen'], data['phosphorus'], data['potassium'], 
              data['ph'], data['rainfall'], data['temperature'], 
              data['district'], data['soil'], data['croptype']]],
            columns=['Nitrogen', 'Phosphorus', 'Potassium', 'pH', 'Rainfall', 'Temperature', 'District_Name', 'Soil_color', 'Crop']
        )

        input_data_encoded = encoder_fertilizer.transform(input_data[['District_Name', 'Soil_color', 'Crop']])
        input_data_other = input_data[['Nitrogen', 'Phosphorus', 'Potassium', 'pH', 'Rainfall', 'Temperature']].values
        input_data_combined = pd.concat([pd.DataFrame(input_data_encoded.toarray()), pd.DataFrame(input_data_other)], axis=1)

        # Make a prediction
        predicted_fertilizer = model_fertilizer.predict(input_data_combined)

        # Return the result as JSON
        return jsonify({
            'RecommendedFertilizer': predicted_fertilizer[0]
        })
    except Exception as e:
        print(f'Error: {str(e)}')
        return jsonify({'error': str(e)})

# Route for crop recommendation prediction
@app.route('/crop-predict', methods=['POST'])
def crop_predict():
    try:
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

        # Preprocess input data as required by the crop model
        input_data = np.array([[nitrogen, phosphorus, potassium, humidity, moisture, temperature]])

        # Make prediction using the loaded model
        recommendation = model_crop.predict(input_data)

        response = {
            "soiltype": soiltype,
            "croptype": croptype,
            "nitrogen": nitrogen,
            "phosphorous": phosphorus,
            "potassium": potassium,
            "moisture": moisture,
            "humidity": humidity,
            "temperature": temperature,
            "recommendation": recommendation.tolist()  # Convert numpy array to list for JSON serialization
        }

        return jsonify(response)
    except Exception as e:
        print(f'Error: {str(e)}')
        return jsonify({'error': str(e)})

# Run the Flask app
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
