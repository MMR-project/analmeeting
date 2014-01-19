requirejs.config({
    baseUrl: 'js',
    paths: {
        lib: '../lib'
    },
	shim: {
		"lib/backbone": {
			deps: ["lib/underscore", "lib/jquery"],
			exports: "Backbone"
		},
		"lib/underscore":{
			exports: "_"
		},
		"lib/jquery": {
			exports: "jQuery"
		}
	}
});

require(["lib/radar", "storage"], function(html5jp, Storage){
	html5jp = html5jp || window.html5jp;
	var score = Storage.get("score");
	var answers = Storage.get("answer");

	var rc = new html5jp.graph.radar("sample");
	if(rc != null) {
		var items = answers.average();
		items.unshift("主観評価");
		var params = {
 			aCap: ["新規性", "発言できた", "深い議論", "本音"],
 			aMax: 100
		};
		rc.draw([items], params);
		document.getElementById("scoreAudio").innerHTML =
			"盛り上がり："+score.audio+"点";
		document.getElementById("scoreMovie").innerHTML =
			"躍動感："+score.movie+"点";
	}
});
