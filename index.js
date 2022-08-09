
var pattern = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

$("#calcButton").click(function(){

  var subnetIp = $("#ipAddress").val();
  var subnetMask = $("#subnetMask").val();

  if(!$.trim(subnetIp).match(pattern)){
    alert('Please enter a valid IP Address!');
  }

  else if (!$.trim(subnetMask).match(pattern)) {
    alert('Please enter a valid Subnet Mask!');
  }

  else{
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

    $("#broadcastAddr").text(calculatedBroadcastAddr);
  }

});
