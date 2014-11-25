// Execute the inject.js in a tab and call a method,
// passing the result to a callback function.
function injectedMethod (tab, method, callback) {
  chrome.tabs.executeScript(tab.id, { file: 'app/scripts/inject.js' }, function(){
    chrome.tabs.sendMessage(tab.id, { method: method }, callback);
  });
}

function getVideo (tab) {
  injectedMethod(tab, 'getVideo', function (response) {
	alert(response.data);
	//downloadURI(response.data, "video");
    return true;
  });
}

function downloadURI(uri, name) 
{
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
}

/* Inject our Angular app, taking care
 * not to interfere with page's Angular (if any) */
function injectAngular(tabId) {

    /* Prevent immediate automatic bootstrapping */
    chrome.tabs.executeScript(tabId, {
        code: 'window.name = "NG_DEFER_BOOTSTRAP!" + window.name;'
    }, function () {

        /* Inject AngularJS */
        chrome.tabs.executeScript(tabId, {
            file: 'angular.js'
        }, function () {

            /* Inject our app's script */
            chrome.tabs.executeScript(tabId, {
                file: 'content.js'
            });
        });
    });
}
// chrome.browserAction.onClicked.addListener(function (tab) {
//     injectAngular(tab.id);
// });

chrome.browserAction.onClicked.addListener(getVideo);