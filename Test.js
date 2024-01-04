const HID = require('node-hid');

// Liste tous les périphériques HID connectés
const devices = HID.devices();

// Parcourir et imprimer les détails de chaque périphérique
devices.forEach(device => {
    console.log(`Périphérique trouvé: ${device.product}`);
    console.log(`  Fabricant: ${device.manufacturer}`);
    console.log(`  ID du Périphérique: ${device.vendorId} ${device.productId}`);
    console.log(`  Chemin: ${device.path}`);
    console.log(`  Numéro de Série: ${device.serialNumber}`);
    console.log(`  Classe de Périphérique: ${device.interface}`);
    // Affiche le rapport HID pour examiner les usage pages et usages (si disponible)
    if(device.usagePage || device.usage) {
        console.log(`  Usage Page: ${device.usagePage}`);
        console.log(`  Usage: ${device.usage}`);
    }
    console.log('');
});

const usb = require('usb');

usb.getDeviceList().forEach(device => {
  console.log(`Device: ${device.deviceDescriptor.idVendor}:${device.deviceDescriptor.idProduct}`);

  try {
    device.open();
    device.interfaces.forEach(interface => {
      console.log(` Interface: ${interface.descriptor.bInterfaceNumber}`);
      interface.endpoints.forEach(endpoint => {
        console.log(`   Endpoint: ${endpoint.descriptor.bEndpointAddress}`);
      });
    });
    device.close();
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
});
