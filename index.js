const express = require('express'),
  request = require('request'),
  cors = require('cors'),
  toxa = express(),
  putReq = express();

const host = '127.0.0.1';
const port = 7000;

toxa.use(express.json());
toxa.use(cors());

let zapros;

// comment temp
toxa.post('/', function(reques, response){
  console.log(reques.body);      // your JSON
   response.send(reques.body);    // echo the result back
   zapros = reques;
   
   
});

toxa.get('/', function(req, res){
  request({
    url: `https://api.weather.yandex.ru/v2/forecast?lat=${zapros.body.lat}&lon=${zapros.body.lon}&lang=ru_RU&extra=true`,
    headers: { 'X-Yandex-API-Key': 'ba18c121-adab-4943-aa3d-abff1290dd69' },
    },
    function(err, resp, body){
      console.log(zapros.body);
      if (err) return res.status(500).send({ message: err });
      return res.send(body);
    }
  );
});

toxa.listen(port, host, () =>
    console.log(`Server listens http://${host}:${port}`)
  );

toxa.listen(3000);

putReq.use(express.json());
putReq.use(cors());
putReq.put('/', function(reques, response){
  console.log(reques.body);      // your JSON
  response.send(reques.body);    // echo the result back
  app.get('/', function(req, res){
    request({
      url: `https://api.weather.yandex.ru/v2/forecast?lat=${reques.body.lat}&lon=${reques.body.lon}&lang=ru_RU&extra=true`,
      headers: { 'X-Yandex-API-Key': 'ba18c121-adab-4943-aa3d-abff1290dd69' },
      },
      function(err, resp, body){
        if (err) return res.status(500).send({ message: err });
        return res.send(body);
      }
    );
  });
});



