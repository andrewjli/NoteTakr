'use strict';

function renderPage(pdf, num) {
  pdf.getPage(num).then(function(page) {
    var scale = 0.75;
    var viewport = page.getViewport(scale);

    // Prepare canvas using PDF page dimensions
    var canvas = document.getElementById('the-canvas');
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    page.render(renderContext);
  });
});

//specify the pdf file you want to load in here
PDFJS.getDocument('examplePDF.pdf').then(renderPage(pdf, 5);
