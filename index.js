const express = require('express'),
  app = express(),
  request = require('request'),
  cors = require('cors'),
  toxa = express();

const host = '127.0.0.1';
const port = 7000;

toxa.use(express.json());
toxa.use(cors());

// comment temp
toxa.post('/', function(reques, response){
  console.log(reques.body);      // your JSON
   response.send(reques.body);    // echo the result back

   app.use(cors());
   app.get('/', function(req, res){
     request({
       url: `https://api.weather.yandex.ru/v2/forecast?lat=${reques.body.lat}&lon=${reques.body.lon}&[lang=ru_RU]`,
       headers: { 'X-Yandex-API-Key': 'be6a36a0-1592-48b8-bbb5-45f4f6839d62' },
       },
       function(err, resp, body){
         if (err) return res.status(500).send({ message: err });
         return res.send(body);
       }
     );
   });
   

});

app.listen(port, host, () =>
     console.log(`Server listens http://${host}:${port}`)
   );

toxa.listen(3000);

