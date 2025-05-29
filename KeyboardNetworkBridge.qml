Item {
    property string pythonProcess: ""
    property bool connected: false



    Button {
        text: "Envoyer commande"
        enabled: connected
        onClicked: {
            // Exemple de communication via HTTP ou websocket
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://127.0.0.1:5000/do", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify({ action: "on" }));
        }
    }
}