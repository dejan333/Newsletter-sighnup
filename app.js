
const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const hostname = '0.0.0.0';
const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/',function (req,res){
  res.sendFile(__dirname + '/index.html');
})

app.post('/', function (req,res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status:"subscribed",
        merge_fields: {
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = 'https://us21.api.mailchimp.com/3.0/lists/26911178c7';

  const options = {
    method:"POST",
    auth:"mkdautosalles:3ade650c61ddb52eac5e90067366b54-us21"
  }

  const request = https.request(url, options, function(response){
    response.on('data', function(data){
      console.log(JSON.parse(data));
      if (response.statusCode ===200) {
        res.sendFile(__dirname +'/success.html')
      }else{
        res.sendFile(__dirname +'/failure.html')
      }
    })
  })
  request.write(jsonData);
  request.end();
})

//Api key mailchimp
//e3ade650c61ddb52eac5e90067366b54-us21

//26911178c7
//26911178c7
app.listen(port , hostname, console.log('Server running'));
