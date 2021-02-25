function callErrorExit(eMsg)
{
	console.log("");
	console.log(eMsg);
	process.exitCode = 1;
}


function callSuccessfulExit()
{
	console.log("");
	console.log("Complete");
	process.exitCode = 1;
}


module.exports =
{
	callError: callErrorExit,
	callSuccessful: callSuccessfulExit
};