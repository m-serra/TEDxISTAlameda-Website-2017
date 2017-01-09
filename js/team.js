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
        var d = a * 100;
        var c = 600;
        if (mouseX >= this.imageLeft && mouseX <= this.imageRight && mouseY <= this.imageTop) {
            c = 300;
            b.addClass("up").css("background-position", c + "px " + d + "px")
        } else {
            if (mouseX < this.imageLeft && mouseY < this.imageTop) {
                c = 200;
                b.addClass("upleft").css("background-position", c + "px " + d + "px")
            } else {
                if (mouseX <= this.imageLeft && mouseY >= this.imageTop && mouseY <= this.imageBottom) {
                    c = 500;
                    b.addClass("left").css("background-position", c + "px " + d + "px")
                } else {
                    if (mouseX < this.imageLeft && mouseY > this.imageBottom) {
                        c = 800;
                        b.addClass("downleft").css("background-position", c + "px " + d + "px")
                    } else {
                        if (mouseX >= this.imageLeft && mouseX <= this.imageRight && mouseY >= this.imageBottom) {
                            c = 900;
                            b.addClass("down").css("background-position", c + "px " + d + "px")
                        } else {
                            if (mouseX > this.imageRight && mouseY > this.imageBottom) {
                                c = 700;
                                b.addClass("downright").css("background-position", c + "px " + d + "px")
                            } else {
                                if (mouseX >= this.imageRight && mouseY >= this.imageTop && mouseY <= this.imageBottom) {
                                    c = 400;
                                    b.addClass("right").css("background-position", c + "px " + d + "px")
                                } else {
                                    if (mouseX > this.imageRight && mouseY < this.imageTop) {
                                        c = 100;
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
        var a = $(this).attr("data-image-num");
        var d = a * 100;
        $(this).addClass("front").css("background-position", "600px " + d + "px");
        window["image_" + b] = new HeadImage(a)
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

$().ready(function() {
    $(init);
    $(window).load(init);
    $(window).resize(init);
    $(window).mousemove(getMousePosition);
    $('[data-toggle="tooltip"]').tooltip();
    $(".image-holder").click(function() {
        var a = $(this).find(".head-image");
        var c = a.attr("data-image-num");
        var b = a.attr("data-original-title");
        var e = a.attr("data-head-description");
        var d = a.attr("data-head-dep");
        $(".image-holder").removeClass("selected");
        $(this).addClass("selected");
        a.removeClass("up upleft left downleft down downright right upright front click");
        var f = c * 100;
        a.addClass("click").css("background-position", "1000px " + f + "px");
        $(".head-info .dep").html(d);
        $(".head-info .name").html(b);
        $(".head-info .desc").html(e);
        $(".head-info").collapse("show")
    }); 
    $(".head-image").mouseenter(function() {
        $(".head-info").collapse("hide");
        $(".image-holder").removeClass("selected")
    });
    $(".head-info .close").click(function() {
        $(".head-info").collapse("hide")
    })
});