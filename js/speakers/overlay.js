/*(function() {
	var triggerBttn = document.getElementById( 'trigger-overlay' ),
		overlay = document.querySelector( 'div.speaker_overlay' ),
		closeBttn = overlay.querySelector( 'button.overlay-close' );
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	function toggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
		}
	}

	triggerBttn.addEventListener( 'click', toggleOverlay );
	closeBttn.addEventListener( 'click', toggleOverlay );
})(); */

/* Open */
function openNav() {
    document.getElementById("speaker_overlay").style.height = "60%";
    
    var allSpeakers = $(".blurred_speaker");
    var allTitles = $(".flex_title");
    var allButtons = $(".item_section_speakers figure button");
    
    allSpeakers.each(function(i, el) {
    var el = $(el);
        el.addClass("blurry");
    });
    allTitles.each(function(i, el) {
    var el = $(el);
        el.addClass("blurry_title");
    })
    allButtons.each(function(i, el) {
    var el = $(el);
        el.addClass("blurry_title");
    })
    
}

function closeNav() {
    document.getElementById("speaker_overlay").style.height = "0%";
    
    var allSpeakers = $(".blurred_speaker");
    var allTitles = $(".flex_title");
    var allButtons = $(".item_section_speakers figure button");
    
    allSpeakers.each(function(i, el) {
    var el = $(el);
        el.removeClass("blurry");
    });
    allTitles.each(function(i, el) {
    var el = $(el);
        el.removeClass("blurry_title");
    })
    allButtons.each(function(i, el) {
    var el = $(el);
        el.removeClass("blurry_title");
    })
}
