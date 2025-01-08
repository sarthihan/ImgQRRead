
var qrcodeReader = {
  name: "QRCode Reader",
  bundleid: "com.thorium.qrcode-reader",
  version: "4.0",
  result: null,
  initialize: function () {
  },

  previewFile: function (e) {
    var input = e.target;
    $(".qrcode-reader").css("opacity", "1");

    var preview = document.querySelector('#qrcodepreview');
    var file = input.files[0];

    var reader = new FileReader();
    reader.addEventListener("load", function () {
      if (reader.result) {
        preview.src = reader.result;
        qrcodeReader.decodeImageFromBase64(reader.result);
      }
    });
    if (file) {
      reader.readAsDataURL(file);
    }
  },

  callback: function (e) {
    qrcodeReader.result = e;
    app.emit('qrcode-readerResult', e);
    if (typeof app !== 'undefined') { $(".qrcoderesult").text(e); }
    if (e.startsWith("http")) {
      thoriumapi.showToast('<a class="link external text-white" data-rel="external" target="_blank" rel="noopener" href="' + e + '"><i class="fa f7-icons">qrcode_viewfinder</i><span>' + e + '</span></a>', true, 'top', 9999999);
    } else {
      thoriumapi.showToast(e, true, 'top', 3000, "qrcode_viewfinder");
    }

  },

  decodeImageFromBase64: function (data) {
    qrcode.callback = qrcodeReader.callback;
    qrcode.decode(data);
  }
}

$("input").on("change", function (e) {
  qrcodeReader.previewFile(e);
});


$("html").on("dragover", function (e) { e.preventDefault(); });
$(document).on('dragenter', '.qrcodeinput', function (e) {
  $(".qrcode-reader").css("opacity", "0.5");
});
$(document).on('dragleave', '.qrcodeinput', function (e) {
  $(".qrcode-reader").css("opacity", "1");
});

$(document).on('click', '.qrcodeinput', function (e) {
  e.preventDefault;
  if (typeof app !== 'undefined') {
    if ((thoriumapi.isLocal() == true) && ((app.device.ios) || (app.device.android))) {
      var iconTooltip = app.tooltip.create({
        targetEl: $(this),
        text: 'Drop your file here',
      });
      iconTooltip.show();
    }
  }
  $('.qrcodeinput_input').trigger('click');
});

$(document).on('page:beforein', function (e) {
  var page = e.detail;
  qrcodeReader.initialize();
})

