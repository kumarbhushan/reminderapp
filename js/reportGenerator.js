// Namespace for reportGenerator
var reportGenerator = reportGenerator || {}

// Generate method in reportGenerator API
// Used to create file from Text input
reportGenerator.generate = function (content, folderPath, fileName, callback) {
  var getContentHeight = function (input, width) {
    if (input) {
      var $body = jQuery('body'),
        $content = jQuery(input),
        $container = jQuery('<div></div>').css({ 'display': 'none', 'width': (width + 'pt') }),
        output = 0

      $container.append($content).appendTo($body) // Add to body for get height

      output = $container.height() // Get Height

      $container.remove() // Remove container

      return output
    }
    return null
  }
  var convertPxToPt = function (input) {
    return input * 72 / 96
  }
  var debugModeOn = false

  if (content && folderPath) { // check is content and file type available
    var report = new jsPDF('p', 'pt', [50, 300]), // Create jsPDF api instance, with potrait mode, inches unit, and A4 paper size
      margin = {
        top: 10,
        bottom: 10,
        left: 10,
        width: 322
      },
      pages = null

    var elementHandler = {
      '#ignorePDF': function (element, renderer) {
        return true
      }
    }
    function jfilter (node) {
      return (node.id !== 'ignorePDF')
    }
    domtoimage.toPng(document.getElementById('pdfData'), { filter: jfilter, quality: 0.95 })
      .then(function (dataUrl) {
        // var link = document.createElement('a');
        // link.download = 'my-image-name.jpeg';
        // link.href = dataUrl;
        // link.click();
        report.addImage(dataUrl, 'JPEG', 0, 0, 50, 280)
        // report.save('test.pdf')
        // console.log('dataUrl', dataUrl)
        var blobContent = report.output('blob')
        window.resolveLocalFileSystemURL(folderPath, function (dir) {
          dir.getFile(fileName, { create: true }, function (file) {
            if (debugModeOn) { alert('File created succesfully.') }

            file.createWriter(function (fileWriter) {
              if (debugModeOn) { alert('Writing content to file') }

              fileWriter.write(blobContent)

              callback(file.toURL())
            }, function () {
              alert('Unable to save file in path ' + folderPath)
            })
          })
        })
      })
    // report.fromHTML(content, margin.left, margin.top, {
    //   'width': margin.width, 'elementHandlers': elementHandler
    // }, function (bla) {
    //   // report.save('test.pdf')
    //   var blobContent = report.output('blob')
    //   window.resolveLocalFileSystemURL(folderPath, function (dir) {
    //     dir.getFile(fileName, { create: true }, function (file) {
    //       if (debugModeOn) { alert('File created succesfully.') }

    //       file.createWriter(function (fileWriter) {
    //         if (debugModeOn) { alert('Writing content to file') }

    //         fileWriter.write(blobContent)

    //         callback(file.toURL())
    //       }, function () {
    //         alert('Unable to save file in path ' + folderPath)
    //       })
    //     })
    //   })
    // }, margin)
  }
}
