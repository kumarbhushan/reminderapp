// Namespace for reportGenerator
var reportGenerator = reportGenerator || {}

// Generate method in reportGenerator API
// Used to create file from Text input
reportGenerator.generate = function (folderPath, fileName, callback) {
  if (folderPath) { // check is content and file type available
    var report = new jsPDF('p', 'pt', [50 * 4, 300 * 5])
    function jfilter (node) {
      return (node.id !== 'ignorePDF')
    }
    domtoimage.toPng(document.getElementById('pdfData'), { filter: jfilter, quality: 0.95 })
      .then(function (dataUrl) {
        report.addImage(dataUrl, 'JPEG', 0, 0, 50 * 4, 280 * 5)
        // report.save('test.pdf')
        // console.log('dataUrl', dataUrl)
        var blobContent = report.output('blob')
        window.resolveLocalFileSystemURL(folderPath, function (dir) {
          dir.getFile(fileName, { create: true }, function (file) {
            file.createWriter(function (fileWriter) {
              fileWriter.write(blobContent)
              callback(file.toURL())
            }, function () {
              $('.share-text').text('Share Safety Plan')
              $('#sharethis').show()
              console.log('Unable to save file in path ' + folderPath)
            })
          })
        })
      }).catch(function (err) {
        $('.share-text').text('Share Safety Plan')
        $('#sharethis').show()
        console.log(err)
      })
  }
}
