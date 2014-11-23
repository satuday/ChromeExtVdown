// Execute the inject.js in a tab and call a method,
// passing the result to a callback function.
function injectedMethod (tab, method, callback) {
  chrome.tabs.executeScript(tab.id, { file: 'inject.js' }, function(){
    chrome.tabs.sendMessage(tab.id, { method: method }, callback);
  });
}

function getVideo (tab) {
  injectedMethod(tab, 'getVideo', function (response) {
	//alert(response.data);
	downloadURI(response.data, "video");
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

chrome.browserAction.onClicked.addListener(getVideo);