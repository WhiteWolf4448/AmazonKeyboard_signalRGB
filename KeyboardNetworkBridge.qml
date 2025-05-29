import QtQuick 2.0
discovery.AddDevice();  // Appel la fonction exposée côté JS
Item {

    
    Button {
    text: "Connect to Python"
    onClicked: {
        discovery.AddDevice();  // Appel la fonction exposée côté JS
    }
}
}
