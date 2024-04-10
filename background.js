const changeUrl = (url) => {
  const sites = [
    "https://etherscan.io/",
    "https://sepolia.etherscan.io/",
    "https://holesky.etherscan.io/",
    "https://optimistic.etherscan.io/",
    "https://basescan.org/",
    "https://sepolia.basescan.org/",
    "https://polygonscan.com/",
    "https://mumbai.polygonscan.com/",
    "https://arbiscan.io/",
    "https://bscscan.com/",
    "https://blastscan.io/"
  ];

  const regex = /\/(address|token)\/(0x[a-fA-F0-9]{40})/;
  let newUrl = url;

  if (regex.test(url)) {
    const match = url.match(regex);
    const address = match[2];
    for (let i = 0; i < sites.length; i++) {
      if (url.startsWith(sites[i])) {
        newUrl = `${sites[(i + 1) % sites.length]}address/${address}`;
        break;
      }
    }
  }

  return newUrl;
}

  chrome.action.onClicked.addListener(function(tab) {
    chrome.tabs.update(tab.id, {url: changeUrl(tab.url)});
  });
