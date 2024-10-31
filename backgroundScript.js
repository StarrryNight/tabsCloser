chrome.runtime.onMessage.addListener(request => {

  if (request == "OpenPopup") {

    chrome.windows.create({
      url: "popup.html",
      type: "popup",
      focused: true,
      width: 1000,
      height: 600,
      top: 0,
      left: screen.width - 400,
    }, () => {
      console.log("Opened popup!")
    })

  }

})
