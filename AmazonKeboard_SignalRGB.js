// --- Métadonnées ---
export function Name() { return "Amazon basics Keyboard"; }
export function VendorId() { return 0x3938; }       // Remplace par ton vendor ID
export function ProductId() { return 0x1150; }      // Remplace par ton product ID
export function Publisher() { return "Frongus"; }
export function Documentation() { return ""; }
export function Size() { return [21,7]; }
export function ControllableParameters() {
  const params = [];
  for (let row = 0; row < map2.length; row++) {
    for (let col = 0; col < map2[row].length; col++) {
      let keyName = map2[row][col];
      if (keyName) {
        params.push({
          property: `key_${keyName}`,
          group: "keys",
          label: keyName,
          type: "color",
          default: "000000"
        });
      }
    }
  }
  return params;
}

// --- Variables globales ---
const LED_COUNT = 110;
const indices = [0, 1, 8, 9, 46, 47, 84, 85, 120, 121, 122, 123, 158, 159, 160, 161, 164, 165, 196, 197, 198, 199, 230, 231, 234, 235, 236, 237, 240, 241, 242, 243, 244, 245, 246, 247, 252, 253, 254, 255, 256, 257, 262, 263, 264, 265, 266, 267, 274, 275, 312, 313, 350, 351, 386, 387, 388, 389, 424, 425, 426, 427, 430, 431, 462, 463, 464, 465, 496, 497, 500, 501, 502, 503, 506, 507, 508, 509, 510, 511, 512, 513, 518, 519, 520, 521, 522, 523, 528, 529, 530, 531, 532, 533, 540, 541, 578, 579, 616, 617, 652, 653, 654, 655, 690, 691, 692, 693, 696, 697, 728, 729, 730, 731, 762, 763, 766, 767, 768, 769, 772, 773, 774, 775, 776, 777, 778, 779, 784, 785, 786, 787, 788, 789, 794, 795, 796, 797, 798, 799]
const map2 = [
    [ 	   'Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12','PrintScreen', 	'ScrollLock', 	'Pause'],
    ['M1', '²', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ')', '=', 'Backspace', 	'Insert', 		'Home', 		'PageUp', 		'NumLock',	'/_P', '*_P' ,'-_P'],
    ['M2', 'Tab', 'A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '^', '$', 'Enter_M', 	'Delete', 		'End', 			'PageDown', 	'7_P', 		'8_P', '9_P', '+_P'],
    ['M3', 'CapsLock', 'Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'ù', '*', 															'4_P', 		'5_P', '6_P'],
    ['M4', 'Shift_L', '<', 'W', 'X', 'C', 'V', 'B', 'N', '?', '.', ':', '!', 'Shift_R', 					'↑', 							'1_P', 		'2_P', '3_P'],
    ['M5', 'Ctrl_L', 'Win', 'Alt', 'Space', 'AltGr', 'Fn', 'Menu', 'Ctrl_R', 				'←', 			'↓', 			'→', 			'0_P', 				'._P', 'Enter']
];


// --- Fonction appelée après validation ---
export function Initialize() {
    // let found = false;
    // for (const iface of device.interfaces) {
    //     try {
    //         device.set_interface(iface.number);
    //         // Envoi d'une commande test (ex : un paquet vide ou spécifique)
    //         device.write(hexStringToByteArray("09210000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 64);
    //         console.log("Interface fonctionnelle trouvée:", iface.number);
    //         found = true;
    //         break;
    //     } catch (e) {
    //         console.log("Interface non fonctionnelle:", iface.number);
    //     }
    // }
    // if (!found) {
    //     console.error("Aucune interface fonctionnelle détectée");
    // }
	device.set_endpoint(0, 0x0006, 0x0001, 0x0001); // Assure que l'interface est correctement définie
}

// --- Fonction validation ---
export function Validate(endpoint) {
	return endpoint.interface === 0 && endpoint.usage === 0x0006 && endpoint.usage_page === 0x0001;
}


// Flatten la matrice en 1D (liste de touches)
function flattenMap2() {
    let keys = [];
    for(let row of map2) {
        keys = keys.concat(row);
    }
    return keys;
}

const keysFlat = flattenMap2();

function generateColorData() {
    let colors = [];
    for (let i = 0; i < LED_COUNT; i++) {
        let r = (i % 3 === 0) ? 255 : 0;
        let g = (i % 3 === 1) ? 255 : 0;
        let b = (i % 3 === 2) ? 255 : 0;
        colors.push(r, g, b);
    }
    return insererZeros(reorganizeColors(colors), indices);
}

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



// --- Envoie les couleurs au clavier ---
export function Render() {
	console.log("Device:", device);
    if (!device) {
    console.error("Device non initialisé");
	}

    const pad = (data, length) => {
        while (data.length < length) data.push(0);
        return data;
    };

    const reports = [
        pad(hexStringToByteArray("09210000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 64),
        pad(hexStringToByteArray("140100010103ffffff09000001000000034283"), 19),
        pad(hexStringToByteArray("09210000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 64),
        pad(hexStringToByteArray(generateColorData()), 400),
        pad(hexStringToByteArray("09220000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 64),
    ];
	device.write(reports[0], 64); // Envoi du premier rapport pour initialiser le clavier
	device.send_report(reports[1], 19);
	device.write(reports[2], 64);
	device.send_report(reports[3], 400);
	device.write(reports[4], 64);
}


function insererZeros(sequence, indices) {
    // sequence est un tableau ici, donc on copie simplement
    const sequenceListe = Array.isArray(sequence) ? [...sequence] : sequence.split("");

    // on trie les indices
    indices.sort((a, b) => a - b);

    for (const index of indices) {
        if (index < 0) throw new Error(`Index ${index} invalide : doit être ≥ 0`);
        if (index > sequenceListe.length) throw new Error(`Index ${index} hors limites : longueur max ${sequenceListe.length}`);
        sequenceListe.splice(index, 0, "0"); // insérer '0' à la position index
    }
    if (sequenceListe.length > 0) {
        sequenceListe[0] = '2';
    }
    return sequenceListe.join("");
}

function reorganizeColors(rgbArray) {
    const ledCount = rgbArray.length / 3;

    const reds = [];
    const greens = [];
    const blues = [];

    // Séparer les canaux
    for (let i = 0; i < ledCount; i++) {
        reds.push(rgbArray[i * 3]);
        greens.push(rgbArray[i * 3 + 1]);
        blues.push(rgbArray[i * 3 + 2]);
    }

    // Fonction utilitaire : convertit un entier [0-255] en hex sur 2 caractères
    const toHex = (n) => n.toString(16).padStart(2, '0');

    // Convertir chaque tableau en chaîne hex (2 chars par couleur)
    const redsHex = reds.map(toHex).join('');
    const greensHex = greens.map(toHex).join('');
    const bluesHex = blues.map(toHex).join('');

    // Concaténer dans l’ordre RRR... GGG... BBB...
    return redsHex + greensHex + bluesHex;
}

function hexStringToByteArray(hexString) {
    if (hexString.length % 2 !== 0) throw "Longueur hex invalide";
    const bytes = [];
    for (let i = 0; i < hexString.length; i += 2) {
        bytes.push(parseInt(hexString.substr(i, 2), 16));
    }
    return bytes;
}
