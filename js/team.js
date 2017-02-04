var className;
var imageTop;
var imageLeft;
var imageBottom;
var imageRight;
var mouseX;
var mouseY;

function HeadImage(a) {
    var b = $(".image-holder div[data-image-num='" + a + "']");
    this.imageLeft = b.offset().left;
    this.imageRight = this.imageLeft + b.width();
    this.imageTop = b.offset().top;
    this.imageBottom = this.imageTop + b.height();
    this.setImageDirection = function() {
        b.removeClass("up upleft left downleft down downright right upright front click");
        var delta = Model.viewport.width > 910 ? 0 : -8,
			d = a * 100 + delta,
        	c = 600 + delta;
        if (mouseX >= this.imageLeft && mouseX <= this.imageRight && mouseY <= this.imageTop) {
            c = 300 + delta;
            b.addClass("up").css("background-position", c + "px " + d + "px")
        } else {
            if (mouseX < this.imageLeft && mouseY < this.imageTop) {
                c = 200 + delta;
                b.addClass("upleft").css("background-position", c + "px " + d + "px")
            } else {
                if (mouseX <= this.imageLeft && mouseY >= this.imageTop && mouseY <= this.imageBottom) {
                    c = 500 + delta;
                    b.addClass("left").css("background-position", c + "px " + d + "px")
                } else {
                    if (mouseX < this.imageLeft && mouseY > this.imageBottom) {
                        c = 800 + delta;
                        b.addClass("downleft").css("background-position", c + "px " + d + "px")
                    } else {
                        if (mouseX >= this.imageLeft && mouseX <= this.imageRight && mouseY >= this.imageBottom) {
                            c = 900 + delta;
                            b.addClass("down").css("background-position", c + "px " + d + "px")
                        } else {
                            if (mouseX > this.imageRight && mouseY > this.imageBottom) {
                                c = 700 + delta;
                                b.addClass("downright").css("background-position", c + "px " + d + "px")
                            } else {
                                if (mouseX >= this.imageRight && mouseY >= this.imageTop && mouseY <= this.imageBottom) {
                                    c = 400 + delta;
                                    b.addClass("right").css("background-position", c + "px " + d + "px")
                                } else {
                                    if (mouseX > this.imageRight && mouseY < this.imageTop) {
                                        c = 100 + delta;
                                        b.addClass("upright").css("background-position", c + "px " + d + "px")
                                    } else {
                                        b.addClass("front").css("background-position", c + "px " + d + "px")
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function init() {
    mouseX = 0;
    mouseY = 0;
    $(".head-image").each(function(b, c) {
        var a = $(this).attr("data-image-num"),
			delta = Model.viewport.width > 910 ? 0 : -8,
			d = parseInt(a) * 100 + delta;
		Model.viewport.width > 910 ? $(this).addClass("click").css("background-position", "600px " + d + "px") : $(this).addClass("click").css("background-position", "592px " + d + "px");
        window["image_" + b] = new HeadImage(parseInt(a))	
    })
}

function getMousePosition(b) {
    var a = $(".selected").length;
    if (a) {
        return false
    }
    mouseX = b.pageX;
    mouseY = b.pageY;
    $(".head-image").each(function(c, d) {
        window["image_" + c].setImageDirection()
    })
}

jQuery("input[type=checkbox]").on('change', function() {
	$(init);
    $(window).load(init);
    $(window).resize(init);
    $(window).mousemove(getMousePosition);
	$('[data-toggle="tooltip"]').tooltip({
		"content": function(){ 
        	return $(this).attr("data-original-title"); 
    	}
	});
    $(".head-image").click(function() {
		var a = $(this),
			delta = Model.viewport.width > 910 ? 0 : -8,
			c = a.attr("data-image-num"),
        	b = a.attr("data-title"),
        	d = a.attr("data-description"),
			e = a.attr("data-mail"),
			g = a.attr("data-facebook"),
			h = a.attr("data-linkedin");
        a.removeClass("up upleft left downleft down downright right upright front click");
        var f = c * 100 + delta;
        Model.viewport.width > 910 ? a.addClass("click").css("background-position", "1000px " + f + "px") : a.addClass("click").css("background-position", "992px " + f + "px");
		$(".description-text").css('visibility', 'visible');
		$(".description-text").css('opacity', 1);
        $(".description-text .name").html(b);
        $(".description-text .desc").html(d);
		debugger
		if (!e || e == "undefined") {
			$(".description-text .socialmedia a:nth-child(1)").css("display", "none")
		} else {
			$(".description-text .socialmedia a:nth-child(1)").css("display", "inline-flex")
			$(".description-text .socialmedia a:nth-child(1)")[0].href = "mailto:team+" + e + "@tedxistalameda.com";			
		}
		if (!h || h == "undefined") {
			$(".description-text .socialmedia a:nth-child(2)").css("display", "none")
		} else {
			$(".description-text .socialmedia a:nth-child(2)").css("display", "inline-flex")
			$(".description-text .socialmedia a:nth-child(2)")[0].href = "http://linkedin.com/in/" + h;
		}
		if (!g || g == "undefined") {
			$(".description-text .socialmedia a:nth-child(3)").css("display", "none")
		} else {
			$(".description-text .socialmedia a:nth-child(3)").css("display", "inline-flex")
			$(".description-text .socialmedia a:nth-child(3)")[0].href = "http://www.facebook.com/" + g;
		}
    }); 
    $(".row_second").mouseenter(function() {
		$(".description-text").css('opacity', 0);
		$(".description-text").css('visibility', 'hidden');
    });
    $(".close").click(function() {
		$(".description-text").css('opacity', 0);
		$(".description-text").css('visibility', 'hidden');
    })
});