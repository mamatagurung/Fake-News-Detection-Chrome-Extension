// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.text) {
		fetch("http://127.0.0.1:5000/predict", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ text: request.text }),
		})
			.then((response) => {
				// Check if the response is OK (status in the range 200-299)
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				const result = `Prediction: ${data.prediction}, Confidence: ${data.confidence}`;
				alert(result); // Display the result in an alert box
			})
			.catch((error) => {
				console.error("Error:", error);
				alert("Error occurred while checking the news.");
			});
	}
});
