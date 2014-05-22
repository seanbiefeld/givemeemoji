var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
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
     res.end('Exists not, image you requested. \n');
  }
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});