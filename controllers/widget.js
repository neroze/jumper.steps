var args = arguments[0] || {};

var _babies = args.children;
var _slides = {};
_slides.pgNoWrapperleftPadding = "40%";
_slides.pgNoWidth = "20%";
_slides.pgHeight = "100%";
_slides.length = _babies.length;
_slides.current = 0;
_slides.height = 300;
_slides.top = 0;
_slides.autoIndex = 0;

if(typeof args.height == "undefined"){
	$.slidesContent.setHeight(_slides.height );
}else{
	$.slidesContent.setHeight( args.height );
}

if(typeof args.top == "undefined"){
	$.widgetView.setTop(_slides.top );
}else{
	$.widgetView.setTop( args.top );
}

if(typeof args.subTitleColor != "undefined"){
	$.subTitle.color = args.subTitleColor;

}

if(typeof args.mainTitleColor != "undefined"){
	$.mainTitle.color = args.mainTitleColor;

}



_slides.calcPageNoWidth = function() {

	if (_slides.length == 3) {
		_slides.pageNoWrapperWidth = "30%";
		_slides.mainWrapperPadding = "5%";
	} else {

		_slides.pageNoWrapperWidth = (100 / _slides.length);
		_slides.pageNoWrapperWidth  = (_slides.pageNoWrapperWidth).toString();
		_slides.pageNoWrapperWidth	= _slides.pageNoWrapperWidth.concat("%"); 
		_slides.mainWrapperPadding = 0;
	}
}


_slides.viewMaker = function(){
	$.stepHolder.setLeft(_slides.mainWrapperPadding);
	_.each( _babies, function(baby, _key){
		var _txt = _key;

		var labelWrapper = Titanium.UI.createView({
				width	:_slides.pageNoWrapperWidth
			});

			$.addClass(labelWrapper, 'cCard');
	
	  	var _label = Ti.UI.createLabel({
	      	left: _slides.pgNoWrapperleftPadding,
	      	backgroundColor:"#DDD",
	      	color 	:"#333",
	      	text 	:++_txt,
	      	right:0,
	      	index:_key,
	      	zIndex:2
	    });
	  
	  	$.addClass(_label, 'text-center w-20 h-20 fs10 img-circle-20');
	  	labelWrapper.add(_label);

	  	_slides.addProgressLines(_key, labelWrapper);
	  	$.stepHolder.add(labelWrapper);

	  	_label.addEventListener("click",function(e){
	  		
	  		_slides.slidePage(e);
	  	});

	  	// adding whole slide contents
	  	//baby.left = "100%";
	  	baby.setWidth('100%');
	  	$.slidesContent.add(baby);
	  	
	  	
	});


	
}

_slides.addProgressLines = function(_key, labelWrapper){
		
	  	var lineViewRT = Titanium.UI.createView({
				width	:'60%',
				right:0,
				zIndex:1,
				height:5,
				top:7,
				backgroundColor:"#DDD"
			});

	
	  	var lineViewLT = Titanium.UI.createView({
				width	: "60%",
				left:0,
				zIndex:1,
				height:5,
				top:7,
				backgroundColor:"#DDD",
				color:"green"
			});

	if(_key == 0){
		labelWrapper.add(lineViewRT);
		lineViewLT.backgroundColor = 'transparent';
		labelWrapper.add(lineViewRT);

	}else if((_slides.length -1) == _key){
		labelWrapper.add(lineViewLT);
	}else{
		labelWrapper.add(lineViewLT);
		labelWrapper.add(lineViewRT);
		
	}
}

_slides.highLightProgressLines = function(index){

	var before = ($.stepHolder.children).slice(0, ++index);

	_.each(before, function(item, key){
		var line = item.children;

		if(key == 0){
		
			line[1].setBackgroundColor("green");
			line[0].setBackgroundColor("green");
		}else if((before.length -1) == key){
			
			line[1].setBackgroundColor("green");
			line[0].setBackgroundColor("green");
		
		}else{
			line[0].setBackgroundColor("green");
			line[1].setBackgroundColor("green");
			line[2].setBackgroundColor("green");
			//line[2].setBackgroundColor("green");
		}
	});


}

_slides.normalizeProgressLines = function(index){
	var after = ($.stepHolder.children).slice(index);

	if(after.length > 0){
		_.each(after, function(item, key){
			var line = item.children;
			
			if(key == 0){
				if(typeof line[2] != "undefined"){
					line[2].setBackgroundColor("#DDD");
				}
				//line[0].setBackgroundColor("#DDD");

			}else if((after.length -1) == key){
				if(typeof line[1] != "undefined"){
					line[1].setBackgroundColor("#DDD");
				}
				line[0].setBackgroundColor("#DDD");
				
			}else{
				if(typeof line[1] != "undefined"){
					line[1].setBackgroundColor("#DDD");
				}
				if(typeof line[2] != "undefined"){
					line[2].setBackgroundColor("#DDD");
				}
				line[0].setBackgroundColor("#DDD");
			}
			
		});
	}

}

_slides.slidePage = function(e){
	_slides.pages = $.slidesContent.children;

	var index = e.source.index;

	_slides.pages[_slides.current].animate({
     left:"-100%",
      duration: 250
  	});
  
  	_slides.pages[index].animate({
     left:"0",
       duration: 250
  	});
  	_slides.current = index;

  	if(index > 0){
		_slides.highLightProgressLines(index);
	}
	_slides.normalizeProgressLines(index);
}

_slides.next = function(){
	var steps = $.stepHolder.children;
	if( _slides.autoIndex < steps.length){
		setTimeout(function(){
			( steps[++_slides.autoIndex].children )[0].fireEvent('click'); 
		}, 300);
	}
}

_slides.prev = function(){
	var steps = $.stepHolder.children;
	if( _slides.autoIndex > 0){
		setTimeout(function(){
			( steps[--_slides.autoIndex].children )[0].fireEvent('click'); 
		}, 300);
		
	}
}


$.next.addEventListener('click',function(){
	_slides.next();
});

$.prev.addEventListener('click',function(){
	_slides.prev();
});

_slides.calcPageNoWidth();
_slides.viewMaker();
