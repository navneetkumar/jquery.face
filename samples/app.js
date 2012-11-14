App = {};
App.start = function(stream) {
    var domURL = window.URL || window.webkitURL;
    var src = domURL ? domURL.createObjectURL(stream) : stream;
    console.log(src);
    App.video.get(0).src = src;
}
App.startStreamingTo = function(source){
    App.video = source;
    navigator.getUserMedia_ = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    try {
		navigator.getUserMedia_({ video: true,audio: false },App.start, App.denied);
	} catch (e) {

	}
}

$(function() {
    $('#detect').click(function() {
        $('img').face().detect();
    });
    $('#track').click(function() {
        $('#sample-video').face().track();
    });
    $('video#camera-video').click(function(){
        if(this.src == ""){
            var video =  $('#camera-video').get(0);
            App.startStreamingTo($('#camera-video'));
            video.play();
        }
    });
    $('#camera').click(function() {
        if(this.src != "") $('#camera-video').face().track();
    });
    return false;
});