// --- Métadonnées ---
export function Name() { return "MonClavierPlugin"; }
export function VendorId() { return 0x1234; }       // Remplace par ton vendor ID
export function ProductId() { return 0x5678; }      // Remplace par ton product ID
export function Publisher() { return "Moi"; }
export function Documentation() { return ""; }
export function Size() { return [1,1]; }
export function ControllableParameters() { return []; }

// --- Variables globales ---
const LED_COUNT = 110;
indices = [0, 1, 8, 9, 46, 47, 84, 85, 120, 121, 122, 123, 158, 159, 160, 161, 164, 165, 196, 197, 198, 199, 230, 231, 234, 235, 236, 237, 240, 241, 242, 243, 244, 245, 246, 247, 252, 253, 254, 255, 256, 257, 262, 263, 264, 265, 266, 267, 274, 275, 312, 313, 350, 351, 386, 387, 388, 389, 424, 425, 426, 427, 430, 431, 462, 463, 464, 465, 496, 497, 500, 501, 502, 503, 506, 507, 508, 509, 510, 511, 512, 513, 518, 519, 520, 521, 522, 523, 528, 529, 530, 531, 532, 533, 540, 541, 578, 579, 616, 617, 652, 653, 654, 655, 690, 691, 692, 693, 696, 697, 728, 729, 730, 731, 762, 763, 766, 767, 768, 769, 772, 773, 774, 775, 776, 777, 778, 779, 784, 785, 786, 787, 788, 789, 794, 795, 796, 797, 798, 799]
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

}

// --- Fonction validation ---
export function Validate(endpoint) {
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
    return insererZeros(colors, indices);
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
    const colorData = generateColorData(); // retourne un tableau de 330 octets (RGB)

    const pad = (data, length) => {
        while (data.length < length) data.push(0);
        return data;
    };

    return {
        reports: [
            { endpoint: 0, data: pad(["09210000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"], 64) },
            { endpoint: 0, data: pad(["140100010103ffffff09000001000000034283"], 19) },
            { endpoint: 0, data: pad(["09210000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"], 64) },
            { endpoint: 0, data: pad(colorData, 400) },
            { endpoint: 0, data: pad(["09220000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"], 64) }
        ]
    };
}


function insererZeros(sequence, indices) {
    const sequenceListe = sequence.split(""); // Convertir en tableau de caractères

    // Trier les indices pour insérer dans l'ordre croissant
    const sortedIndices = [...indices].sort((a, b) => a - b);

    for (let i = 0; i < sortedIndices.length; i++) {
        const index = sortedIndices[i];

        if (index < 0) {
            throw new Error(`Index ${index} invalide : doit être ≥ 0`);
        }
        if (index > sequenceListe.length) {
            throw new Error(`Index ${index} hors limites : longueur max ${sequenceListe.length}`);
        }

        sequenceListe.splice(index, 0, "0"); // Insertion de "0" à l'index donné
    }

    if (sequenceListe.length > 0) {
        sequenceListe[0] = "2";
    }

    return sequenceListe.join("");
}

