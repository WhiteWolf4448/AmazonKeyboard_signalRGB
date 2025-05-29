import QtQuick 2.0

Item {


    Button {
    text: "Connect to Python"
    onClicked: {
        discovery.AddDevice();  // Appel la fonction exposée côté JS
    }
}
}
