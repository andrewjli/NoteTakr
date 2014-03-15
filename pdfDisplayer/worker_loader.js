
 /* globals PDFJS, Util */

'use strict';

// List of shared files to include;
var sharedFiles = [
  'shared/util.js',
  'shared/colorspace.js',
  'shared/function.js',
  'shared/annotation.js'
];

// List of other files to include;
var otherFiles = [
  'core/network.js',
  'core/chunked_stream.js',
  'core/pdf_manager.js',
  'core/core.js',
  'core/obj.js',
  'core/charsets.js',
  'core/cidmaps.js',
  'core/crypto.js',
  'core/pattern.js',
  'core/evaluator.js',
  'core/cmap.js',
  'core/fonts.js',
  'core/font_renderer.js',
  'core/glyphlist.js',
  'core/image.js',
  'core/metrics.js',
  'core/parser.js',
  'core/ps_parser.js',
  'core/stream.js',
  'core/worker.js',
  'core/arithmetic_decoder.js',
  'core/jpx.js',
  'core/jbig2.js',
  'core/bidi.js',
  '../external/jpgjs/jpg.js'
];

function loadInOrder(index, path, files) {
  if (index >= files.length) {
    PDFJS.fakeWorkerFilesLoadedPromise.resolve();
    return;
  }
  PDFJS.Util.loadScript(path + files[index],
                  loadInOrder.bind(null, ++index, path, files));
}

// Load all the files.
if (typeof PDFJS === 'undefined' || !PDFJS.fakeWorkerFilesLoadedPromise) {
  var files = sharedFiles.concat(otherFiles);
  for (var i = 0; i < files.length; i++) {
    importScripts(files[i]);
  }
} else {
  var src = PDFJS.workerSrc;
  var path = src.substr(0, src.indexOf('worker_loader.js'));
  // If Util is available, we assume that shared files are already loaded. Can
  // happen that they are not if PDF.js is bundled inside a special namespace.
  var skipShared = typeof Util !== 'undefined';
  var files = skipShared ? otherFiles : sharedFiles.concat(otherFiles);
  loadInOrder(0, path, files);
}
