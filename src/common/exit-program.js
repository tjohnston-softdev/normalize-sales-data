// This file ends the command line execution after completion or error.


// Error
function callErrorExit(eMsg, inclBreak)
{
	if (inclBreak === true) console.log("");
	console.log(eMsg);
	process.exitCode = 1;
}


// Successful
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