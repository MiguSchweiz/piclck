var mod=false;
var st=0;

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
    if ( wd[0]!="" ){
  		for (d in wd){
  			if ( wd[d] == 0 ){
  				$('#sun').attr('checked', true); 
  			}if ( wd[d] == 1 ){
  				$('#mon').attr('checked', true); 
  			}if ( wd[d] == 2 ){
  				$('#tue').attr('checked', true); 
  			}if ( wd[d] == 3 ){
  				$('#wed').attr('checked', true); 
  			}if ( wd[d] == 4 ){
  				$('#thu').attr('checked', true); 
  			}if ( wd[d] == 5 ){
  				$('#fri').attr('checked', true); 
  			}if ( wd[d] == 6 ){
  				$('#sat').attr('checked', true); 
  			} 
  		}
    }
		selectStation("#a_"+st);
	});
}

function eventHandlers(){
	$( "#atime" ).change(function() {
		buttonSet(true);
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
	$( id ).css("border-bottom-color","#3683DC");
}

function resetButtons(){
	$( "#a_1" ).css("border-bottom-color","#3A3F46");
	$( "#a_2" ).css("border-bottom-color","#3A3F46");
	$( "#a_3" ).css("border-bottom-color","#3A3F46");
	$( "#a_4" ).css("border-bottom-color","#3A3F46");
	$( "#a_5" ).css("border-bottom-color","#3A3F46");
}

function setAlarm(){
	time=$( "#atime" ).val().replace(":",";");
	wdy="";
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
	} 
	wdy=wdy.trim();
	conf=wdy+";"+time+";1;600;"+st;
	jQuery.get("set.php?data="+encodeURIComponent(conf), function(d) {
		console.log(d);
	});
}

function buttonSet(enabled){
	if (! enabled){
		$( "#bset" ).css("color", "#3683DC");
		$( "#bset" ).css("background-color", "#2E3238");
	}else{
		mod=true;
		$( "#bset" ).css("color", "#3A3F46");
		$( "#bset" ).css("background-color", "#3683DC");
	}
}

$(document).ready(function() {
	getAConf();
	buttonSet(false);
	eventHandlers();
	mouseListeners()
});
