const fileArg = require("./src/input/file-arg");


runDataNormalization();


function runDataNormalization()
{
	var givenFileType = fileArg.readFileType();
	var fileTypeValid = fileArg.prepareFileType(givenFileType);
	
	if (fileTypeValid >= 0)
	{
		console.log("Valid");
	}
}