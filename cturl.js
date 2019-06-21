document.addEventListener('DOMContentLoaded', function() {
    const text = `[${document.title}](${location.href})`

    chrome.runtime.sendMessage({ message: text });
});
