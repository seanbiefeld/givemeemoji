fs = require('fs');
http = require('http');
url = require('url');

routes = {

  stylesheets : function(urlParams){
    return fs.readFileSync('./stylesheets/' + urlParams[urlParams.length - 1]);
  }

}

http.createServer(function(req, res){
  var request = url.parse(req.url, true);
  var imageName = request.pathname;
  var urlParams = request.pathname.split('/');

  try {
    console.log('about to load ./images/emojis'+imageName);

    if(request.pathname.indexOf('stylesheets') > -1){

      var css = routes['stylesheets'](urlParams);
      res.writeHead(200, {'Content-Type': 'text/css' });
      res.end(css, 'utf8');

      return;
    }

    if(request.pathname.indexOf('help') > -1){

      var helpFile = fs.readFileSync('./images/emojis/list.txt');
      var helpHtml = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"><link rel="stylesheet" href="stylesheets/base.css"><link rel="stylesheet" href="stylesheets/base.css"><link rel="stylesheet" href="../stylesheets/skeleton.css"><link rel="stylesheet" href="../stylesheets/layout.css"></head><body><div class="container"><div class="fifteen columns"><h1 class="remove-bottom" style="margin-top: 40px">Emojis</h1><hr /></div>';
      
      fs.readdirSync('./images/emojis').forEach(function(element, index, array){

          if(index === 0)
            helpHtml += '<div class="three columns" style="text-align: center;word-wrap:break-word;">'

          helpHtml += '<td><p><img src="../' + element + '" ></img></p><p style="font-size: 10pt;">:' + element.replace('.png', '') + ':</p></td>';

          if((index + 1) % 370 === 0 && index !== array.length - 1)
            helpHtml += '</div><div class="three columns" style="text-align: center;word-wrap:break-word;">'

          if(index === array.length - 1)
            helpHtml += '</div>'
      });

      helpHtml = helpHtml + '</body></html>';

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
