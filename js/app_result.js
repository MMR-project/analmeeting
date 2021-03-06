require(["config", "lib/radar", "storage", "history", "history/item"], function(config, html5jp, Storage, History, HistoryItem){

	html5jp = html5jp || window.html5jp;
	var score = Storage.get("score");
	var answers = Storage.get("answer");
	var history = Storage.getHistory();
	var average = answers.average();


	var showSubjectiveEvaluation = function(){
		var rc = new html5jp.graph.radar("sample");

		if(rc != null) {
			var items = average.slice(0, average.length);
			items.unshift("主観評価");
			var params = {
 				aCap: ["新規性", "発言できた", "深い議論", "本音"],
 				aMax: 100
			};
			rc.draw([items], params);
		}
	};

	var showObjectiveEvaluation = function(){
		document.getElementById("scoreAudio").innerHTML =
			'盛り上がり: <span class="value">' + score.audio + '</span> 点';
		document.getElementById("scoreMovie").innerHTML = 
			'躍動感: <span class="value">' + score.movie + '</span> 点';
	};

	/*
	 * save the result
	 */

	var saveHistory = function(){
		var history_item = new HistoryItem({
			questionnarie: average,
			score: score
		});
		history.addItem(history_item);
		Storage.setHistory(history);
	};

	var showTotalEvaluation = function(){
		var display = document.getElementById("result");
		var total_score = score.movie + score.audio;

		if( total_score > 180){
    		display.setAttribute("class", "excellent");
		} else if(total_score > 140){
			display.setAttribute("class", "great");
		} else if(total_score > 90){
			display.setAttribute("class", "good");
		} else {
			display.setAttribute("class", "not_bad");
		}
	};

	showSubjectiveEvaluation();
	showObjectiveEvaluation();
	showTotalEvaluation();
	saveHistory();
});
