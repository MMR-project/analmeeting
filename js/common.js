var videoElement;
var audioElement;
var audioContext;
var analyser;
var mediastreamsource;


function init(){
	 videoElement= document.getElementById('video');
     contextVideo = document.getElementById('videoCanvas').getContext('2d');
    //var localMediaStream = null; 

    audioInit();
    videoInit();
    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia  = 	navigator.getUserMedia || 
    							navigator.webkitGetUserMedia ||
                              	navigator.mozGetUserMedia || 
                              	navigator.msGetUserMedia;
    //カメラ使えるかチェック

    if (!navigator.getUserMedia) {
        alert("未対応ブラウザです。");
    }
    var localMediaStream;
    var videoObj={audio : true, video : true, toString : function(){return "video, audio";}};
    navigator.getUserMedia(
    	videoObj,
        function(stream) {
        	localMediaStream = stream;
        	videoElement.src = window.URL.createObjectURL(localMediaStream);
			audioContext = new AudioContext();
			mediastreamsource = audioContext.createMediaStreamSource(stream);
			analyser = audioContext.createAnalyser();
			mediastreamsource.connect(analyser);
        	var animation = function(){
        		audioAnimation();
        		videoAnimation();
        		requestAnimationFrame(animation);
        	}
        	animation();
        },
        function(e) {
           alert(e);
        }
    );
}


window.addEventListener("load", init, false);
