export function Name() { return "Amazon K88 Network Bridge"; }
export function Version() { return "0.1.0"; }
export function Type() { return "network"; }
export function Publisher() { return "Frongus"; }
export function ControllableParameters() {
    return [
        { "property": "shutdownColor", "group": "lighting", "label": "Shutdown Color", "min": "0", "max": "360", "type": "color", "default": "#009bde" },
        { "property": "LightingMode", "group": "lighting", "label": "Lighting Mode", "type": "combobox", "values": ["Canvas", "Forced"], "default": "Canvas" },
        { "property": "forcedColor", "group": "lighting", "label": "Forced Color", "min": "0", "max": "360", "type": "color", "default": "#009bde" }
    ];
}

const LED_COUNT = 110;
const map2 = [
    ['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'PrintScreen', 'ScrollLock', 'Pause'],
    ['M1', '²', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ')', '=', 'Backspace', 'Insert', 'Home', 'PageUp', 'NumLock', '/_P', '*_P', '-_P'],
    ['M2', 'Tab', 'A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '^', '$', 'Enter_M', 'Delete', 'End', 'PageDown', '7_P', '8_P', '9_P', '+_P'],
    ['M3', 'CapsLock', 'Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'ù', '*', '4_P', '5_P', '6_P'],
    ['M4', 'Shift_L', '<', 'W', 'X', 'C', 'V', 'B', 'N', '?', '.', ':', '!', 'Shift_R', '↑', '1_P', '2_P', '3_P'],
    ['M5', 'Ctrl_L', 'Win', 'Alt', 'Space', 'AltGr', 'Fn', 'Menu', 'Ctrl_R', '←', '↓', '→', '0_P', '._P', 'Enter']
];


let protocol;
let deviceLedsPositions = [];
let allSubdeviceLedsPosition = [];
let uniqueSubdeviceLedPosition = [];
let subdeviceLedsCount = [];
let subdevices = [];

console.log("Chargement du pont réseau Amazon K88");
export function Initialize() {
    console.log("Initialisation du pont réseau Amazon K88");
    SetupChannel();
}

export function DiscoveryService() {
    console.log("Initialisation du pont réseau Amazon K88");
    sendColorUpdate("65421")
    sendColorUpdate("65421")
    sendColorUpdate("65421")
}

    function SetupChannel() {
		device.SetLedLimit(110);
		device.addChannel("Mon Device Python", 110);
	}


function sendColorUpdate(color) {

    const componentChannel = device.channel("Mon Device Python");

    let RGBData = componentChannel.getColors("Inline");


    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:5000/set_color?color=${encodeURIComponent(RGBData)}`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                device.log("Couleur envoyée avec succès");
            } else {
                device.log("Erreur en envoyant la couleur");
            }
        }
    };
    xhr.send();
}

export function Render() {
    console.log("Rendu du pont réseau Amazon K88");
    sendColorUpdate("ffffff")

}

export function Shutdown() {
    device.pause(250);
    let color = hexToRgb(shutdownColor);
    protocol.setColors(color[0], color[1], color[2]);
}

function flattenMap2() {
    let keys = [];
    for (let row of map2) {
        keys = keys.concat(row);
    }
    return keys;
}

const keysFlat = flattenMap2();

export function LedNames() {
    return keysFlat;
}

export function LedPositions() {
    let positions = [];
    for (let y = 0; y < map2.length; y++) {
        for (let x = 0; x < map2[y].length; x++) {
            positions.push([x, y]);
        }
    }
    return positions;
}


class MyDevice {
    constructor(device) {
        this.id = "monDeviceUniqueId";       // id unique
        this.name = "Mon Device Python";     // nom visible
        this.ledCount = 110;                   // nombre de LEDs (ou 1 si device simple)

        // Exemples de méthodes importantes que SignalRGB pourrait attendre :
        this.getName = function () {
            return this.name;
        };

        this.getId = function () {
            return this.id;
        };

        this.getLedCount = function () {
            return this.ledCount;
        };

        this.update = function () {
            // Mise à jour des couleurs / état du device, appelé régulièrement
            service.log(`Updating device ${this.name}`);

            // Ajout / mise à jour dans SignalRGB (comme dans OpenRGBDevice)
            const controller = service.getController(this.id);
            if (!controller) {
                service.addController(this);
                service.announceController(this);
                service.log(`Device ${this.name} ajouté`);
            } else {
                service.removeController(controller);
                service.suppressController(controller);
                service.addController(this);
                service.announceController(this);
                service.log(`Device ${this.name} mis à jour`);
            }
        };

        // Optionnel : méthode pour définir les couleurs des LEDs (en fonction de ton device)
        this.setColors = function (colors) {
            this.colors = colors;
            // code pour appliquer les couleurs (via python par exemple)
            this.update();
        };
    }
}
export function DiscoveryService() {

    this.Initialize = function () {
        service.log("Initializing Plugin!");
        service.log("Searching for WLED devices...");
    };


    this.Update = function () {
        return;
    };

    // Un device fixe défini une fois pour toutes
    const myDevice = new MyDevice();

    this.connect = function () {
        service.log("Connect called");
        // Ici tu pourrais lancer la connexion vers ton programme Python
        // et ensuite mettre à jour ton device ou autre
    };

    this.removedDevices = function (deviceId) {
        let controller = service.getController(deviceId);
        if (controller !== undefined) {
            service.removeController(controller);
            service.suppressController(controller);
            service.log(`Device ${deviceId} removed`);
        }
    };

    this.AddDevice = function () {
        service.addController(myDevice);
        service.log(`Device ${myDevice.name} added`);
        service.announceController(myDevice);
        service.log(`Device ${myDevice.name} added and announced`);
    };
}



function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const colors = [];
    colors[0] = parseInt(result[1], 16);
    colors[1] = parseInt(result[2], 16);
    colors[2] = parseInt(result[3], 16);
    return colors;
}

let logo = ''