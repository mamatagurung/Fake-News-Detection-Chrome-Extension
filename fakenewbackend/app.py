from flask import Flask, request, jsonify
import joblib
import string
import re


from flask_cors import CORS
# Initialize the Flask application
app = Flask(__name__)


CORS(app) 
# Load the trained model and vectorizer
model = joblib.load('fake_news_model.pkl')  # Load your trained scikit-learn model
vectorizer = joblib.load('vectorizer.pkl')  # Load your fitted vectorizer

def preprocess(text):
    # Step 1: Lowercase the text
    text = text.lower()

    # Step 2: Remove punctuation
    text = text.translate(str.maketrans('', '', string.punctuation))

    # Step 3: Remove numbers (if necessary)
    text = re.sub(r'\d+', '', text)

    # Step 4: Remove extra whitespace
    text = ' '.join(text.split())

    # Step 5: Vectorize the text using the trained vectorizer
    processed_text = vectorizer.transform([text])  # Transform the text

    return processed_text

# Define a route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data.get('text', '')

    # Preprocess the input text
    processed_text = preprocess(text)

    # Make a prediction
    prediction = model.predict(processed_text)  # Use the model to predict
    confidence = model.predict_proba(processed_text).max()  # Get confidence score

    return jsonify({
        'prediction': 'Fake' if prediction[0] == 1 else 'Real',
        'confidence': confidence
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
