function initializeNormalizationResult()
{
	var intlRes = {};
	
	intlRes["data"] = {};
	intlRes["error"] = {};
	intlRes["canContinue"] = true;
	
	intlRes.data["territories"] = [];
	intlRes.data["countries"] = [];
	intlRes.data["statesRegions"] = [];
	intlRes.data["cities"] = [];
	intlRes.data["dealSizes"] = [];
	intlRes.data["productLines"] = [];
	intlRes.data["orderStatusModes"] = [];
	intlRes.data["products"] = [];
	intlRes.data["customers"] = [];
	intlRes.data["orderEntries"] = [];
	intlRes.data["orderItems"] = [];
	
	intlRes.error["rowNumber"] = -1;
	intlRes.error["column"] = null;
	intlRes.error["message"] = null;
	
	return intlRes;
}


module.exports =
{
	initializeResult: initializeNormalizationResult
};