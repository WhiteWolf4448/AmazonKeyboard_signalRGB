import QtQuick 2.0

Item {
    function applyColorFrame(colors) {
        // Cette fonction est appelée automatiquement par SignalRGB à chaque frame d’effet
        // Tu peux envoyer les couleurs à ton programme Python ici
        for (var i = 0; i < colors.length; i++) {
            console.log("LED " + i + ": " + colors[i].r + "," + colors[i].g + "," + colors[i].b);
        }
    }

    Component.onCompleted: {
        console.log("PythonDevice chargé !");
        // Tu peux aussi lancer le script Python ici si tu veux
        // Exemple : service.startProcess("python3", ["server.py"]);
    }
}
