document.addEventListener('DOMContentLoaded', bindButtons);

function makeUrl(){
	var ex = encodeURIComponent(document.getElementById("exercise").value);
	var reps = encodeURIComponent(document.getElementById("reps").value);
	var weight = encodeURIComponent(document.getElementById("weight").value);
	var date = encodeURIComponent(document.getElementById("date").value);
	if(document.getElementById("lbs").value == 1){
		var lbs = encodeURIComponent(document.getElementById("lbs").value);
	}
	else{
		var lbs = encodeURIComponent(document.getElementById("kgs").value);
	}

	var url = "ex=" + ex
				+ "&reps=" + reps
				+ "&weight=" + weight
				+ "&date=" + date
				+ "&lbs=" + lbs;
	
	return url;
}

function bindButtons(){
	document.getElementById('subEx').addEventListener('click', function(event){
		var query = makeUrl();
		var req = new XMLHttpRequest();
		req.open("POST", "http://localhost:3000/addEx", true);
		req.addEventListener('load', function(){
			if(req.status < 200 && req.status > 400){
				var dataBack2 = JSON.parse(req.responseText);
				alert(req.responseText);
			}
		})
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.send(query);
		event.preventDefault();
	})
}
/*
	var inputData = document.getElementById('stuff').value;
		var req = new XMLHttpRequest();
		req.open("POST", "http://httpbin.org/post", true);
		req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load', function(){
			if(req.status >= 200 && req.status <= 400){
				var dataBack2 = JSON.parse(req.responseText);
				console.log(dataBack2);
				document.getElementById('postMessage').textContent = "You entered: " + dataBack2.data;
			}
		})
		req.send(inputData);
		event.preventDefault();
*/