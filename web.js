fs = require('fs');
http = require('http');
url = require('url');


http.createServer(function(req, res){
  var request = url.parse(req.url, true);
  var imageName = request.pathname;

  try {
    console.log('about to load ./images/emojis'+imageName+'.png');
     var img = fs.readFileSync('./images/emojis'+imageName+'.png');
     res.writeHead(200, {'Content-Type': 'image/png' });
     res.end(img, 'binary');
  }
  catch(exception) { 
    console.log(exception);
     res.writeHead(200, {'Content-Type': 'text/plain' });
     res.end('Exists not, image you request. \n');
  }
}).listen(process.env.PORT || 5000);
