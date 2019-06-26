cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-pdf-generator.pdf",
    "file": "plugins/cordova-pdf-generator/www/pdf.js",
    "pluginId": "cordova-pdf-generator",
    "clobbers": [
      "cordova.plugins.pdf",
      "pugin.pdf",
      "pdf"
    ]
  },
  {
    "id": "cordova-plugin-statusbar.statusbar",
    "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
    "pluginId": "cordova-plugin-statusbar",
    "clobbers": [
      "window.StatusBar"
    ]
  },
  {
    "id": "cordova-plugin-streaming-media.StreamingMedia",
    "file": "plugins/cordova-plugin-streaming-media/www/StreamingMedia.js",
    "pluginId": "cordova-plugin-streaming-media",
    "clobbers": [
      "streamingMedia"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-pdf-generator": "2.0.8",
  "cordova-plugin-console": "1.0.7",
  "cordova-plugin-statusbar": "1.0.1",
  "cordova-plugin-streaming-media": "2.2.0",
  "cordova-plugin-whitelist": "1.2.2"
};
// BOTTOM OF METADATA
});