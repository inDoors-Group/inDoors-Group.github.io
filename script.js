// URL to fetch APK files from
const apkUrl = "https://navigation.indoorsgroup.ca/";

// Function to fetch and determine the latest APK version
async function fetchAndDisplayDownloadButton() {
    try {
        const response = await fetch(apkUrl);
        const text = await response.text();

        // Parse the text to extract APK file names
        const apkFiles = text.match(/(\d+\.\d+\.\d+)\.apk/g);

        if (!apkFiles || apkFiles.length === 0) {
            // If no APK files found, return
			console.error("Error: No APK files found");
            return;
        }

        // Extract version numbers from the filenames
        const versions = apkFiles.map(file => {
            const match = file.match(/(\d+\.\d+\.\d+)\.apk$/);
            return match ? match[1] : null;
        }).filter(version => version);

        // Sort the version numbers to find the latest version
        const latestVersion = versions.sort((a, b) => {
            const aParts = a.split('.').map(Number);
            const bParts = b.split('.').map(Number);

            for (let i = 0; i < aParts.length; i++) {
                if (aParts[i] > bParts[i]) return -1;
                if (aParts[i] < bParts[i]) return 1;
            }
            return 0;
        })[0];

        // Create and update the download button
		const downloadButton = document.createElement('a');
        downloadButton.className = 'download-button';
        downloadButton.textContent = `Download Beta v${latestVersion}`;	
        downloadButton.href = `${apkUrl}indoors-app_${latestVersion}.apk`;

        // Add the download button to the body
        document.getElementById('home').appendChild(downloadButton);

    } catch (error) {
        console.error('Error fetching APK files:', error);
    }
}

// Fetch and display the download button on page load
document.addEventListener('DOMContentLoaded', fetchAndDisplayDownloadButton);
