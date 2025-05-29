import QtQuick 2.0
import "KeyboardNetworkBridge.js" as MyJS

Item {
    id: root

    property var device: model.modelData.obj
    property string myVar: ""

    // Instancie le service JS, en passant le root pour manipuler ses propriétés
    property var discovery: MyJS.DiscoveryService(root)

    Component.onCompleted: {
        MyJS.myJsFunction(root, root.device)  // passe root et device à ta fonction JS
    }

    Button {
        text: "Connect to Python"
        onClicked: {
            discovery.AddDevice();  // Appel la fonction JS exposée
        }
    }

    Timer {
        interval: 5000  // 5 secondes
        running: true
        repeat: false  // ne tourne qu’une fois
        onTriggered: {
            if (root.device) {
                console.log("Device connected:", root.device);
                discovery.AddDevice();
            } else {
                console.log("No device connected");
            }
        }
    }
}