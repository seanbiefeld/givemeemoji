fs = require('fs');
http = require('http');
url = require('url');


http.createServer(function(req, res){
  var request = url.parse(req.url, true);
  var imageName = request.pathname;

  try {
    console.log('about to load ./images/emojis'+imageName);

    if(request.pathname.indexOf('/help/') > -1){

      var helpFile = fs.readFileSync('./images/emojis/list.txt');
      res.writeHead(200, {'Content-Type': 'text/plain' });
      res.end(helpFile, 'utf8');

    } else {
      
      if(!(imageName.indexOf('.png')> -1)){
        imageName += '.png';
      }

      var img = fs.readFileSync('./images/emojis'+imageName);
      res.writeHead(200, {'Content-Type': 'image/png' });
      res.end(img, 'binary');
    }

    
  }
  catch(exception) { 
    console.log(exception);
     res.writeHead(200, {'Content-Type': 'image/gif' });
     res.end(fs.readFileSync('./images/emojis/doctornope.gif'), 'binary');
  }
}).listen(process.env.PORT || 5000);
