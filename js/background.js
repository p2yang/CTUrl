let resultText = ''

function copy(value) {
    const input = document.createElement('input')
    input.setAttribute('value', value)
    document.body.appendChild(input)
    input.setSelectionRange(0, 9999)
    if (document.execCommand('copy')) {
        document.execCommand('copy')
        console.log('copy success', value)
    }
    document.body.removeChild(input)
}

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	console.log('收到来自content-script的消息：');
    console.log(request, sender, sendResponse);
    resultText = request.message
    console.log(resultText)
	// sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});

chrome.contextMenus.create({
    title: "复制页面title + url",
    contexts: ["all"],
	onclick: function(params){
        console.log('params', params)
        // const text = `[${document.title}]${params.pageUrl}`
        // navigator.clipboard.writeText(resultText)
        // window.clipboardData.setData("Text", resultText)
        copy(resultText)
        // alert(text);
    }
});

function sendMessageToContentScript(message, callback){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		chrome.tabs.sendMessage(tabs[0].id, message, function(response)
		{
			if(callback) callback(response);
		});
	});
}

sendMessageToContentScript({cmd:'test', value:'你好，我是popup！'}, function(response)
{
	console.log('来自content的回复：'+response);
});

