var mod=false;
var st=0;
var init=false;
var sl=0;

function getAConf(){
	jQuery.get("get.php", function(d) {
		aconf=d.toString().split(";");
		wd=aconf[0].split(" ");
		hr=aconf[1];
		mn=aconf[2];
		en=aconf[3];
		ss=aconf[4];
		st=aconf[5];
		$('#atime').val(hr+":"+mn);
		$('#slum').val(ss);
		sl=ss;
		resetWeekDays();
		$('#cena').attr('checked', false);
		init=true;
    if ( wd[0]!="" ){
  		for (d in wd){
  			if ( wd[d] == 0 ){
  				$('#sun').click(); 
  			}if ( wd[d] == 1 ){
  				$('#mon').click(); 
  			}if ( wd[d] == 2 ){
  				$('#tue').click(); 
  			}if ( wd[d] == 3 ){
  				$('#wed').click(); 
  			}if ( wd[d] == 4 ){
  				$('#thu').click(); 
  			}if ( wd[d] == 5 ){
  				$('#fri').click(); 
  			}if ( wd[d] == 6 ){
  				$('#sat').click(); 
  			} 
  		}
    }
    if (en == 1){
      $("#cena").click();
    }
    alarmPanelSet();
		selectStation("#a_"+st);
		init=false;
	});
}

function resetWeekDays(){
  $('#sun').attr('checked', false); 
  $('#mon').attr('checked', false);  
  $('#tue').attr('checked', false);  
  $('#wed').attr('checked', false);  
  $('#thu').attr('checked', false);
  $('#fri').attr('checked', false);  
  $('#sat').attr('checked', false);
}
function checkNumber(nr){
  if (!parseInt(nr)){
    return sl;
  }else{
    if (nr<300){
      return sl;
    }
    buttonSet(true);
    return nr;
  }
}

function eventHandlers(){
  $( "#slum" ).on('keyup',function(e){
    if ( e.which == 13 ){
      document.activeElement.blur();
      $("#slum").blur();
    }
  });
  $( "#slum" ).change(function() {
    document.activeElement.blur();
    $("#slum").blur();
    $("#slum").val(checkNumber($("#slum").val()));
  });
	$( "#atime" ).change(function() {
		buttonSet(true);
	});
	$( "#cena" ).change(function(){
	  setAlarm();
	  alarmPanelSet();
	});
	$( "#mon" ).change(function() {
		buttonSet(true);
	});
	$( "#tue" ).change(function() {
		buttonSet(true);
	});
	$( "#wed" ).change(function() {
		buttonSet(true);
	});
	$( "#thu" ).change(function() {
		buttonSet(true);
	});
	$( "#fri" ).change(function() {
		buttonSet(true);
	});
	$( "#sat" ).change(function() {
		buttonSet(true);
	});
	$( "#sun" ).change(function() {
		buttonSet(true);
	});
}

function mouseListeners(){
	$( "#bset" ).mousedown(function() {
		if (mod){
			setAlarm();
			buttonSet(false);
			mod=false;
		}
	});
	$( "#a_1" ).mousedown(function() {
		selectStation("#a_1")
		buttonSet(true);
		st="1";
	});
	$( "#a_2" ).mousedown(function() {
		selectStation("#a_2")
		buttonSet(true);
		st="2";
	});
	$( "#a_3" ).mousedown(function() {
		selectStation("#a_3")
		buttonSet(true);		
		st="3";
	});
	$( "#a_4" ).mousedown(function() {
		selectStation("#a_4")	
		buttonSet(true);
		st="4";
	});
	$( "#a_5" ).mousedown(function() {
    selectStation("#a_5")	
		buttonSet(true);
		st="5";
	});
}

function selectStation(id){
	resetButtons();
	$( id ).css("border-bottom-color","#E6E6E6");
}

function resetButtons(){
	$( "#a_1" ).css("border-bottom-color","#3A3F46");
	$( "#a_2" ).css("border-bottom-color","#3A3F46");
	$( "#a_3" ).css("border-bottom-color","#3A3F46");
	$( "#a_4" ).css("border-bottom-color","#3A3F46");
	$( "#a_5" ).css("border-bottom-color","#3A3F46");
}

function setAlarm(){
  if (init){
    return;
  }
	time=$( "#atime" ).val().replace(":",";");
	wdy="";
	aen='0';
	if ( $("#sun").is(":checked")){
		wdy+="0 ";
	}if ( $("#mon").is(":checked")){
		wdy+="1 ";
	}if ( $("#tue").is(":checked")){
		wdy+="2 ";
	}if ( $('#wed').is(":checked")){
		wdy+="3 ";
	}if ( $('#thu').is(":checked")){
		wdy+="4 ";
	}if ( $('#fri').is(":checked")){
		wdy+="5 ";
	}if ( $('#sat').is(":checked")){
		wdy+="6 ";
	}if ( $("#cena").is(":checked")){
	  aen="1";
	}
	wdy=wdy.trim();
	slm=$( "#slum" ).val();
	sl=slm;
	conf=wdy+";"+time+";"+aen+";"+slm+";"+st;
	jQuery.get("set.php?data="+encodeURIComponent(conf), function(d) {
		//console.log(d);
	});
}

function buttonSet(enabled){
  if (init){
    return;
  }
	if (! enabled){
		$( "#bset" ).css("color", "#E6E6E6");
		$( "#bset" ).css("background-color", "#2E3238");
	}else{
		mod=true;
		$( "#bset" ).css("color", "#E6E6E6");
		$( "#bset" ).css("background-color", "#3683DC");
	}
}

function alarmPanelSet(){
  if ( $("#cena").is(":checked")){
    document.querySelectorAll(".alarms")[0].style.height=416+"px";
    $("#tena").text("Alarm");
  }else{
	  document.querySelectorAll(".alarms")[0].style.height=40+"px";
    $("#tena").text("Alarm disabled");
  }
}

function setWidth(){
  //$("#log").text(document.getElementById("alarms").offsetHeight);
  // Set weekdayselector width
  const element = document.getElementById("atime");
	var ow=element.offsetWidth;
	
	var wdwa=(ow-(6*5))/7;
	var wdw=Math.floor(wdwa);
	var temp = document.querySelectorAll(".lab");
  for (var i = 0; i < temp.length; i++) {
    temp[i].style.width = wdw+"px";
  }
  //set station selector width
  var sswa=(ow-(4*60))/3;
  var ssm=Math.floor(sswa);
  temp = document.querySelectorAll(".cs");
  for (var i = 0; i < temp.length; i++) {
    temp[i].style.paddingRight=ssm+"px";
  }
}

$(window).on( "resize", function(){
  setWidth();
});

$(document).ready(function() {
  setWidth();
  eventHandlers();
	getAConf();
	buttonSet(false);
	mouseListeners();

	
	//$( "#weekDays-selector").css("width",wdw+"px");
  //$( "#dwd").css("width",element.offsetWidth+10);
  //$( "#weekDays-selector").css("width",element.offsetWidth);
  //$( "#alarms").css("width",element.offsetWidth +40);
});
