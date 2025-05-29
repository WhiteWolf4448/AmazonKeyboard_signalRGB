from flask import Flask, request

app = Flask(__name__)

@app.route('/set_color')
def set_color():
    color = request.args.get('color')
    print(f"Received color: {color}")
    # Ici tu mets ton code pour changer la couleur du clavier
    return "OK", 200

if __name__ == '__main__':
    app.run(port=5000)
