import QtQuick 2.0
import QtQuick.Controls 2.0

Item {
    width: 200
    height: 100

    Button {
        text: "Connect"
        anchors.centerIn: parent
        onClicked: {
            console.log("Connect button clicked")
        }
    }
}
