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


export function DiscoveryService() {


    this.Update = function () {
		return;
	};

    // Un device fixe défini une fois pour toutes
    const myDevice = {
        id: "pythonDevice1",        // un id unique fixe
        name: "Mon Device Python",  // nom visible dans SignalRGB
        ledCount: 110,               // nombre de LEDs à gérer (exemple)
        leds: [],                   // tableau des LEDs (vide ou prérempli)
        // Ajoute d'autres propriétés si besoin
    };

    this.connect = function() {
        service.log("Connect called");
        // Ici tu pourrais lancer la connexion vers ton programme Python
        // et ensuite mettre à jour ton device ou autre
    };

    this.removedDevices = function(deviceId) {
        let controller = service.getController(deviceId);
        if (controller !== undefined) {
            service.removeController(controller);
            service.suppressController(controller);
            service.log(`Device ${deviceId} removed`);
        }
    };

    this.AddDevice = function() {
        service.addController(myDevice);
        service.log(`Device ${myDevice.name} added`);
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