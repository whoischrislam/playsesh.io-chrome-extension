// Reference variables
const addTabBtn = document.getElementById("addTabBtn");
const addLinkBtn = document.getElementById("addLinkBtn");

// Event listeners
addTabBtn.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log('Accessed chrome API to get current tab');
        console.log(tabs[0]);
    });
    console.log('Save tab button clicked');
});

addLinkBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log('Save link button clicked');
});