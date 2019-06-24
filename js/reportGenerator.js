/*
    Report Generator JavaScript API
    A JavaScript API, used to generate PDF or Text file report, from HTML input.
    Author: Rohit Kumar Mighwal
    Created On: 19-March-2015
*/

// Namespace for reportGenerator
var reportGenerator = reportGenerator || {};

// Generate method in reportGenerator API
// Used to create file from Text input
reportGenerator.generate = function (content, folderPath, fileName, callback) {
    var getContentHeight = function (input, width) {
        if (input) {
            var $body = jQuery('body'),
                $content = jQuery(input),
                $container = jQuery('<div></div>').css({ 'display': 'none', 'width': (width + 'pt') }),
                output = 0;

            $container.append($content).appendTo($body); // Add to body for get height

            output = $container.height(); // Get Height

            $container.remove(); // Remove container

            return output;
        }
        return null;
    },
        convertPxToPt = function (input) {
            return input * 72 / 96;
        },
        getPagesContent = function (contentArray, pageHeight, pageWidth) {
            var totalContentHeight = getContentHeight(contentArray.join(''), pageWidth),
                output = new Array();

            totalContentHeight = convertPxToPt(totalContentHeight);

            if (totalContentHeight < pageHeight) {
                output.push(contentArray.join(''));
            } else {
                var processedContent = new Array(); // Used while split content for multiple pages

                for (var i = 0; i < contentArray.length; i++) {
                    processedContent.push(contentArray[i]); // Add content as processed

                    var contentHeight = convertPxToPt(getContentHeight(processedContent.join('') + "</p>", pageWidth)); // Adding p tag, to calculate accurate content height

                    if (contentHeight >= pageHeight) {
                        processedContent.pop(); // Remove extra height
                        output.push(processedContent.join('')); // Push processed content for current page

                        processedContent = new Array(); // Reset processed content, for next page
                        processedContent.push((String(contentArray[i]).indexOf("<p>") == 0 ? "" : "<p>") + contentArray[i]); // Shift last element to next page, add p tag to accurate content HTML, if content not starts with p tag
                    }

                    if (i == (contentArray.length - 1))
                        output.push(processedContent.join('')); // Push processed content for current page
                }
            }

            return output;
        },
        debugModeOn = false;

    if (content && folderPath) { // check is content and file type available

        var report = new jsPDF("p", "pt", "a4"), // Create jsPDF api instance, with potrait mode, inches unit, and A4 paper size
            margin = {
                top: 40,
                bottom: 40,
                left: 40,
                width: 522
            },
            pageHeight = report.internal.pageSize.height - (margin.bottom + margin.top),
            pages = null;

        //content = report.splitTextToSize(content, margin.width); // Set content max width

        // pages = getPagesContent(content, pageHeight, margin.width);

        // for (var i = 0, pagesLength = pages.length; i < pagesLength; i++) {
        //     if (i > 0)
        //         report.addPage();

        //     // Create PDF from HTML
        //     report.fromHTML(pages[i], margin.left, margin.top, {
        //         'width': margin.width
        //     }, margin);
        // }

        report.fromHTML(content, margin.left, margin.top, {
            'width': margin.width
        }, margin);

        var blobContent = report.output('blob');

        window.resolveLocalFileSystemURL(folderPath, function (dir) {
            dir.getFile(fileName, { create: true }, function (file) {
                if (debugModeOn)
                    alert("File created succesfully.");

                file.createWriter(function (fileWriter) {
                    if (debugModeOn)
                        alert("Writing content to file");

                    fileWriter.write(blobContent);

                    callback(file.toURL());
                }, function () {
                    alert('Unable to save file in path ' + folderPath);
                });
            });
        });
    }
};