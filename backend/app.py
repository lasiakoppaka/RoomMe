from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello from RoomMe!"

@app.route('/match', methods=['POST'])
def match():
    data = request.get_json()
    age = data.get('age')
    cleanliness = data.get('cleanliness')
    bedtime = data.get('bedtime')

    # 🧠 Simple logic: if cleanliness is high and bedtime is not too late, it’s a good match
    is_match = cleanliness >= 7 and bedtime <= 23

    return jsonify({
        'match': is_match,
        'message': "Great match!" if is_match else "Not a great match."
    })

if __name__ == '__main__':
    app.run(debug=True)

