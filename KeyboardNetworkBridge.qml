import QtQuick 2.0

Item {


    Button {
    text: "Connect to Python"
    onClicked: {
        service.Initialize();  // Appel la fonction exposée côté JS
    }
}
}
