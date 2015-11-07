// Overrides console.log, copying the output to a specific div
var consoleOutputId = 'consoleOutput';

var oldLog = console.log;

var logToDiv = function(str) {
	var cDiv = document.getElementById(consoleOutputId);
	var cDivText = document.getElementById(consoleOutputId + '_text');
	
	if (!cDiv){
		cDiv = document.createElement('div');
		cDiv.id = consoleOutputId;
		cDivText = document.createElement('pre');
		cDivText.id = consoleOutputId + '_text';
		cDiv.appendChild(cDivText);
		document.body.appendChild(cDiv);
	}

	cDivText.innerHTML += str + '\n';
	oldLog.apply(console, arguments);
}

console.log = logToDiv;