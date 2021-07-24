async function extract() {
	// All code is executed in a local scope.
	// For example, the following does NOT overwrite the global `alert` method
	console.log("Prosperon Chrome Extention Running!");

	// --- Data collection ---
	let stateTemp = document.getElementById('container')?._reactRootContainer._internalRoot.current.child.child.child.pendingProps.store?.getState().toJS();

	let state = JSON.parse(JSON.stringify(stateTemp));

	let storage = state?.storage.stores;
	let user = state?.user.user.data;
	let userCompanyId = user?.companyId;
	let company = state?.company;
	let workforce = state?.workforce.workforces.data;
	let fxBrokers = state?.forex.exchange?.items;
	let production = state?.production;
	let sites = state?.sites.sites.index.data;

	// --- Data processing ---
	for (let key in storage) {
		 storage[key].owner = userCompanyId;
	}

	for (let key in workforce) {
		 workforce[key].owner = userCompanyId;
		 workforce[key]._id = workforce[key].siteId;
	}

	for (let key in production.lines.data) {
		 production.lines.data[key].owner = userCompanyId;
	}

	for (let key in sites) {
		 sites[key].owner = userCompanyId;
		 delete sites[key].buildOptions;
	}

	// --- Data sendoff ---
	// http://localhost:8080/storages
	// https://api.prosperon.app/storages

	await Promise.allSettled([
		postDataRequest(storage, "storages"),
		postDataRequest(company, "companies"),
		postDataRequest(workforce, "workforce"),
		postDataRequest(fxBrokers, "fxBrokers"),
		postDataRequest(production.lines.data, "production"),
		postDataRequest(sites, "sites"),
	]);
	
	// --- Close out ---
	//        notification.show();
	//createNotification();
	//function createNotification() {
	//    console.log("Entering createNotification");
	//    if (!chrome || !chrome.notifications) return;
	//    console.log("1");
	//    var opt = { type: "basic", title: "Test", message: "Your message", iconUrl: "your_icon.png" }
	//    chrome.notifications.create("notificationName", opt, function () { });

	//    //include this line if you want to clear the notification after 5 seconds
	//    setTimeout(function () { chrome.notifications.clear("notificationName", function () { }); }, 5000);
	//}

}

function wait(ms) {
	return new Promise((resolve) => void setTimeout(resolve, ms));
}

async function postDataRequest(data, type) {
	console.debug(type + " sending off", data);
	postData('http://localhost:8080/' + type, data)
		 .then(dataReturned => {
			  console.log(type + " return:", dataReturned);
		 });
};

async function postData(url = '', data = {}) {
	console.debug("entering postData. data: ", data);
	const response = await fetch(url, {
		 method: 'POST',
		 headers: {
			  'Content-Type': 'application/json'
		 },
		 body: JSON.stringify(data)
	});
	return response.json();
}

(async function main() {
	console.debug('starting timer (5m)');
	await wait(5 * 60 * 1000) // 5 minutes
	extract();

	console.debug('starting timer (30m)');
	setInterval(extract, 30 * 60 * 1000) // 30 minutes
})();

console.debug('scriped loaded');