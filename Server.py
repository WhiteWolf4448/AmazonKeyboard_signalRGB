import subprocess
import time
import os

SCRIPT_PATH = r"render.py"
LOG_PATH = "log.txt"

while True:
    print("[INFO] Lancement du script Python...")

    with open(LOG_PATH, "a") as log_file:
        process = subprocess.Popen(
            ["pythonw", SCRIPT_PATH],
            stdout=log_file,
            stderr=log_file
        )
        process.wait()

    print("[WARN] Le script s'est arrêté. Relance dans 3 secondes...")
    time.sleep(3)
