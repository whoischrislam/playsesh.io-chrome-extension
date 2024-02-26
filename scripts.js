// Reference variables
const addTabBtn = document.getElementById("addTabBtn");
// const addLinkInput = document.getElementById("addLinkInput");
const addLinkBtn = document.getElementById("addLinkBtn");
let gameLinks = [];
// localStorage.setItem("gameLinks", JSON.stringify(gameLinks));
const gameList = document.getElementById("gameList");
let isGameListEmpty;

console.log(`ON LOAD gameLinks array: ${gameLinks}`);

// Check local storage for game links
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
    const emptyState = document.createElement("div");
    emptyState.id = "emptyState";
    const emptyStateText = document.createElement("p");
    emptyStateText.textContent = "You have no links yet. Add some!";
    emptyState.appendChild(emptyStateText);
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
    const card = document.createElement("div");
    card.classList.add("card");
    const linkString = document.createElement("a");
    linkString.textContent = link;
    linkString.href = link;
    linkString.target = "_blank";
    linkString.classList.add("link");
    const deleteLink = document.createElement("a");
    deleteLink.textContent = "Remove";
    deleteLink.cursor = "pointer";
    deleteLink.classList.add("deleteLink");
    deleteLink.addEventListener("click", removeLink);
    card.appendChild(linkString);
    card.appendChild(deleteLink);
    gameList.appendChild(card);
}

function removeLink() {
    const linktoRemove = this.parentElement;
    linktoRemove.remove();
    gameLinks.splice(gameLinks.indexOf(linktoRemove), 1);
    localStorage.setItem("gameLinks", JSON.stringify(gameLinks));
    if(gameLinks.length === 0) {
        localStorage.removeItem("gameLinks");
        isGameListEmpty = true;
        console.log("Local storage is empty again.");
        const emptyState = document.createElement("div");
        emptyState.id = "emptyState";
        const emptyStateText = document.createElement("p");
        emptyStateText.textContent = "You have no links yet. Add some!";
        emptyState.appendChild(emptyStateText);
        gameList.appendChild(emptyState);
        console.log(`gameLinks array: ${gameLinks}`);
    }
}