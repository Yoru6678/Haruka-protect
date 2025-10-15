var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write("Bot is alive!");
  res.end();
}).listen(process.env.PORT || 8000);

console.log('🌐 Serveur HTTP démarré sur le port ' + (process.env.PORT || 8000));