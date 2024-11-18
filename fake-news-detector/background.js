// background.js
chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "checkFakeNews",
		title: "Check Fake News",
		contexts: ["selection"], // Show the context menu when text is selected
	});
});

// Handle the context menu click
chrome.contextMenus.onClicked.addListener((info) => {
	console.log("check msg");
	if (info.menuItemId === "checkFakeNews") {
		const selectedText = info.selectionText; // Get the selected text

		// Send a message to the content script with the selected text
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, { text: selectedText });
		});KO
	}
});
