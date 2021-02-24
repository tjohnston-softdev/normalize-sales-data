function callErrorExit(eMsg)
{
	console.log(eMsg);
	process.exitCode = 1;
}


function callSuccessfulExit()
{
	console.log("Complete");
	process.exitCode = 1;
}


module.exports =
{
	callError: callErrorExit,
	callSuccessful: callSuccessfulExit
};