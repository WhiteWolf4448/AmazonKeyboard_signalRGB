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

let protocol;
let deviceLedsPositions = [];
let allSubdeviceLedsPosition = [];
let uniqueSubdeviceLedPosition = [];
let subdeviceLedsCount = [];
let subdevices = [];

console.log("Chargement du pont réseau Amazon K88");
export function Initialize() {
    console.log("Initialisation du pont réseau Amazon K88");
    sendColorUpdate("65421")
    sendColorUpdate("65421")
    sendColorUpdate("65421")
}

export function DiscoveryService() {
    console.log("Initialisation du pont réseau Amazon K88");
    sendColorUpdate("65421")
    sendColorUpdate("65421")
    sendColorUpdate("65421")
}


function sendColorUpdate(color) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:5000/set_color?color=${encodeURIComponent(color)}`, true);
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


class MyDevice {
    constructor(device) {
        this.id = "monDeviceUniqueId";       // id unique
        this.name = "Mon Device Python";     // nom visible
        this.ledCount = 30;                   // nombre de LEDs (ou 1 si device simple)

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