/*!
 * Thorium QRCode Generator Plugin
 * Version 4.0 January, 2024
 * framework7 v8.x (https://framework7.io) MIT Licensed
 * based on the node-qrcode source code written by soldair and released under MIT license
 * source: https://github.com/soldair/node-qrcode
 * Copyright 2018-2024 Thorium builder, All Rights Reserved.
 */

var nodeQrcode = {
  name: "QRCode Generator",
  bundleid: "com.thorium.qrcode.generator",
  version: "4.0.0",
  initialize: function () {
    var x = document.querySelectorAll(".qrcode");
    for (var i = 0; i < x.length; i++) {
      var elt = x[i];
      thoriumapi.logEvent(0, "[com.thorium.qrcode.generator] Initializing QRCode " + elt.id);
      var text = elt.getAttribute("data-plugin-text") || "";
      if (text.length == 0) {
        thoriumapi.logEvent(0, "[com.thorium.qrcode.generator] No Text specified for QRCode Plugin with ID " + elt.id);
      } else {
        nodeQrcode.drawQR(elt, text);
      }
    }
  },
  drawQR: function (elt, text) {
    var mode = elt.getAttribute("data-plugin-mode") || "Auto"; //Numeric || Alphanumeric || Byte ||Kanji
    var errorCorrectionLevel = elt.getAttribute("data-plugin-error-correction-level") || "Medium"; //Low Medium Quartile High
    var light = elt.getAttribute("data-plugin-color-light") || "#ffffff";
    var dark = elt.getAttribute("data-plugin-color-dark") || "#000000";
    var textdata;
    if (mode !== 'Auto') { 
      textdata=[{ data: text, mode: mode }];
    } else {
      textdata=text;
    }

    thoriumapi.logEvent(0, "[com.thorium.qrcode.generator] Drawing QRCode " + elt.id + " with text '" + text + "'");
    QRCode.toCanvas(elt, textdata, {
      version: "Auto",
      errorCorrectionLevel: errorCorrectionLevel,
      margin: 4,
      color: {
        light: light,
        dark: dark
      },
      toSJISFunc: QRCode.toSJIS
    }, function (error, canvas) {
      if (error) {
        thoriumapi.logEvent(2, "[com.thorium.qrcode.generator] QRCode Error " + error);
        if (typeof app !== 'undefined') {
          app.dialog.alert(error);
        } else {
          alert(error);
        }
      }
    })
  },
}

$(document).on('page:beforein', function (e) {
  nodeQrcode.initialize();
})

