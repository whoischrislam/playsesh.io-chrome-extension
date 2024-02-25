// Reference variables
const addTabBtn = document.getElementById("addTabBtn");
// const addLinkInput = document.getElementById("addLinkInput");
const addLinkBtn = document.getElementById("addLinkBtn");
let gameLinks = [];
const gameList = document.getElementById("gameList");
let isGameListEmpty;

console.log(`ON LOAD gameLinks array: ${gameLinks}`);

if (localStorage.getItem("gameLinks")) {
    isGameListEmpty = false;
    console.log("Local storage has game links");
    gameLinks = JSON.parse(localStorage.getItem("gameLinks"));
    gameLinks.forEach(link => {
        renderLink(link);
    });
    console.log(`gameLinks array: ${gameLinks}`);
} else {
    isGameListEmpty = true;
    console.log("Local storage has no game links");
    let emptyState = document.createElement("p");
    emptyState.textContent = "No games on your list yet";
    gameList.appendChild(emptyState);
    console.log(`gameLinks array: ${gameLinks}`);
}
// Event listeners
// Add link of current tab to list
addTabBtn.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log(`Adding "${tabs[0].url}" to your links from chrome API`);
        addLink(tabs[0].url);        
    });
});

// Inactive for now until there's a better UX
// Add user input link to list
// addLinkBtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     addLink(addLinkInput.value);
//     addLinkInput.value = "";
// });

// Functions
// Add link to array
function addLink(link) {
    gameLinks.push(link);
    renderLink(link);
    localStorage.setItem("gameLinks", JSON.stringify(gameLinks));
    console.log(`Your list ${gameLinks}`);
    console.log(`Local storage ${localStorage.getItem("gameLinks")}`);
}

// Render link to list
function renderLink(link) {
    if (isGameListEmpty) {
        gameList.innerHTML = "";
        isGameListEmpty = false;
    }
    const linkString = document.createElement("a");
    linkString.textContent = link;
    linkString.href = link;
    linkString.target = "_blank";
    gameList.appendChild(linkString);
}