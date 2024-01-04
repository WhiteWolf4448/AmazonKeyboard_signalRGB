export function Name() { return "AmazonBasics Gaming Keyboard"; }
export function VendorId() { return 0x3938; }
export function ProductId() { return 0x1150; }
export function Publisher() { return "Frongus"; }
export function Documentation() { return; }
export function Size() { return [24, 9]; }
export function DefaultPosition() { return [240, 120]; }
export function DefaultScale() { return 8.0; }
/* global
shutdownColor:readonly
LightingMode:readonly
forcedColor:readonly
*/
export function ControllableParameters() {
    return [
        { "property": "shutdownColor", "group": "lighting", "label": "Shutdown Color", "min": "0", "max": "360", "type": "color", "default": "#009bde" },
        { "property": "LightingMode", "group": "lighting", "label": "Lighting Mode", "type": "combobox", "values": ["Canvas", "Forced"], "default": "Canvas" },
        { "property": "forcedColor", "group": "lighting", "label": "Forced Color", "min": "0", "max": "360", "type": "color", "default": "#009bde" },
    ];
}

const vKeys =
    [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
        54,
        55,
        56,
        57,
        58,
        59,
        60,
        61,
        62,
        63,
        64,
        65,
        66,
        67,
        68,
        69,
        70,
        71,
        72,
        73,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        82,
        83,
        84,
        85,
        86,
        87,
        88,
        89,
        90,
        91,
        92,
        93,
        94,
        95,
        96,
        97,
        98,
        99,
        100,
        101,
        102,
        103,
        104,
        105,
        106,
        107
    ];

const vKeyNames =
    [

              "Esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",         "Print Screen", "Scroll Lock", "Pause Break",
        "G1", "²", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ")", "=", "Backspace",                 "Insert", "Home", "Page Up",          "NumLock", "Num /", "Num *", "Num -",
        "G2", "Tab",    "A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P", "^", "$",                            "Del", "End", "Page Down",           "Num 7", "Num 8", "Num 9", "Num +",
        "G3", "CapsLock", "Q", "S", "D", "F", "G", "H", "J", "K", "L", "ù", "*", "Enter",                                                           "Num 4", "Num 5", "Num 6",
        "G4", "Left Shift", "W", "X", "C", "V", "B", "N", ",", ";", ":", "!", "Right Shift",                            "Up Arrow",                 "Num 1", "Num 2", "Num 3", "Num Enter",
        "G5", "Left Ctrl", "Left Win", "Left Alt", "Space", "Right Alt", "Fn", "Menu", "Right Ctrl",     "Left Arrow", "Down Arrow", "Right Arrow", "Num 0", "Num .",
    ];

const vKeyPositions =
    [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 6],
        [0, 7],
        [0, 8],
        [0, 9],
        [0, 10],
        [0, 11],
        [0, 12],
        [0, 13],
        [0, 14],
        [0, 15],
        [0, 16],
        [0, 17],
        [0, 18],
        [0, 19],
        [0, 20],
        [0, 21],
        [0, 22],
        [0, 23],
        [0, 24],
        [0, 25],
        [0, 26],
        [0, 27],
        [0, 28],
        [0, 29],
        [0, 30],
        [0, 31],
        [0, 32],
        [0, 33],
        [0, 34],
        [0, 35],
        [0, 36],
        [0, 37],
        [0, 38],
        [0, 39],
        [0, 40],
        [0, 41],
        [0, 42],
        [0, 43],
        [0, 44],
        [0, 45],
        [0, 46],
        [0, 47],
        [0, 48],
        [0, 49],
        [0, 50],
        [0, 51],
        [0, 52],
        [0, 53],
        [0, 54],
        [0, 55],
        [0, 56],
        [0, 57],
        [0, 58],
        [0, 59],
        [0, 60],
        [0, 61],
        [0, 62],
        [0, 63],
        [0, 64],
        [0, 65],
        [0, 66],
        [0, 67],
        [0, 68],
        [0, 69],
        [0, 70],
        [0, 71],
        [0, 72],
        [0, 73],
        [0, 74],
        [0, 75],
        [0, 76],
        [0, 77],
        [0, 78],
        [0, 79],
        [0, 80],
        [0, 81],
        [0, 82],
        [0, 83],
        [0, 84],
        [0, 85],
        [0, 86],
        [0, 87],
        [0, 88],
        [0, 89],
        [0, 90],
        [0, 91],
        [0, 92],
        [0, 93],
        [0, 94],
        [0, 95],
        [0, 96],
        [0, 97],
        [0, 98],
        [0, 99],
        [0, 100],
        [0, 101],
        [0, 102],
        [0, 103],
        [0, 104],
        [0, 105],
        [0, 106],
        [0, 107]
    ];


export function LedNames() {
    return vKeyNames;
}

export function LedPositions() {
    return vKeyPositions;
}

export function Initialize() {
    //initpacket1();
}

export function Render() {
    SendPacket();
}

export function Shutdown() {
    SendPacket(true);
}

function initpacket1()
{

}
function waitForInterruptIn() {
    return new Promise((resolve, reject) => {
        // Code pour écouter interrupt IN
        // Resolve le promise une fois l'interrupt IN reçu
    });
}

function SendPacket(shutdown = false) {

    let packet = [];
    packet[0] = 0x21;
    packet[1] = 0x09;
    packet[2] = 0x20;
    packet[3] = 0x03;
    packet[4] = 0x00;
    packet[5] = 0x00;
    packet[6] = 0x90;
    packet[7] = 0x01;
    packet[8] = 0x20;


	for(let iIdx = 0; iIdx < vKeyPositions.length; iIdx++)
  {

		let iPxX = vKeyPositions[iIdx][0];
		let iPxY = vKeyPositions[iIdx][1];
		var color;

		if(shutdown)
    {
			color = hexToRgb(shutdownColor);
		}
    else if (LightingMode === "Forced") 
    {
			color = hexToRgb(forcedColor);
		}
    else
    {
			color = device.color(iPxX, iPxY);
		}

		let iLedIdx = (iIdx*3) + 14;
		packet[iLedIdx] = color[0];
		packet[iLedIdx+1] = color[1];
		packet[iLedIdx+2] = color[2];
	}
    device.write(packet, 407);
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const colors = [];
    colors[0] = parseInt(result[1], 16);
    colors[1] = parseInt(result[2], 16);
    colors[2] = parseInt(result[3], 16);

    return colors;
}

export function Validate(endpoint) {
	return endpoint.interface === 0 && endpoint.usage ===  0xFF19 && endpoint.usage_page === 0xFF19;
}

export function ImageUrl() {
    return "https://github.com/WhiteWolf4448/AmazonKeyboard_signalRGB/blob/main/outfile.png?raw=true";
}
