document.getElementById("detectBtn").addEventListener("click", async () => {
	const text = document.getElementById("inputText").value.trim();
	const predictionElem = document.getElementById("prediction");
	const confidenceElem = document.getElementById("confidence");

	if (!text) {
		alert("Please enter some text.");
		return;
	}

	predictionElem.textContent = "Detecting...";
	confidenceElem.textContent = "";

	try {
		const response = await fetch("http://127.0.0.1:5000/predict", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ text }),
		});

		const data = await response.json();

		predictionElem.textContent = `Prediction: ${data.prediction}`;
		confidenceElem.textContent = `Confidence: ${(data.confidence * 100).toFixed(
			2
		)}%`;
	} catch (error) {
		console.error("Error:", error);
		predictionElem.textContent = "Error detecting the news.";
		confidenceElem.textContent = "";
	}
});
