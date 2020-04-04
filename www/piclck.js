var mod=false;


function getAConf(){
	jQuery.get("get.php", function(d) {
		aconf=d.toString().split(";");
		wd=aconf[0].split(" ");
		hr=aconf[1];
		mn=aconf[2];
		en=aconf[3];
		ss=aconf[4];
		$('#atime').val(hr+":"+mn);
		
		for (d in wd){
			if ( d == "0" ){
				$('#sun').attr('checked', true); 
			}else if ( d == "1" ){
				$('#mon').attr('checked', true); 
			}else if ( d == "2" ){
				$('#tue').attr('checked', true); 
			}else if ( d == "3" ){
				$('#wed').attr('checked', true); 
			}else if ( d == "4" ){
				$('#thu').attr('checked', true); 
			}else if ( d == "5" ){
				$('#fri').attr('checked', true); 
			}else if ( d == "6" ){
				$('#sat').attr('checked', true); 
			} 
		}	
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
	
	conf=wdy+";"+time+";1;600";
	console.log(conf);
	jQuery.get("set.php?data="+encodeURIComponent(conf), function(d) {
		console.log(d);
	});
}


function buttonSet(enabled){
	if (! enabled){
		$( "#bset" ).css("color", "#FFFFFF");
		$( "#bset" ).css("background-color", "#FA9127");
	}else{
		mod=true;
		$( "#bset" ).css("color", "#FA9127");
		$( "#bset" ).css("background-color", "#FFFFFF");
	}
}



$(document).ready(function() {
	getAConf();
	buttonSet(false);
	eventHandlers();
	mouseListeners()

});
