from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load the trained model and the encoder
model_fertilizer = joblib.load('./model/fertilizer_model.pkl')
encoder = joblib.load('./model/encoder.pkl')
dataset = pd.read_csv('fertilizer.csv')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the data from the POST request
        data = request.json

        # Map the input keys to match the expected DataFrame columns
        input_data = pd.DataFrame(
            [[data['nitrogen'], data['phosphorus'], data['potassium'], 
                data['ph'], data['rainfall'], data['temperature'], 
                data['district'], data['soil'], data['croptype']]],
            columns=['Nitrogen', 'Phosphorus', 'Potassium', 'pH', 'Rainfall', 'Temperature', 'District_Name', 'Soil_color', 'Crop']
        )

        # Encode the categorical columns
        input_data_encoded = encoder.transform(input_data[['District_Name', 'Soil_color', 'Crop']])
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
    
# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
