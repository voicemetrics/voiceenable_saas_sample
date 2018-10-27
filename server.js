const cron = require('node-cron');
const request = require('request');

cron.schedule('*/5 * * * * *', function(){
    console.log("voice-enabling our data!");

    // 1.  Pull data from somewhere  (database, system, web service/endpoint, whatever)    
    let salesYesterday = "$9,999";
    let depositsMonth = "$10,000";
    let ar = "$75,500";

    // 2.  Create json object of data elements/values for HTTP POST
    let jobj = {};
    jobj['sales yesterday'] = salesYesterday;
    jobj['deposits this month'] = depositsMonth;
    jobj['accounts receivable'] = ar;

    // 3.  Set userid and data source name
    let userid = 'youremail@somedomain.com';
    let dataSource = 'My Company Data';
    let apiKey = process.env.VM_KEY;

    // 4.  Do the POST!    
    let headersOpt = {  
        "content-type": "application/json",
        "x-api-key": apiKey
    };
    request(
        {
        method:'post',
        url:'https://api.voicemetrics.io/data/dev/vdatas',                   
        headers: headersOpt,
        json: {dataName: dataSource, userid: userid, data: jobj}                  
    }, function (error, response, body) {      
        if (error) { console.log("error: " , error);}
        console.log(body);  
    });
});
