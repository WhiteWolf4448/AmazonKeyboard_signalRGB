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

export function Initialize() {
    console.log("Initialisation du pont réseau Amazon K88");
	sendColorUpdate("ffffff")
}

exports.onUiReady = function(ui) {
    console.log("UI is ready");

    ui.connectRequested.connect(() => {
        console.log("Connect button pressed");
        connectToBridge();  // Appelle ta fonction qui fait une requête XHR
    });
};

function connectToBridge() {
    console.log("Trying to connect to bridge...");

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/test", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log("Bridge response:", xhr.responseText);
        }
    };
    xhr.send();
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

	this.IconUrl = 'data:image/png;base64,' + logo;
	this.connect = function (devices) {
		for (let i = 0; i < devices.length; i++) {
			this.AddDevice(devices[i]);
		}
	};

	this.removedDevices = function (deviceId) {
		let controller = service.getController(deviceId);
		if (controller !== undefined) {
			service.removeController(controller);
			service.suppressController(controller);
		}
	}

	this.AddDevice = function (device) {
		service.addController(new OpenRGBDevice(device));
	};

	this.Update = function () {
		return;
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