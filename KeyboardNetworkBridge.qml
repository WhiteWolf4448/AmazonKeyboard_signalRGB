import QtQuick 2.0

Item {

    
    Button {
    text: "Connect to Python"
    onClicked: {
        discovery.AddDevice();  // Appel la fonction exposée côté JS
    }
    
}
    Timer {
        interval: 5000  // 5 secondes
        running: true
        repeat: false  // ne tourne qu’une fois
        onTriggered: {
                discovery.AddDevice();

        }
}
}