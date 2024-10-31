button.addEventListener("click", () => {
    chrome.runtime.sendMessage("OpenPopup")
})