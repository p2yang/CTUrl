let resultText = ''

function copy(value) {
    const input = document.createElement('input')
    input.setAttribute('value', value)
    document.body.appendChild(input)
    input.select()
    if (document.execCommand('copy')) {
        document.execCommand('copy')
    }
    document.body.removeChild(input)
    resultText = ''
}

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    resultText = request.message
});

chrome.contextMenus.create({
    title: "复制页面title + url",
    contexts: ["all"],
	onclick: function(params){
        copy(resultText)
    }
});
