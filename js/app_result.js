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

require(["lib/radar", "storage", "history", "history/item"], function(html5jp, Storage, History, HistoryItem){
	html5jp = html5jp || window.html5jp;
	var score = Storage.get("score");
	var answers = Storage.get("answer");
	var history = Storage.get("history") || new History();

	var rc = new html5jp.graph.radar("sample");
	if(rc != null) {
		var items = answers.average();
		items.unshift("主観評価");
		var params = {
 			aCap: ["新規性", "発言できた", "深い議論", "本音"],
 			aMax: 100
		};
		rc.draw([items], params);
		document.getElementById("scoreAudio").innerHTML="盛り上がり：<font size = '+5' color='red'>"+scoreAudio+"</font>点";
		document.getElementById("scoreMovie").innerHTML="躍動感：<font size = '+5' color='red'>"+scoreMovie+"</font>点";
	
		var point = scoreAudio + scoreMovie;
	
		if( point > 180){
    		document.body.style.backgroundImage= "url('kin.png')";
		} else if(point > 140){
	    	document.body.style.backgroundImage= "url('niji.png')";
		} else if(point > 90){
	    	document.body.style.backgroundImage= "url('happa.png')";
		} else {
	    	document.body.style.backgroundImage = "url('block.png')";
		}

		/*
		 * save the result
		 */
		var history_item = new HistoryItem({
			questionnarie: items.slice(0, items.length),
			score: score
		});
		history.add(history_item);
		Storage.set("history", history);
	}
});
