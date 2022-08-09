

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000;

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");  //This is sending the directory name directly from the server side.
});

app.post("/", function(req, res){
  var subnetIp = req.body.ipAddress;
  var subnetMask = req.body.subnetMask;

  var numIpOctets = 4;

  const subnetIpArr = ['0','0','0','0'];
  const subnetMaskArr = ['0','0','0','0'];
  const calcBroadcastAddrArr = ['0','0','0','0'];
  var subnetIpStringPos = 0;
  var subnetMaskStringPos = 0;
  var calculatedBroadcastAddr = "";

  for(var i = 0; i < numIpOctets; i++){
    subnetIpArr[i] = parseInt(subnetIp.substr(subnetIpStringPos, subnetIp.indexOf('.', subnetIpStringPos)-subnetIpStringPos));
    subnetIpStringPos = subnetIp.indexOf('.', subnetIpStringPos) + 1;

    subnetMaskArr[i] = parseInt(subnetMask.substr(subnetMaskStringPos, subnetMask.indexOf('.', subnetMaskStringPos)-subnetMaskStringPos));
    subnetMaskStringPos = subnetMask.indexOf('.', subnetMaskStringPos) + 1;

    subnetMaskArr[i] = (~subnetMaskArr[i])&(255);

    calcBroadcastAddrArr[i] = subnetIpArr[i] | subnetMaskArr[i];

    if(i < 3)
    {
      calculatedBroadcastAddr = calculatedBroadcastAddr + calcBroadcastAddrArr[i].toString() + ".";
    }
    else
    {
      calculatedBroadcastAddr = calculatedBroadcastAddr + calcBroadcastAddrArr[i].toString();
    }
  }

  res.send("<center><h1>" + calculatedBroadcastAddr + "</h1></center>");

});

app.listen(port, function(){
  console.log('Server started listening on port 3000');
});
