$('#exampleSelect1').change(function(){
	var currentValue = $(this).find('option:selected').text();

	console.log(currentValue);
});

$('#exampleSelect2').change(function(){
	var currentValue = $(this).find('option:selected').text();

	console.log(currentValue);
});

$('.btn').on('click', function(){
	var answer = [];
	for (i=1; i<11; i++){
		var question = 'question' + i;
		console.log(question);
		answer.push($('#' + question).find('option:selected').text())
	}
	
	var name = 'Brian';
	var photo = 'url....';

	var respond = {
		name: name,
		pic: photo,
		survey: answer
	}
	console.log(respond);

	$.post('/survey/new', respond)
	.done(function(data){
		console.log(data);
	})
});