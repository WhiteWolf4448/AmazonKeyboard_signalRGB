import ctypes
import time
import msvcrt
import keyboard
import colorsys
import math
import sys
import asyncio
import websockets
import json


# Chargement de hid.dll
hid = ctypes.WinDLL("hid.dll")
kernel32 = ctypes.WinDLL("kernel32", use_last_error=True)

# Types
LPVOID = ctypes.c_void_p
HANDLE = ctypes.c_void_p
DWORD = ctypes.c_uint32
BOOL = ctypes.c_bool

# Signature de HidD_SetFeature
hid.HidD_SetFeature.argtypes = [HANDLE, LPVOID, DWORD]
hid.HidD_SetFeature.restype = BOOL

# Signature de WriteFile
kernel32.WriteFile.argtypes = [HANDLE, LPVOID, DWORD, ctypes.POINTER(DWORD), LPVOID]
kernel32.WriteFile.restype = BOOL


indices = [0, 1, 8, 9, 46, 47, 84, 85, 120, 121, 122, 123, 158, 159, 160, 161, 164, 165, 196, 197, 198, 199, 230, 231, 234, 235, 236, 237, 240, 241, 242, 243, 244, 245, 246, 247, 252, 253, 254, 255, 256, 257, 262, 263, 264, 265, 266, 267, 274, 275, 312, 313, 350, 351, 386, 387, 388, 389, 424, 425, 426, 427, 430, 431, 462, 463, 464, 465, 496, 497, 500, 501, 502, 503, 506, 507, 508, 509, 510, 511, 512, 513, 518, 519, 520, 521, 522, 523, 528, 529, 530, 531, 532, 533, 540, 541, 578, 579, 616, 617, 652, 653, 654, 655, 690, 691, 692, 693, 696, 697, 728, 729, 730, 731, 762, 763, 766, 767, 768, 769, 772, 773, 774, 775, 776, 777, 778, 779, 784, 785, 786, 787, 788, 789, 794, 795, 796, 797, 798, 799]

keys_main = [
    ['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'PrintScreen', 'ScrollLock', 'Pause'],
    ['²', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ')', '=', 'Backspace'],
    ['Tab', 'A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '^', '$'],
    ['CapsLock', 'Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'ù', '*','Enter_M'],
    ['Shift_L', '<', 'W', 'X', 'C', 'V', 'B', 'N', '?', '.', ':', '!', 'Shift_R'],
    ['Ctrl_L', 'Win', 'Alt', 'Space', 'AltGr',  'Fn', 'Menu', 'Ctrl_R']
]

keys_nav = [
    ['Insert', 'Home', 'PageUp'],
    ['Delete', 'End', 'PageDown'],
    ['↑'],
    ['←', '↓', '→']
]

keys_num = [
    ['NumLock', '/_P', '*_P', '-_P'],
    ['7_P', '8_P', '9_P', '+_P'],
    ['4_P', '5_P', '6_P'],
    ['1_P', '2_P', '3_P'],
    ['0_P', '._P', 'Enter']
]

keys_macro = ['M1', 'M2', 'M3', 'M4', 'M5']


map2 = [
    [      'Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',      'PrintScreen',  'ScrollLock',   'Pause'],
    ['M1', '²', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ')', '=', 'Backspace',          'Insert',       'Home',         'PageUp',       'NumLock', '/_P', '*_P', '-_P'],
    ['M2', 'Tab', 'A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '^', '$','Enter_M',           'Delete',       'End',          'PageDown',     '7_P',     '8_P', '9_P', '+_P'],
    ['M3', 'CapsLock', 'Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'ù', '*',                                                                '4_P',     '5_P', '6_P'],
    ['M4', 'Shift_L', '<', 'W', 'X', 'C', 'V', 'B', 'N', '?', '.', ':', '!', 'Shift_R',                           '↑',                            '1_P',     '2_P', '3_P'],
    ['M5', 'Ctrl_L', 'Win', 'Alt', 'Space', 'AltGr',  'Fn', 'Menu', 'Ctrl_R',                     '←',            '↓',            '→',            '0_P',            '._P', 'Enter']
]

print("Nombre de touches principales:", len(map2))

touches_actives = [
    'Esc',
    'F6',
    'PrintScreen',
    '²',
    '1',
    '2',
    '3',
    '4',
    '6',
    '7',
    '9',
    '0',
    '=',
    'CapsLock',
    '4_P',
    '↑',
    'Insert',
    'Backspace',
    'F1',
    'F7',
    'ScrollLock',
    'M1',
    'Tab',
    'A',
    'Z',
    '5',
    'Y',
    '8',
    'O',
    ')',
    '^',
    '/_P',
    '5_P',
    '↓',
    'Home',
    '*',
    'F2',
    'F8',
    'Pause',
    'M2',
    'NumLock',
    'Q',
    'E',
    'R',
    'G',
    'U',
    'L',
    'P',
    '$',
    '*_P',
    '6_P',
    '→',
    'PageUp',
    'Enter_M',
    'F3',
    'F9',
    'M3',
    'Shift_L',
    'W',
    'S',
    'T',
    'H',
    'I',
    '.',
    'M',
    'ù',
    '-_P',
    '+_P',
    '0_P',
    'PageDown',
    'Shift_R',
    'F4',
    'F10',
    'M4',
    'X',
    'D',
    'F',
    'B',
    'J',
    ':',
    '!',
    '<',
    '9_P',
    '3_P',
    '._P',
    'End',
    'Ctrl_R',
    'F5',
    'F11',
    'M5',
    'Win',
    'Alt',
    'C',
    'V',
    'N',
    'K',
    'AltGr',
    'Fn',
    'Menu',
    '8_P',
    '2_P',
    'Enter',
    'Delete',
    '←',
    'F12',
    'Ctrl_L',
    'Space',
    '?',
    '7_P',
    '1_P',
]

index_touches_actives = {t: i for i, t in enumerate(touches_actives)}

async def handler(websocket):
    async for message in websocket:
        print("Reçu du client :", message)
        try:
            data = json.loads(message)
            colors = data.get("colors")
            if colors:
                # Ici tu traites les couleurs, envoies au périph USB HID...
                print(f"Traitement des couleurs ({len(colors)} valeurs)")
                # Juste un ack simple pour l'exemple
                sendColor(data)
                await websocket.send(json.dumps({"status": "ok"}))
            else:
                await websocket.send(json.dumps({"status": "error", "message": "no colors"}))
        except Exception as e:
            await websocket.send(json.dumps({"status": "error", "message": str(e)}))

async def open_hid_device(path):
    GENERIC_READ = 0x80000000
    GENERIC_WRITE = 0x40000000
    OPEN_EXISTING = 3
    FILE_FLAG_OVERLAPPED = 0x40000000
    FILE_SHARE_READ = 1
    FILE_SHARE_WRITE = 2

    handle = kernel32.CreateFileW(
        path,
        GENERIC_READ | GENERIC_WRITE,
        FILE_SHARE_READ | FILE_SHARE_WRITE,
        None,
        OPEN_EXISTING,
        0,
        None
    )

    if handle == HANDLE(-1).value:
        raise OSError("Cannot open HID device")

    return handle

async def sendColor(hexstream):
    # Données brutes (extraites de ton code)
    req1 = bytes.fromhex("09210000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")     # 128 bytes
    req2 = bytes.fromhex("140100010103ffffff09000001000000034283")  # 83 bytes (Feature Report)
    req3 = bytes.fromhex("09210000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")
    req4 = bytes.fromhex(hexstream)  # Report ID 32, 400 bytes (Feature Report)
    req5 = bytes.fromhex("09220000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")

    # Envoi dans le bon ordre
    send_output_report(device, req1)
    time.sleep(0.01)
    send_feature_report(device, req2)
    time.sleep(0.01)
    send_output_report(device, req3)
    time.sleep(0.01)
    send_feature_report(device, req4)
    time.sleep(0.01)
    send_output_report(device, req5)
    time.sleep(0.01)


# Ouvre ton périphérique HID (chemin à adapter avec ton device path réel)
# Ex : r"\\?\hid#vid_XXXX&pid_XXXX#...#{...}"
path = r"\\?\hid#vid_3938&pid_1150&col06#6&d00621b&0&0005#{4d1e55b2-f16f-11cf-88cb-001111000030}"
device = open_hid_device(path)

async def send_output_report(handle, report: bytes):
    buf = ctypes.create_string_buffer(report)
    written = DWORD()
    success = kernel32.WriteFile(handle, buf, len(report), ctypes.byref(written), None)
    if not success:
        raise OSError("WriteFile failed")

async def send_feature_report(handle, report: bytes):
    buf = ctypes.create_string_buffer(report)
    success = hid.HidD_SetFeature(handle, buf, len(report))
    if not success:
        raise OSError("SetFeature failed")

async def inserer_zeros(sequence: str, indices: list[int]) -> str:
    sequence_liste = list(sequence)  # On travaille caractère par caractère
    for index in sorted(indices):
        if index < 0:
            raise IndexError(f"Index {index} invalide : doit être ≥ 0")
        if index > len(sequence_liste):
            raise IndexError(f"Index {index} hors limites : longueur max {len(sequence_liste)}")
        sequence_liste.insert(index, "0")
    if sequence_liste:
        sequence_liste[0] = '2'
    
    return ''.join(sequence_liste)

async def reorder_colors_by_physique_order(couleurs_arc, ordre_physique, index_touches_actives):
    """
    couleurs_arc : liste des couleurs dans l'ordre virtuel (ordre des touches actives)
    ordre_physique : liste des touches dans l'ordre physique
    index_touches_actives : dict touche -> index dans ordre virtuel
    """
    couleurs_reordonnees = [(0, 0, 0)] * len(couleurs_arc)

    # On crée un mapping inverse : index_virtuel -> touche
    # Pas nécessaire ici, mais pour comprendre, on veut trouver pour chaque position physique
    # l'index virtuel de la touche correspondante.

    for i, touche_physique in enumerate(ordre_physique):
        
        if touche_physique in index_touches_actives:
            idx_virtuel = index_touches_actives[touche_physique]
            couleurs_reordonnees[idx_virtuel] = couleurs_arc[i]
        else:
            couleurs_reordonnees.append((0, 0, 0))  # touche non active => LED éteinte

    return couleurs_reordonnees

async def couleurs_vers_sequence_hex(couleurs):
    r_hex = ''.join(f'{r:02x}' for r, _, _ in couleurs)
    g_hex = ''.join(f'{g:02x}' for _, g, _ in couleurs)
    b_hex = ''.join(f'{b:02x}' for _, _, b in couleurs)
    return r_hex + g_hex + b_hex

async def main():
    async with websockets.serve(handler, "localhost", 8765):
        print("Serveur WS lancé sur ws://localhost:8765")
        await asyncio.Future()  # run forever



if __name__ == "__main__":
    asyncio.run(main())

