fs = require('fs');
http = require('http');
url = require('url');


http.createServer(function(req, res){
  var request = url.parse(req.url, true);
  var imageName = request.pathname;

  try {
    console.log('about to load ./images/emojis'+imageName);

    if(request.pathname.indexOf('help') > -1){

      var helpFile = fs.readFileSync('./images/emojis/list.txt');
      var helpHtml = '<table>';
      fs.readdirSync('./images/emojis').forEach(function(element, index, array){

          if(index === 0)
            helpHtml += '<tr>'

          helpHtml += '<td><p><img src="../' + element + '" ></img></p><p style="font-size: 10pt;">:' + element.replace('.png', '') + ':</p></td>';

          if((index + 1) % 6 === 0 && index !== array.length - 1)
            helpHtml += '</tr><tr>'

          if(index === array.length - 1)
            helpHtml += '</tr>'
      });

      helpHtml = helpHtml + '</table>';

      res.writeHead(200, {'Content-Type': 'text/html' });
      res.end(helpHtml, 'utf8');

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
