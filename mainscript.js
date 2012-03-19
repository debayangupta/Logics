function _gel(x) {return document.getElementById(x)}
var mutex = null;
var thing = {
	initialize: function() {
		
		this.fit = _gel('fit');
		
		this.ratio = 3/2; // w : h
		this.w = 1200;
		this.zoom = 1;
		
		this.box_size = 140;
		this.yale_size = 100;
		this.logics_size = 60;
		
		this.css = function(x) {
			var cssRules = document.styleSheets[0].cssRules || document.styleSheets[0].rules;
			for(var i=0; i<cssRules.length; i++)
				if( cssRules[i].selectorText.toLowerCase() == x.toLowerCase() )
					return cssRules[i].style;
			return null;
		}
	}
};
//----- Page creation functions -----
function createLinks() {
	var links = _gel('cut').getElementsByTagName('a');
	for(i=0; i<7; i++) {
		var x = _gel('x'+i);
		if(x) {
			x.loc = links[i];
			x.onclick = function(){window.location = this.loc};
		}
	}
}

function setSize() {
	var h = window.innerHeight || document.documentElement.clientHeight;
	var w = window.innerWidth || document.documentElement.clientWidth;

	if( w/h > thing.ratio ) {
		thing.fit.style.height = h + 'px';
		thing.fit.style.width = h*thing.ratio + 'px';
	}
	else {
		thing.fit.style.height = w/thing.ratio + 'px';
		thing.fit.style.width = w + 'px';
	}
	
	thing.zoom = parseInt(thing.fit.style.width) / thing.w;
	
	var box = thing.css('#main td');
	box.width = Math.floor(parseInt(thing.box_size) * thing.zoom) + 'px';
	box.height = box.width;
	_gel('Yale').style.fontSize = Math.floor(thing.yale_size*thing.zoom) + 'px';
	if(_gel('the')) _gel('the').style.fontSize = parseInt(_gel('Yale').style.fontSize)/3 + 'px';
	thing.css('#logics td').fontSize = Math.floor(thing.logics_size*thing.zoom) + 'px';
	alert(1);
}

window.onload = function() {
	createLinks();
	_gel('cut').parentNode.removeChild(_gel('cut'));
	thing.initialize();
	setSize();
	window.onresize = setSize;
}