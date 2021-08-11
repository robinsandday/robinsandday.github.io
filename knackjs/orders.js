// ************************************************************************************************************************************************
// Apify dates of data checking download Added by HH on 01052019***********************************************************************************
// ************************************************************************************************************************************************

// Listen for the list page view
$(document).on('knack-records-render.view_2157', function(event, view, records) {
  // Do something after the records render
  //2console.log(records.length);
  //alert('listener for records, # of records is: ' + records.length);
  //Go through all rows
  
  $('tbody tr').each(function(){ 
      //Check if the row has field for the date - it should be by all when it is updated
      try {
        if ($(this).attr('id')!==undefined){
          let orderNumber = $(this).find('td').eq(0).text().match(new RegExp(/PCD\/VX Order: \d*/))[0].replace('PCD/VX Order: ','');
          console.log('orderNumber',orderNumber);
          if($(this).find('div[id="dodp"]').length){
              //This is fixed URL of Apify storage, where the Actors are pushing dates when records are checked, we only add Order number parsed from App webpage for given row
            var url = 'https://api.apify.com/v2/key-value-stores/MGAH5Tr9TFctDnMTD/records/DETAIL_'+orderNumber+'?disableRedirect=true';
          //AJAX Get for the URL - response is now just the date, so we will only print it to html page
              $.ajax({url:url, success: function(data){
                  $(this).find('div[id="dodp"]').text(data);
              },
              error: function(jqXHR, textStatus, errorThrown) {
                  console.log("error. textStatus: %s  errorThrown: %s", textStatus, errorThrown);
              }, async:true, context:this, cache: false, timeout: 15000});
              
          };

        if($(this).find('div[id="dod9v8"]').length){
              if ($(this).find('div[id="dod9v8"]').text()!==''){
                //This is fixed URL of Apify storage, where the Actors are pushing dates when records are checked, we only add Order number parsed from App webpage for given row
              var url = 'https://api.apify.com/v2/key-value-stores/MGAH5Tr9TFctDnMTD/records/VINENQ_'+orderNumber+'?disableRedirect=true';
                //AJAX Get for the URL - response is now just the date, so we will only print it to html page
                $.ajax({url:url, success: function(data){
                    $(this).find('div[id="dod9v8"]').text(data);
                }, async:true, context:this, cache: false, timeout: 15000});
              }
        };

        if($(this).find('div[id="doAFRL"]').length){
          if ($(this).find('div[id="doAFRL"]').text()!==''){
              //This is fixed URL of Apify storage, where the Actors are pushing dates when records are checked, we only add Order number parsed from App webpage for given row
            var url = 'https://api.apify.com/v2/key-value-stores/MGAH5Tr9TFctDnMTD/records/AFRL_'+orderNumber+'?disableRedirect=true';
          //AJAX Get for the URL - response is now just the date, so we will only print it to html page
              $.ajax({url:url, success: function(data){
                  $(this).find('div[id="doAFRL"]').text(data);
              }, async:true, context:this, cache: false, timeout: 15000});
          }
        };
        if($(this).find('div[id="doINV"]').length){
          if ($(this).find('div[id="doINV"]').text()!==''){
              //This is fixed URL of Apify storage, where the Actors are pushing dates when records are checked, we only add Order number parsed from App webpage for given row
            var url = 'https://api.apify.com/v2/key-value-stores/MGAH5Tr9TFctDnMTD/records/INVOICE_'+orderNumber+'?disableRedirect=true';
          //AJAX Get for the URL - response is now just the date, so we will only print it to html page
              $.ajax({url:url, success: function(data){
                  $(this).find('div[id="doINV"]').text(data);
              }, async:true, context:this, cache: false, timeout: 15000});
          }
        };
        if($(this).find('div[id="doGEFCO"]').length){
          if ($(this).find('div[id="doGEFCO"]').text()!==''){
              //This is fixed URL of Apify storage, where the Actors are pushing dates when records are checked, we only add Order number parsed from App webpage for given row
            var url = 'https://api.apify.com/v2/key-value-stores/MGAH5Tr9TFctDnMTD/records/GEFCO_'+orderNumber+'?disableRedirect=true';
          //AJAX Get for the URL - response is now just the date, so we will only print it to html page
              $.ajax({url:url, success: function(data){
                  $(this).find('div[id="doGEFCO"]').text(data);
              }, async:true, context:this, cache: false, timeout: 15000});
          }
        };
      }
    } catch (e){
      console.log(e);
    }
	});
    
});


//HIDE THE LOGO AND logged in user in all pages
$(document).on('knack-view-render.any', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

hashCode = function(elem) {
  var hash = 0, i, chr;
  if (elem.length === 0) return hash;
  for (i = 0; i < elem.length; i++) {
    chr   = elem.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

var submitUserLoginForm = function() {
  console.log('submitUserForm');
  if ($('[id="email"]').length===0){ 
    return;
  }

    var url = window.location.toString();
    if (!url.indexOf('https://www.robinsandday.co.uk/digital-orders?') === 0) {
        alert("Invalid URL");
        return;
    }

    var params = new URLSearchParams( window.location.search);   
    var token = params.get('token');
    token = atob(token);

    if (!token.includes('#')){
      alert('Wrong token');
      return;
    }
    let userName2 = token.split('#')[0];
    let password = token.split('#')[1];
    
    //type userName from url, my secret password and click login
    //if auth successfully then it shows the app, otherwise login screen
    $('[id="email"]').val(userName2);
    $('[id="password"]').val(password);
    $('input[type="submit"]').click();
};

//on the login page
$(document).on("knack-view-render.view_2146", function (event, view) {
  submitUserLoginForm();
});

var loginSceneNames = ["scene_917","scene_989","scene_883","scene_1074","scene_1113","scene_1115"]; ///add scene numbers as necessary

loginSceneNames.forEach(functionName);
function functionName(selector_scene){
  $(document).on("knack-scene-render." + selector_scene, function(event, scene, data) {
    console.log(selector_scene)
    submitUserLoginForm();
  });
}

//this code is for checking the right user in the Customer portal, if logged in user is not the same as car connected user it redirects
checkUser = function(data) {
  if (Knack.getUserAttributes().email!==data.field_6218_raw.email && Knack.getUserAttributes().roles.includes('object_126')){
    alert('Sorry, you are not authorised to view this page. Please follow the link from your Customer Portal to view details & status of your Vehicle');
    location.href = 'https://salesjourney2.rd.knack.com/digital-deal-file-orders#dialog-order-information/new-digital-deal-file/customer-details/';
  }	
};

//this code calls the function for checking the user rights, it needs to be called in view which has the connected customer
$(document).on('knack-view-render.view_2605', function(event, view, data) {
  checkUser(data);
});



//************************************* NEW VEHICLE DEAL FILE *****************************************

/* Change Keyword Search Placeholder Text for used deal files */
$(document).on('knack-scene-render.scene_917', function(event, scene) {
  $("input[name='keyword']").attr("placeholder", "Dealer Address, Reg, Stock No.")
});


//HANDOVER APPOINTMENT PAGE
//Restrict Available Times for Handover Appointment to 8am - 7pm

var view_names = ["view_2630"]; ///add view numbers as necessary

view_names.forEach(bindToUpdate1);

function bindToUpdate1(selector_view_name){
$(document).on('knack-view-render.' + selector_view_name, function(event, view, data) {

$(document).ready(function(){
$('.ui-timepicker-input').timepicker({
minTime: '08:00:00',     //  8:00 AM,  Change as necessary
maxTime: '19:00:00',        //  7:00 PM,  Change as necessary
step: '15'		// Dropdown Interval every 15 mins

});
});
});

}

//****************** Show Alert & Refresh Digital Deal File Page 12 seconds after Order Refresh ****************//

$(document).on('knack-record-update.view_2854', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 16000);
  
  alert("Please wait while we fetch the Order, Customer & P/X Details from Autoline. Click 'OK' & this page will refresh in a few moments...");

  Knack.showSpinner();
  
});

//****************** Show Alert & Refresh Digital Deal File Page 12 seconds after Invoice Retrieval ****************//

$(document).on('knack-record-update.view_2855', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 16000);
  
  alert("Please wait while we fetch the Invoice from Autoline. Click 'OK' & this page will refresh in a few moments...");

  Knack.showSpinner();
  
});

//****************** Show Alert & Refresh Digital Deal File Page 10 seconds after Re-Check for for P/X Valuation ****************//

$(document).on('knack-record-update.view_2584', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 10000);
  
  alert("Please wait while we search for a Completed Digital Part Exchange Appraisal. Click 'OK' & this page will refresh in a few moments...");

  Knack.showSpinner();
  
});

//****************** Show Alert & Refresh Digital Deal File Page 10 seconds after Re-Check for for P/X Valuation ****************//

$(document).on('knack-record-update.view_2574', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 10000);
  
  alert("Please wait while we search for a Completed Digital Part Exchange Appraisal. Click 'OK' & this page will refresh in a few moments...");

  Knack.showSpinner();
  
});

// Disable Stock Number Field on INVOICE Retrieval if NOT Blank
//$(document).on('knack-view-render.view_2855', function(event, view) {

// if ($('#view_2855 #field_6115').val() != "") {

//      $('#view_2855 #field_6115').attr('disabled', 'disabled'); // disable Stock Number input field

//    }; // end if

//});

//****************** Refresh Handover Checklist Page if Selected to update ****************//

$(document).on('knack-record-update.view_2760', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 500);

  Knack.showSpinner();
  
});

//****************** Refresh Customer Satisfaction Survey Page if Selected to update ****************//

$(document).on('knack-record-update.view_2767', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 500);

  Knack.showSpinner();
  
});

//****************** Refresh Profit & Loss Sheet Page once Order Details/Settlement Submitted for Digital P&L Dealers ****************//

$(document).on('knack-record-update.view_3836', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 2000);

  Knack.showSpinner();
  
});

//****************** Refresh Profit & Loss Sheet Page when Digital P&L Created Manually by Dealer ****************//

$(document).on('knack-record-create.view_3949', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 2000);

  Knack.showSpinner();
  
});

// ----------  Service Plan table expand or collapse groupings ----------

// Call the function when your table renders – do this for each table you’re applying this to
$(document).on('knack-view-render.view_3668', function(event, view, data) {
    addGroupExpandCollapse(view);
})

// The function itself – only needed once
var addGroupExpandCollapse = function(view) {

    $('#' + view.key + ' .kn-table-group').css("cursor", "pointer");

    $('#' + view.key + " .kn-group-level-1 td").each(function() {
        if ($(this).text().length > 1) {
            var RowText = $(this).html();
            $(this).html('<i class="fa fa-minus-square-o"></i>&nbsp;' + RowText);
        }
    });

    // This line causes groups to be collapsed by default.
    //$('#' + view.key + ' .kn-table-group').nextUntil('.kn-table-group').toggle();

    $('#' + view.key + ' .kn-table-group').click(function() {

        $(this).nextUntil('.kn-table-group').toggle();

        if ($(this).html().indexOf('fa-minus') !== -1) {
            $(this).html($(this).html().replace('minus', 'plus'));
        } else {
            $(this).html($(this).html().replace('plus', 'minus'));
        }
    });

}

//**************************** NEW DEAL FILE SIGN ONLINE ***********************

// Code to wait following Form Submission while PIN is Checked in Integromat

$(document).on('knack-form-submit.view_3676', function(event, view, data) { 


	setTimeout(function(){ 

    	Knack.showSpinner();

    }, 0); 

  

	commandURL = "https://hook.integromat.com/vxmlosfeinmtjdo3mfn3v7tfcqru491z?recordid=" + data.id ;


 	$.get(commandURL, function(data, status){


      Knack.hideSpinner();

      $(".kn-message.success").html("<b>" + data + "</b>");


    });

});

//Hide Crumbtrail & Header on Sign Online Customer Pages
$(document).on('knack-scene-render.scene_1086', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1088', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1089', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1090', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1091', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1092', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1093', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1094', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1095', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1096', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1097', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

//DOCUMENT SCAN APP
var scanAppHTML = '';
function embedScanApp(){
  let scanApp = document.getElementById('scanApp');
  if (!scanApp){
    if (scanAppHTML===''){
      scanAppHTML = $.ajax({
          type: "GET",
          url: 'https://robinsandday.github.io/photoTakeApp/documentPart.html',
          cache: false,
          async: false
      }).responseText;
    }
    scanApp = document.createElement('div');
    scanApp.innerHTML = scanAppHTML;
    scanApp.id = 'scanApp';
    scanApp.style="display: none;"
    document.body.appendChild(scanApp);
  } else {
    scanApp.innerHTML = scanAppHTML;
  }

  var nowS = Date.now().toString();

  if ($('#scanAppCss').length===0){
    var style = document.createElement('link');
    style.id = "scanAppCss";
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = 'https://robinsandday.github.io/knackjs/document.css?'+nowS;
    document.getElementsByTagName( 'head' )[0].appendChild( style )
  }

  function emptyCallback() { }

  function loadScript(src, id,  callback){
    var script, scriptTag;
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = id;
    script.src = src;
    script.onload = script.onreadystatechange = function() {
      if (!this.readyState || this.readyState == 'complete' ){ callback(); }
    };
    scriptTag = document.getElementsByTagName('script')[0];
    scriptTag.parentNode.insertBefore(script, scriptTag);
  }
  if ($('#scanAppJS').length===0){
    loadScript("https://robinsandday.github.io/knackjs/document.js?"+nowS,'scanAppJS', emptyCallback);
  }
  if ($('#jsPDF').length===0){
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.2.0/jspdf.umd.min.js','jsPDF', emptyCallback)
  }
}

function showScanApp(button){
  afterLoad(button.getAttribute('data-app_id'), button.getAttribute('data-pdfassetfield'));
  $('#scanApp').show();
  $('.kn-content').hide();
}

function hideScanApp(){
  $('#scanApp').hide();
  $('.kn-content').show();
}

function fillDataToKnack(message){
  hideScanApp();
  $('input[name="'+message.pdfAssetField+'"]').val(message.pdfAssetId);
  $('div[id="kn-input-'+message.pdfAssetField+'"] div[class="kn-asset-current"]').html(message.fileName);
  $('#'+message.pdfAssetField+'_upload').hide();
  $('.kn-file-upload').html('File uploaded successfully.');
}

//END OF SCAN APP CODE

//THIS IS ARRAY OF scenes with document scan
var scanDocsSceneNames = ["scene_931","scene_959", "scene_952", "scene_984", "scene_957", "scene_967", "scene_972", "scene_973", "scene_979", "scene_976", "scene_981", "scene_980", 
			 "scene_1066", "scene_978", "scene_979", "scene_964", "scene_862", "scene_1068"];
scanDocsSceneNames.forEach(scanDocsLinkFunction);
function scanDocsLinkFunction(selector_view){
  $(document).on("knack-scene-render." + selector_view, function(event, view, data) {
    embedScanApp();
    if ($('button[id="scanDocument"]').length>0){
      for (let i = 0;i<$('button[id="scanDocument"]').length;i++){
        $('button[id="scanDocument"]').eq(i).on("click",function(){
          showScanApp(this);
        });
      }
    }
  });
}  

// ----------  refresh Sales Manager To Do (New Deal File Admin) Table every 50 seconds but not the page itself  ----------

$(document).on('knack-scene-render.scene_989', function(event, scene) {
 recursivecall();
});

function recursivecall(){
 setTimeout(function () { if($("#view_3766").is(":visible")==true){ Knack.views["view_3766"].model.fetch();recursivecall();} }, 50000);
}

// ----------  refresh Sales Admin To Do (New Deal File Admin) Table every 50 seconds but not the page itself  ----------

$(document).on('knack-scene-render.scene_989', function(event, scene) {
 recursivecall();
});

function recursivecall(){
 setTimeout(function () { if($("#view_3767").is(":visible")==true){ Knack.views["view_3767"].model.fetch();recursivecall();} }, 50000);
}

// NEW DEAL FILE – TRIGGER INTEGROMAT UPON CUSTOMER SURVEY FORM COMPLETION
$(document).on('knack-form-submit.view_2765', function(event, view, data) { 
	let commandURL = "https://hook.integromat.com/lnunp83lom13c9swu0vgabmurbjxj5x6" ;
  let dataToSend = JSON.stringify({"recordid":data.id,"field_6481_raw":data.field_6481_raw,"typeOfCustomerSurvey":"NEW","ConnectedDealer":data.field_6476_raw,"SalesAdvisor":data.field_6488_raw,"MaserAppDealerID":data.field_6678_raw})
  //or theoretically to have all data from form 
  //let dataToSend = Object.assign(data,{"typeOfCustomerSurvey":"NEW"}); 
  var rData = $.ajax({
    url: commandURL,
    type: 'POST',
    contentType: 'application/json',
    data: dataToSend,
    async: false
  }).responseText;
  console.log(rData);
});

$(document).on('knack-view-render.view_3633', function(event, view, data) {
  function pad(n) {return n < 10 ? "0"+n : n;}
  function dateTimeToGB(dateobj){
    return pad(dateobj.getDate())+"/"+pad(dateobj.getMonth()+1)+"/"+dateobj.getFullYear()+' '+pad(dateobj.getHours())+':'+pad(dateobj.getMinutes());
  }
  try {
    let checkedDateSpanCitroen = document.createElement('span');
    checkedDateSpanCitroen.innerHTML = 'Loading date ...';
    checkedDateSpanCitroen.setAttribute("id", "checkedDateSpanCitroen");
    document.getElementById('view_3633').getElementsByClassName('kn-description')[0].appendChild(checkedDateSpanCitroen);
    $.ajax({url:'https://api.apify.com/v2/key-value-stores/MGAH5Tr9TFctDnMTD/records/registration_Citroen', success: function(data){
      let dateFromData = new Date(data);
      $('span[id="checkedDateSpanCitroen"]').text('Citroen: '+dateTimeToGB(dateFromData)+'  ');
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log("error. textStatus: %s  errorThrown: %s", textStatus, errorThrown);
    }, async:true, context:this, cache: false, timeout: 15000});

    let checkedDateSpanPeugeot = document.createElement('span');
    checkedDateSpanPeugeot.innerHTML = 'Loading date ...';
    checkedDateSpanPeugeot.setAttribute("id", "checkedDateSpanPeugeot");
    document.getElementById('view_3633').getElementsByClassName('kn-description')[0].appendChild(checkedDateSpanPeugeot);
    $.ajax({url:'https://api.apify.com/v2/key-value-stores/MGAH5Tr9TFctDnMTD/records/registration_Peugeot', success: function(data){
      let dateFromData = new Date(data);
      $('span[id="checkedDateSpanPeugeot"]').text('Peugeot: '+dateTimeToGB(dateFromData)+'  ');
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log("error. textStatus: %s  errorThrown: %s", textStatus, errorThrown);
    }, async:true, context:this, cache: false, timeout: 15000});

    let checkedDateSpanDS = document.createElement('span');
    checkedDateSpanDS.innerHTML = 'Loading date ...';
    checkedDateSpanDS.setAttribute("id", "checkedDateSpanDS");
    document.getElementById('view_3633').getElementsByClassName('kn-description')[0].appendChild(checkedDateSpanDS);
    $.ajax({url:'https://api.apify.com/v2/key-value-stores/MGAH5Tr9TFctDnMTD/records/registration_DS', success: function(data){
      let dateFromData = new Date(data);
      $('span[id="checkedDateSpanDS"]').text('DS: '+dateTimeToGB(dateFromData)+'  ');
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log("error. textStatus: %s  errorThrown: %s", textStatus, errorThrown);
    }, async:true, context:this, cache: false, timeout: 15000});
  } catch (ex){
    console.log('error',ex)
  }
});

//
//
//
//

// New Deal File - Digital P&L – Triggering integromat to capture PDF of profit and loss overview to upload to knack
$(document).on('knack-form-submit.view_3855', function(event, view, data) {
    
    console.log("Test 2");
    try{
        let commandURL = "https://hook.integromat.com/ue6mctvmfbukksn2battr5cqtgnx135v";
        let dataToSend = JSON.stringify({"Record ID":data.id, "Payload": data, "Form": "NEW P&L", "Source Of Payload":"knack direct"});

      var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;
      
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "New Deal File - Digital P&L – Triggering integromat to capture PDF of profit and loss overview to upload to knack",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
});


// New Deal File - Capture PDFs – **New Deal File PDF - Customer satisfaction survey signed at dealer V2 {(Deal File) Customer Satisfaction Survey} Slave App - Replaces https://zapier.com/app/editor/116188221?redirect=true
$(document).on('knack-form-submit.view_2765', function(event, view, data) { 
    
    
    try{
        

      if(data.field_6485_raw !== null && data.field_6485_raw !== undefined){

            let commandURL = "https://hook.integromat.com/ue6mctvmfbukksn2battr5cqtgnx135v";
            let dataToSend = JSON.stringify({"Record ID":data.id, "Form":"Customer satisfaction survey", "Source Of Payload":"knack direct"});

             var rData = $.ajax({
                url: commandURL,
                type: 'POST',
                contentType: 'application/json',
                data: dataToSend,
                async: false
              }).responseText;

      }
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "New Deal File PDF - Customer satisfaction survey signed at dealer V2 {(Deal File) Customer Satisfaction Survey} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;  
    }
});



// New Deal File – **Instant Trigger For Integromat to GET Digital P/X Appraisal For New Digital Deal File Upon Form Submission within Deal File P/X View {(Deal File) Digital Deal File} Slave App - Replaces https://zapier.com/app/editor/116816484?redirect=true
$(document).on('knack-form-submit.view_2584', function(event, view, data) {
    
    
    try{
    // Searching an undefined collection/aray will result in an exception and the javascript will stop execution!
    function handlAll(valueA, collectionIndex, fieldName){ 
        return (valueA? valueA[collectionIndex][fieldName]:"");//This tests if valueA is not null or undefined, if yes it returns empty string, otherwise it returns property of fieldName of valueA
    }

    let commandURL = "https://hook.integromat.com/o8f4wtbtada9lh4bzgj34o3qc0dpa3dx";
    let createData = {"Knack Digital Deal File ID":data.id, "Connected Dealer":handlAll(data.field_6048_raw, "0", "identifier"),"Dealer ID From Master App":data.field_6257_raw,"Part Exchange 1":data.field_6125_raw,
  "Part Exchange 3":data.field_6127_raw, "Part Exchange 2":data.field_6126_raw, "Source Of Payload":"knack direct"};
 
    function deleteEmpty(objectA){
        
                for (const [key, value] of Object.entries(objectA)) {
                    if (value === undefined || value === null || value === ""){
                        delete objectA[key];
                    }
                }
                return objectA;
            }
            //Iterate through all the values contained in createData and deletesany undefined object properties
            //Will create the final form of the data sent using POST
            let dataToSend = JSON.stringify(deleteEmpty(createData));

    var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
    }).responseText;
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"ID":data.id, "Source":"Javascript error", "Function": "Instant Trigger For Integromat to GET Digital P/X Appraisal For New Digital Deal File Upon Form Submission within Deal File P/X View {(Deal File) Digital Deal File} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
});



// New Deal File – **New Deal File - Sign Online Feature Activated {(Deal File) Digital Deal File} Slave App - Replaces https://zapier.com/app/editor/116816484?redirect=true
$(document).on('knack-form-submit.view_3750', function(event, view, data) { 
    
    try{
    let commandURL = "https://hook.integromat.com/891sve7f9q43lop42hpsa1wkt61qqfjy";
    let dataToSend = JSON.stringify({"Record ID":data.id, "Source Of Payload":"knack direct"});
 
      var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;
  }catch(exception){
      console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "New Deal File - Sign Online Feature Activated {(Deal File) Digital Deal File} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;   
  }
});

// New Deal File – **New deal File Zip Folder to email customers(Send directly to customer email address) {(Deal File) Digital Deal File} Slave App - Replaces https://zapier.com/app/editor/109007166?redirect=true
$(document).on('knack-form-submit.view_3567', function(event, view, data) { 
    
    try{
    let commandURL = "https://hook.integromat.com/myx89w3wyjsq3plni1yftp4h7ngv3o5p";
    let dataToSend = JSON.stringify({"Record ID":data.id, "Source Of Payload":"knack direct"});
 
      var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;
  }catch(exception){
      console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "New deal File Zip Folder to email customers(Send directly to customer email address) {(Deal File) Digital Deal File} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;   
  }
});


// New Deal File – **Trigger For Integromat Upon New Vehicle Handover Form Submission {(Deal File) Digital Deal File} Slave App - Replaces https://zapier.com/app/editor/73986254?redirect=true
// "Telephone No 4 ":data.field_6105_raw, THE NAME WAS DECLARED WITH A SPACE IN THE ZAPIER!
$(document).on('knack-form-submit.view_2630', function(event, view, data) {
    
    try{
        
 
	    console.log("Test 3");
        console.log(data.field_7197_raw);
        console.log(data.field_7197_raw[0]);
        console.log(data.field_7197_raw[0]["identifier"]);
    // Searching an undefined collection/aray will result in an exception and the javascript will stop execution!
    function handlAll(valueA, fieldName){ 
        return (valueA? valueA[fieldName]:"");//This tests if valueA is not null or undefined, if yes it returns empty string, otherwise it returns property of fieldName of valueA
    }
    
    function handlArrayID(valueA, indexNumber, fieldName){
        return ((valueA || valueA[indexNumber] || valueA[indexNumber][fieldName])? valueA[indexNumber][fieldName]:"");
    }
    
    function handlArray(valueA){
        if (Array.isArray(valueA)){
            
            for (var i = 0; i < valueA.length; i++) {
                
                if(typeof valueA[i] !== "undefined" && valueA[i] !== null){
                    return valueA[i];
                    }
                }
        }else{
            return data.field_6553_raw;
        }
    }
    
    //function to create the address string
    function handlAddress(valueA){
        if (typeof valueA !== "undefined" && valueA !== null){
            
            function handlData (valueB, stringB){
                return (typeof valueB === "undefined" || valueB === null || valueB === "" || valueB === " ") ? "" : valueB + stringB;
            }
            
            return handlData(handlAll(valueA, "street"), ", ") + handlData(handlAll(valueA, "street2"), ", ") + handlData(handlAll(valueA, "city"), ", ") + 
                    handlData(handlAll(valueA, "state"), " ") + handlData(handlAll(valueA, "zip"), "");
            
        }else{
            return "";
        }
    }

        var dateTime = "";
        if(typeof data.field_6277_raw !== undefined && typeof data.field_6277_raw !== null){
            
            var num = data.field_6277_raw.time;
            var hours = (num / 60);
            var rhours = Math.floor(hours);
            var minutes = (hours - rhours) * 60;
            var rminutes = Math.round(minutes);
            var time =  rhours.toString().padStart(2, '0') + ":" + rminutes.toString().padStart(2, '0');
            dateTime = data.field_6277_raw.date_formatted + " " + time;   
        }

        function handlSRC (valueC){
            return (valueC? "<img src=" + "\"" + valueC + "\"" + " />": "");
        }
    let commandURL = "https://hook.integromat.com/ajxkfooskhy153u7ebtlipjmcfyp8guh";
    
    
    var createData = {"Knack Record ID From New Vehicle Deal File":data.id, "Customer Address (Autoline Showroom)":handlAddress(data.field_6100_raw), "Autoline Showroom Order Number":data.field_6109_raw,
      "Customer Name (Autoline Showroom)":data.field_6159_raw, "Telephone No 1 (Autoline Showroom)":handlAll(data.field_6101_raw, "formatted"), "Customer Name (Dialog":data.field_6070_raw, "Telephone No 4 (Autoline Showroom)":handlAll(data.field_6105_raw, "formatted"), 
      "Telephone No 3 (Autoline Showroom)":handlAll(data.field_6104_raw, "formatted"), "Telephone No 4 ":handlAll(data.field_6105_raw, "formatted"), "Customer Phone (Dialog)":data.field_6052_raw, "Vehicle Description (Autoline Showroom)":data.field_6110_raw, 
      "Vehicle Description (Dialog)":data.field_6281_raw, "Dealer ID from Master App":data.field_6257_raw, "Sales Adviser Email Linked to this order":handlAll(data.field_6280_raw, "email"), "Customer Email (Dialog)":handlAll(data.field_6102_raw, "email"),
      "Front 3/4 Image":handlSRC(data.field_6279_raw), "Telephone No 2 (Autoline Showroom)":handlAll(data.field_6103_raw, "formatted"), "Customer Address (Dialog)":data.field_6051_raw, "Customer Secondary Email address from Portal creation":data.field_6078_raw, 
      "Key Tag Number":data.field_6267_raw, "Date of customer handover":dateTime, "Customer Email (Autoline)":handlAll(data.field_6102_raw, "email"), "Handover Notes":data.field_6278_raw, "Enquiry Max or Showroom Order":handlArray(data.field_6553_raw),
      "Stock Number":data.field_6115_raw, "Handover Appointment Record ID from Master App":data.field_6628_raw, "Source Of Payload":"knack direct", "Valet Type": handlArrayID(data.field_7197_raw, "0", "identifier") };
 
   
    function deleteEmpty(objectA){
        
        for (const [key, value] of Object.entries(objectA)) {
            if (value === undefined || value === null || value === ""){
                delete objectA[key];
            }
        }
        return objectA;
    }
    //Iterate through all the values contained in createData and replaces any undefined values with ""
    //Will create the final form of the data sent using POST
    let dataToSend = JSON.stringify(deleteEmpty(createData));

    var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
    }).responseText;
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"ID":data.id, "Source":"Javascript error", "Function": "New Deal File – **Trigger For Integromat Upon New Vehicle Handover Form Submission {(Deal File) Digital Deal File} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText; 
    }
});





// New Deal File – **Trigger GET New Vehicle Order from Showroom or Enquiry Max Scenario V3 {(Deal File) Digital Deal File} Slave App - Replaces https://zapier.com/app/editor/95033758?redirect=true
$(document).on('knack-form-submit.view_2828', function(event, view, data) { 
    
    try{
      if(data.field_6553_raw === "Showroom Order"){

        let commandURL = "https://hook.integromat.com/1ikhk4iopuuiwivpcpb58ulbsaey5x96";
        let dataToSend = JSON.stringify({"RecordID":data.id, "Source Of Payload":"knack direct"});
        
        var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;

      }else{

        let commandURL = "https://hook.integromat.com/4ps7dsjgushppofbwo4npmjdi8u0s8dw";
        let dataToSend = JSON.stringify({"RecordID":data.id, "Source Of Payload":"knack direct"});
        
        var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;
      }

      
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "Trigger GET New Vehicle Order from Showroom or Enquiry Max Scenario V3 {(Deal File) Digital Deal File} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
});



// New Deal File – **Trigger Integromat to GET New Vehicle Invoice From Autoline V2 {(Deal File) Digital Deal File} Slave App - Replaces https://zapier.com/app/editor/89782269?redirect=true
$(document).on('knack-form-submit.view_2855', function(event, view, data) { 
    
    
     try{  
         
    
        // Searching an undefined collection/aray will result in an exception and the javascript will stop execution!
        function handlAll(valueA, indexA, fieldName){ 
            return (valueA? valueA[indexA][fieldName]:"");//This tests if valueA is not null or undefined, if yes it returns empty string, otherwise it returns property of fieldName of valueA
        }

        let commandURL = "https://hook.integromat.com/c81bcra3lmhe7dlj3dvbcev551frqdf3";
        var createData = {"Knack Deal File ID":data.id, "Dealer":handlAll(data.field_6048_raw, "0", "identifier"), "New Vehicle Stockbook Number from Showroom":data.field_6115_raw, "Source Of Payload":"knack direct"};

        function deleteEmpty(objectA){
        
                for (const [key, value] of Object.entries(objectA)) {
                    if (value === undefined || value === null || value === ""){
                        delete objectA[key];
                    }
                }
                return objectA;
            }
            //Iterate through all the values contained in createData and deletesany undefined object properties
            //Will create the final form of the data sent using POST
            let dataToSend = JSON.stringify(deleteEmpty(createData));

        var rData = $.ajax({
            url: commandURL,
            type: 'POST',
            contentType: 'application/json',
            data: dataToSend,
            async: false
        }).responseText;
    
     }catch(exception){
         console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "Trigger Integromat to GET New Vehicle Invoice From Autoline V2 {(Deal File) Digital Deal File} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
     }
  
});




// New Deal File – **Trigger Refresh New Vehicle Order from Deal File Page V2 {(Deal File) Digital Deal File} Slave App - Replaces https://zapier.com/app/editor/95037338?redirect=true
$(document).on('knack-form-submit.view_2854', function(event, view, data) { 
    
    try{

      if(data.field_6553_raw === "Showroom Order"){

        let commandURL = "https://hook.integromat.com/1ikhk4iopuuiwivpcpb58ulbsaey5x96";
        let dataToSend = JSON.stringify({"RecordID":data.id, "Source Of Payload":"knack direct"});
        
        var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;

      }else{

        let commandURL = "https://hook.integromat.com/4ps7dsjgushppofbwo4npmjdi8u0s8dw";
        let dataToSend = JSON.stringify({"RecordID":data.id, "Source Of Payload":"knack direct"});
        
        var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;
      }

  
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "Trigger Refresh New Vehicle Order from Deal File Page V2 {(Deal File) Digital Deal File} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;  
    } 
});



// New Deal File - Automated Comms – **New Deal File Automated Comms - Handover Appointment {{(Deal File) Digital Deal File} Slave App - Replaces https://zapier.com/app/editor/102282638?redirect=true
$(document).on('knack-form-submit.view_2630', function(event, view, data) { 
    
    try{

        let commandURL = "https://hook.integromat.com/27gimyyfnsdz3jfji1q5b4ag65xx9wzc";
        let dataToSend = JSON.stringify({"Record ID":data.id, "Trigger":"Handover Appointment", "Source Of Payload":"knack direct"});

      var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;
  
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "New Deal File Automated Comms - Handover Appointment {{(Deal File) Digital Deal File} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText; 
    }
});


// New Deal File – **Instant Trigger For Integromat to GET Digital P/X Appraisal For New Digital Deal File Upon Form Submission {(Deal File) Digital Deal File} Slave App - Replaces https://zapier.com/app/editor/72890073?redirect=true
$(document).on('knack-form-submit.view_2574', function(event, view, data) { 
    
    try{
        // Searching an undefined collection/aray will result in an exception and the javascript will stop execution!
        function handlAll(valueA, indexA, fieldName){ 
            return (valueA? valueA[indexA][fieldName]:"");//This tests if valueA is not null or undefined, if yes it returns empty string, otherwise it returns property of fieldName of valueA
        }
        
        

        let commandURL = "https://hook.integromat.com/o8f4wtbtada9lh4bzgj34o3qc0dpa3dx";
        var createData = {"Knack Digital Deal File ID":data.id, "Connected Dealer":handlAll(data.field_6048_raw,"0", "identifier"), "Dealer ID From Master App":data.field_6257_raw, "Part Exchange 1":data.field_6125_raw,
      "Part Exchange 3":data.field_6127_raw, "Part Exchange 2":data.field_6126_raw, "Source Of Payload":"knack direct"};

        function deleteEmpty(objectA){
        
                for (const [key, value] of Object.entries(objectA)) {
                    if (value === undefined || value === null || value === ""){
                        delete objectA[key];
                    }
                }
                return objectA;
            }
            //Iterate through all the values contained in createData and deletesany undefined object properties
            //Will create the final form of the data sent using POST
            let dataToSend = JSON.stringify(deleteEmpty(createData));

        var rData = $.ajax({
            url: commandURL,
            type: 'POST',
            contentType: 'application/json',
            data: dataToSend,
            async: false
        }).responseText;
    }catch (exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"ID":data.id, "Source":"Javascript error", "Function": "Instant Trigger For Integromat to GET Digital P/X Appraisal For New Digital Deal File Upon Form Submission {(Deal File) Digital Deal File} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
});



// New Deal File - Automated Comms – **New Deal File Automated Comms - New Vehicle Checked In {(Deal File) Vehicle Check In, Documents and Status} Slave App - Replaces https://zapier.com/app/editor/101944107?redirect=true
$(document).on('knack-form-submit.view_2692', function(event, view, data) { 
    
    try{

        let commandURL = "https://hook.integromat.com/27gimyyfnsdz3jfji1q5b4ag65xx9wzc";
        let dataToSend = JSON.stringify({"Record ID":data.id, "Trigger":"New Vehicle Check In", "Source Of Payload":"knack direct"});


      var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;
  
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "New Deal File Automated Comms - New Vehicle Checked In {(Deal File) Vehicle Check In, Documents and Status} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
});


// New Deal File - Automated Comms – **New Deal File Automated Comms - Profit & Loss Updated {(Deal File) Digital Deal File} Slave App - Replaces https://zapier.com/app/editor/102278316?redirect=true
$(document).on('knack-form-submit.view_2680', function(event, view, data) { 
    
    try{

        let commandURL = "https://hook.integromat.com/27gimyyfnsdz3jfji1q5b4ag65xx9wzc";
        let dataToSend = JSON.stringify({"Record ID":data.id, "Trigger":"Profit & Loss Updated", "Source Of Payload":"knack direct"});


      var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;
    }catch(exception){
        
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "New Deal File Automated Comms - Profit & Loss Updated {(Deal File) Digital Deal File} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    } 
});


// New Deal File - Automated Comms – **New Deal File Automated Comms - Profit & Loss Uploaded {(Deal File) Digital Deal File} Slave App- Replaces https://zapier.com/app/editor/102172889?redirect=true
$(document).on('knack-form-submit.view_2602', function(event, view, data) { 
    
    try{

        let commandURL = "https://hook.integromat.com/27gimyyfnsdz3jfji1q5b4ag65xx9wzc";
        let dataToSend = JSON.stringify({"Record ID":data.id, "Trigger":"Profit & Loss Uploaded", "Source Of Payload":"knack direct"});

      var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;
  
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "New Deal File Automated Comms - Profit & Loss Uploaded {(Deal File) Digital Deal File} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    } 
});


// New Deal File - Automated Comms – **New Deal File Automated Comms - Registration Consent Doc (AFRL) {(Deal File) Digital Deal File} Slave App - Replaces https://zapier.com/app/editor/102296823?redirect=true
$(document).on('knack-form-submit.view_2705', function(event, view, data) { 
    
    try{

       let commandURL = "https://hook.integromat.com/27gimyyfnsdz3jfji1q5b4ag65xx9wzc";
       let dataToSend = JSON.stringify({"Record ID":data.id, "Trigger":"Registration Consent Doc", "Source Of Payload":"knack direct"});

      var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;
  
    }catch(exception){
        
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "New Deal File Automated Comms - Registration Consent Doc (AFRL) {(Deal File) Digital Deal File} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
});



// New Deal File - Automated Commsv – **New Deal File Automated Comms - Vehicle Delivered and Deal File Contents Status {(Deal File) Digital Deal File} Slave App - Replaces https://zapier.com/app/editor/111571812?redirect=true
$(document).on('knack-form-submit.view_3620', function(event, view, data) { 
    
    try{

      if(data.field_6768_raw === "Vehicle Delivered and Deal File Contents Complete"){

        let commandURL = "https://hook.integromat.com/27gimyyfnsdz3jfji1q5b4ag65xx9wzc";
        let dataToSend = JSON.stringify({"Record ID":data.id, "Trigger":"Vehicle Delivered and Deal File Contents Complete", "Source Of Payload":"knack direct"});

        var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;

      }else if(data.field_6768_raw === "Vehicle Delivered"){

        let commandURL = "https://hook.integromat.com/27gimyyfnsdz3jfji1q5b4ag65xx9wzc";
        let dataToSend = JSON.stringify({"Record ID":data.id, "Trigger":"Vehicle Delivered", "Source Of Payload":"knack direct"});

        var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;

      }else{

        let commandURL = "https://hook.integromat.com/27gimyyfnsdz3jfji1q5b4ag65xx9wzc";
        let dataToSend = JSON.stringify({"Record ID":data.id, "Trigger":"Deal File Contents Complete", "Source Of Payload":"knack direct"});

        var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;

      }

  
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "New Deal File Automated Comms - Vehicle Delivered and Deal File Contents Status {(Deal File) Digital Deal File} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
  
});


// New Deal File - Automated Comms – **New Deal File Automated Comms - Vehicle Invoice Retrieved {(Deal File) Digital Deal File} Slave App - Replaces https://zapier.com/app/editor/102299451?redirect=true
$(document).on('knack-form-submit.view_2855', function(event, view, data) { 
    
    
    try{

        let commandURL = "https://hook.integromat.com/27gimyyfnsdz3jfji1q5b4ag65xx9wzc";
        let dataToSend = JSON.stringify({"Record ID":data.id, "Trigger":"Vehicle Invoice", "Source Of Payload":"knack direct"});


      var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;
  
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "New Deal File Automated Comms - Vehicle Invoice Retrieved {(Deal File) Digital Deal File} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
});




// New Deal File - Capture PDFs – **New Deal File PDF - Customer satisfaction survey signed online by Customer {(Deal File) Customer Satisfaction Survey} Slave App - Replaces https://zapier.com/app/editor/116187423?redirect=true
$(document).on('knack-form-submit.view_3702', function(event, view, data) { 
    
    try{

        let commandURL = "https://hook.integromat.com/ue6mctvmfbukksn2battr5cqtgnx135v";
        let dataToSend = JSON.stringify({"Record ID":data.id, "Form":"Customer satisfaction survey", "Source Of Payload":"knack direct"});

      var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;
  
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "New Deal File PDF - Customer satisfaction survey signed online by Customer {(Deal File) Customer Satisfaction Survey} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    } 
});



// New Deal File - Capture PDFs – **New Deal File PDF - Merge PRE Sale Pack and Customer Signature {(Deal File) Digital Deal File} Slave App - Replaces https://zapier.com/app/editor/116785534?redirect=true
$(document).on('knack-form-submit.view_3685', function(event, view, data) { 
    
    try{

        let commandURL = "https://hook.integromat.com/6aee4yo8i2g1chdo9hphjnaw4n42ldor";
        let dataToSend = JSON.stringify({"Record ID":data.id, "Form":"Pre Sale Pack", "Source Of Payload":"knack direct"});

      var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;
  
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "New Deal File PDF - Merge PRE Sale Pack and Customer Signature {(Deal File) Digital Deal File} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
  
});



// New Deal File - Capture PDFs – **New Deal File PDF - New Vehicle handover checklist signed at Dealer OR to be signed remotely {(Deal File) New Vehicle Handover Checklist} Slave App - Replaces https://zapier.com/app/editor/100712090?redirect=true
$(document).on('knack-form-submit.view_2757', function(event, view, data) { 
    
    try{

        let commandURL = "https://hook.integromat.com/ue6mctvmfbukksn2battr5cqtgnx135v";
        let dataToSend = JSON.stringify({"Record ID":data.id, "Form":"New vehicle handover checklist", "Source Of Payload":"knack direct"});

      var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;
      
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "New Deal File PDF - New Vehicle handover checklist signed at Dealer OR to be signed remotely {(Deal File) New Vehicle Handover Checklist} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
});



// New Deal File - Capture PDFs – **New Deal File PDF - New Vehicle handover checklist signed online by Customer {(Deal File) New Vehicle Handover Checklist} Slave App - Replaces https://zapier.com/app/editor/116189095?redirect=true
$(document).on('knack-form-submit.view_3693', function(event, view, data) { 
    
    try{

        let commandURL = "https://hook.integromat.com/ue6mctvmfbukksn2battr5cqtgnx135v";
        let dataToSend = JSON.stringify({"Record ID":data.id, "Form":"New vehicle handover checklist", "Source Of Payload":"knack direct"});

      var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;
  
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "New Deal File PDF - New Vehicle handover checklist signed online by Customer {(Deal File) New Vehicle Handover Checklist} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
  
});



// New Deal File - Capture PDFs – **New Deal File PDF - Part Ex Purchase Invoice signed at dealer or to be signed remotely {(Deal File) Customer Part Exchange Invoice} Slave App - Replaces https://zapier.com/app/editor/100725890?redirect=true
$(document).on('knack-form-submit.view_2822', function(event, view, data) {
    
    try{
    
        let commandURL = "https://hook.integromat.com/ue6mctvmfbukksn2battr5cqtgnx135v";
        let dataToSend = JSON.stringify({"Record ID":data.id, "Form":"Part exchange purchase invoice", "Source Of Payload":"knack direct"});

      var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;
      
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "New Deal File PDF - Part Ex Purchase Invoice signed at dealer or to be signed remotely {(Deal File) Customer Part Exchange Invoice} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
});


// New Deal File - Capture PDFs – **New Deal File PDF - Part Ex Purchase Invoice signed online by Customer {(Deal File) Customer Part Exchange Invoice} Slave App - Replaces https://zapier.com/app/editor/116189304?redirect=true
$(document).on('knack-form-submit.view_3683', function(event, view, data) {
    
    try{

        let commandURL = "https://hook.integromat.com/ue6mctvmfbukksn2battr5cqtgnx135v";
        let dataToSend = JSON.stringify({"Record ID":data.id, "Form":"Part exchange purchase invoice", "Source Of Payload":"knack direct"});


      var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;
  
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "New Deal File - Capture PDFs – **New Deal File PDF - Part Ex Purchase Invoice signed online by Customer {(Deal File) Customer Part Exchange Invoice} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
});


// New Deal File - Capture PDFs – **New Deal File PDF - Service Schedule signed at dealer or to be signed remotely {(Deal File) Digital Deal File} Slave App - Replaces https://zapier.com/app/editor/100698595?redirect=true
$(document).on('knack-form-submit.view_2778', function(event, view, data) {
    
    try{

       let commandURL = "https://hook.integromat.com/ue6mctvmfbukksn2battr5cqtgnx135v";
       let dataToSend = JSON.stringify({"Record ID":data.id, "Form":"Service schedule", "Source Of Payload":"knack direct"});


      var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;
  
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "New Deal File - Capture PDFs – **New Deal File PDF - Service Schedule signed at dealer or to be signed remotely {(Deal File) Digital Deal File} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
  
});


// New Deal File - Capture PDFs – **New Deal File PDF - Service Schedule signed online by Customer {(Deal File) Digital Deal File} Slave App - Replaces https://zapier.com/app/editor/116190873?redirect=true
$(document).on('knack-form-submit.view_3690', function(event, view, data) {
    
    
    try{
    
    let commandURL = "https://hook.integromat.com/ue6mctvmfbukksn2battr5cqtgnx135v";
    let dataToSend = JSON.stringify({"Record ID":data.id, "Form":"Service schedule", "Source Of Payload":"knack direct"});
 
  var rData = $.ajax({
    url: commandURL,
    type: 'POST',
    contentType: 'application/json',
    data: dataToSend,
    async: false
  }).responseText;
  
  
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "New Deal File PDF - Service Schedule signed online by Customer {(Deal File) Digital Deal File} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
  
});

// New Deal File - Capture PDFs – **New Deal File PDF - Vehicle Invoice signed at dealer or to be signed remotely {(Deal File) Digital Deal File} Slave App - Replaces https://zapier.com/app/editor/100708580?redirect=true
$(document).on('knack-form-submit.view_2674', function(event, view, data) {
    
    try{
        
        if(data.field_6567_raw === null || data.field_6567_raw === undefined){


            let commandURL = "https://hook.integromat.com/ue6mctvmfbukksn2battr5cqtgnx135v";
            let dataToSend = JSON.stringify({"Record ID":data.id, "Form":"Vehicle invoice", "Source Of Payload":"knack direct"});



            var rData = $.ajax({
                url: commandURL,
                type: 'POST',
                contentType: 'application/json',
                data: dataToSend,
                async: false
              }).responseText;

        }
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "New Deal File PDF - Vehicle Invoice signed at dealer or to be signed remotely {(Deal File) Digital Deal File} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
});


// New Deal File - **New Deal File PDF - Vehicle Invoice signed online by Customer {(Deal File) Digital Deal File} Slave App - Replaces https://zapier.com/app/editor/116194118?redirect=true
$(document).on('knack-form-submit.view_3680', function(event, view, data) {
     
    try{
    
        let commandURL = "https://hook.integromat.com/ue6mctvmfbukksn2battr5cqtgnx135v";
        let dataToSend = JSON.stringify({"Record ID":data.id, "Form":"Vehicle invoice", "Source Of Payload":"knack direct"});

      var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;
      
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "New Deal File PDF - Vehicle Invoice signed online by Customer {(Deal File) Digital Deal File} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
  
});


//**New Deal File PDF - Merge POST Sale Pack and Customer Signature {(Deal File) Digital Deal File} Slave App https://zapier.com/app/editor/116785934?redirect=true
$(document).on('knack-form-submit.view_3696', function(event, view, data) { 
    
    try{
    

        let commandURL = "https://hook.integromat.com/6aee4yo8i2g1chdo9hphjnaw4n42ldor";
        let dataToSend = JSON.stringify({"Record ID":data.id, "Form":"Post Sale Pack", "Source Of Payload":"knack direct"});

          var rData = $.ajax({
            url: commandURL,
            type: 'POST',
            contentType: 'application/json',
            data: dataToSend,
            async: false
          }).responseText;
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "New Deal File PDF - Merge POST Sale Pack and Customer Signature {(Deal File) Digital Deal File} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
});



//**Instant Trigger For Integromat to GET Digital P/X Appraisal For New Digital Deal File Upon Form Submission within Deal File P/X View {(Deal File) Digital Deal File} Slave App https://zapier.com/app/editor/73106017?redirect=true
$(document).on('knack-form-submit.view_2584', function(event, view, data) { 
    
    try{
    
        // Searching an undefined collection/aray will result in an exception and the javascript will stop execution!
        function handlAll(valueA, indexA, fieldName){ 
            return (valueA? valueA[indexA][fieldName]:"");//This tests if valueA is not null or undefined, if yes it returns empty string, otherwise it returns property of fieldName of valueA
        }
        
        let commandURL = "https://hook.integromat.com/o8f4wtbtada9lh4bzgj34o3qc0dpa3dx";
        var createData = {"Knack Digital Deal File ID":data.id, "Connected Dealer":handlAll(data.field_6048_raw,"0", "identifier"), "Dealer ID From Master App":data.field_6257_raw, "Part Exchange 1":data.field_6125_raw,
      "Part Exchange 3":data.field_6127_raw, "Part Exchange 2":data.field_6126_raw, "Source Of Payload":"knack direct"};


       function deleteEmpty(objectA){
        
                for (const [key, value] of Object.entries(objectA)) {
                    if (value === undefined || value === null || value === ""){
                        delete objectA[key];
                    }
                }
                return objectA;
            }
            //Iterate through all the values contained in createData and deletesany undefined object properties
            //Will create the final form of the data sent using POST
            let dataToSend = JSON.stringify(deleteEmpty(createData));

        var rData = $.ajax({
            url: commandURL,
            type: 'POST',
            contentType: 'application/json',
            data: dataToSend,
            async: false
        }).responseText;
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "Instant Trigger For Integromat to GET Digital P/X Appraisal For New Digital Deal File Upon Form Submission within Deal File P/X View {(Deal File) Digital Deal File} Slave App",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
});


// New Deal File - NEW P&L
$(document).on('knack-form-submit.view_3927', function(event, view, data) {
     
    try{
        let commandURL = "https://hook.integromat.com/ue6mctvmfbukksn2battr5cqtgnx135v";
        let dataToSend = JSON.stringify({"Record ID":data.id, "Payload": data, "Form": "NEW P&L"});

      var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;      
      
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "// NEW P&L",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
        
    }
});
