
module.exports = function(options) {
  if( typeof XMLHttpRequest === 'undefined' ) {
    return nodeUpload();
  }
  return browserUpload(options);
}

function browserUpload(options) {
  var formData = new FormData();
  if( options.dir ) formData.set('dir', options.dir);
  if( options.message ) formData.set('message', options.message);
  if( options.file ) formData.set('file', options.file);

  let time = new Date().getTime();

  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    options.xhr = xhr;
    xhr.open('POST', options.url);

    for( let key in options.headers||{} ) {
      xhr.setRequestHeader(k, options.headers[key]);
    }

    xhr.onload = e => resolve(e.target.responseText);
    xhr.onerror = reject;

    if( xhr.upload && options.onProgress ) {
      xhr.upload.onprogress = (e) => {
        if( e.lengthComputable ) {
          let diff = Date.now() - time;
          let speed = (e.loaded / 1000000) / (diff / 1000);
          options.onProgress({
            progress : ((e.loaded / e.total)*100).toFixed(0), 
            speed : speed.toFixed(2),
            speedUnits : 'Mbps',
            file : options
          });
        }
      }
    }

    xhr.send(formData);
  });
}

function nodeUpload(options) {
  throw new Error('NodeJS upload not implemented yet');
}