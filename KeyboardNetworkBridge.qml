import QtQuick 2.0

Item {

    discovery.AddDevice();  // Appel la fonction exposée côté JS
    Button {
    text: "Connect to Python"
    onClicked: {
        discovery.AddDevice();  // Appel la fonction exposée côté JS
    }
}
}
