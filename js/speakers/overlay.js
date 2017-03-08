/* Open */
function openOverlay(button) {
    
    var overlay = document.getElementById("speaker_overlay");
    var title = document.getElementById("overlay-title");
    var id = button.id;
    
    
    overlay.style.height = "50%";
   // overlay.style.width = "60%";
    overlay.style.border = "solid 3px rgba(71, 72, 75, 1)";
    overlay.style.boxShadow= "-1.2px 1px 5px #888888";
    title.style.borderBottom = "solid 1px red";
        
    document.getElementById(id + "-overlay-text").style.display = "block";
    document.getElementById(id + "-overlay-title").style.display = "block";
    
    var allSpeakers = $(".blurred_speaker");
    var allTitles = $(".item_section_speakers figcaption h2");
    var allButtons = $(".item_section_speakers figure i");
    
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

function closeOverlay() {
     
    document.getElementById("speaker_overlay").style.height = "0%";
   // document.getElementById("speaker_overlay").style.width = "0%";
    document.getElementById("overlay-title").style.border = "none";
    document.getElementById("speaker_overlay").style.boxShadow= "";
    document.getElementById("speaker_overlay").style.border = "";
    
    var allSpeakers = $(".blurred_speaker");
    var allTitles = $(".item_section_speakers figcaption h2");
    var allButtons = $(".item_section_speakers figure i");
    var allSpeakerTexts = $(".speaker_overlay .text-box");
    var allSpeakerNames = $(".overlay-title h2");
    
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
    
    for (var i = 0; i < allSpeakerTexts.length; i++ ) {
        allSpeakerTexts[i].style.display = "none";    
    }
    for (var i = 0; i < allSpeakerNames.length; i++ ) {
        allSpeakerNames[i].style.display = "none";
    }
    
    
 
}
