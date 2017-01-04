jQuery( function($) {
	jQuery("#toggle").on("click touchend",function(event) {
        event.preventDefault(); 
		jQuery("#toggle").toggleClass('on');
    jQuery("#toggle").toggleClass("open");
    jQuery("#menu").toggleClass("opened");
	});
});

jQuery( function($) {
    jQuery(window).scroll(function() {
		var width = jQuery(window).width();
        if (width < 980){
		
            var $adminbarHeight = jQuery('#wpadminbar').outerHeight();
            var $menuTop        = jQuery('.x-navbar').offset().top - $adminbarHeight;
            var $current        = jQuery(window).scrollTop();

            if ($current >= $menuTop && $current > 0) {
                jQuery('.x-navbar').addClass('x-navbar-fixed-top');
            } 
            else {
                jQuery('.x-navbar').removeClass('x-navbar-fixed-top');
            }
        }
	});
});