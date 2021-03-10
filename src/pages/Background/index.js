// TODO: add env variables for domain and api url
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  chrome.tabs.get(tabId, async (tab) => {
    if (tab.url.includes('github') && tab.url.includes('pull/')) {
      const sessionCookie = await getCodeGemCookies('http://localhost:3001');
      console.log('cookie', sessionCookie);
      return fetch(`http://localhost:3000/api/user/verify`, {
        credentials: 'include',
      }).then((res) => {
        console.log(res);
      });
      //   const response = await fetch('http://localhost:3000/api/user/verify', {
      //     method: 'GET',
      //     mode: 'cors', // no-cors, *cors, same-origin
      //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //     credentials: 'include', // include, *same-origin, omit
      //     headers: {
      //       'Content-Type': 'application/json',
      //       // 'Content-Type': 'application/x-www-form-urlencoded',
      //     },
      //     redirect: 'follow', // manual, *follow, error
      //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      //   });
      //   console.log(response.json()); // parses JSON response into native JavaScript objects
      chrome.tabs.query({ active: true }, function (tabs) {
        chrome.tabs.sendMessage(tabId, { message: sessionCookie });
      });
    }
  });
});

async function getCodeGemCookies() {
  try {
    return new Promise(function (resolve, reject) {
      chrome.cookies.getAll({ domain: 'localhost' }, function (cookies) {
        const sessionCookie = cookies.filter((cookie) => cookie.name === 'sid');
        console.log(sessionCookie);
        if (sessionCookie.length > 0) {
          resolve(sessionCookie[0]);
        } else {
          return null;
        }
      });
    }).then((res) => {
      return res;
    });
  } catch (error) {
    return `Unexpected error: ${error.message}`;
  }
}
