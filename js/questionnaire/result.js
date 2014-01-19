define(["lib/backbone", "questionnaire/answer"], function(Backbone, Answer){

	var Result = Backbone.Collection.extend({
		model: Answer,
		
		average: function(){
			var result = [];
			for(var i = 0; i < this.models.length; i++){
				var answer = this.models[i].get("answer") || [];
				for(var j = 0; j < answer.length; j++){
					result[j] += answer[j] * 1.0;
				}
			}
			return result.map(function(item){
				return item / this.models.length;
			});
		}
	});

	return Result;
	
});

