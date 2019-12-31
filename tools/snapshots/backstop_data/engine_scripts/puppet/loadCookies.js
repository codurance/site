var fs = require('fs');

module.exports = async (page, scenario) => {
  var cookies = [
    {
      "domain": "localcodurance.com",
      "path": "/",
      "name": "has-cookie-consent",
      "value": "yes",
      "expirationDate": 1798790400,
      "hostOnly": false,
      "httpOnly": false,
      "secure": false,
      "session": false,
      "sameSite": "no_restriction"
    }
  ]

  // MUNGE COOKIE DOMAIN
  cookies = cookies.map(cookie => {
    cookie.url = 'http://' + cookie.domain;
    delete cookie.domain;
    return cookie;
  });

  // SET COOKIES
  const setCookies = async () => {
    return Promise.all(
      cookies.map(async (cookie) => {
        await page.setCookie(cookie);
      })
    );
  };
  await setCookies();
  console.log('Cookie state restored with:', JSON.stringify(cookies, null, 2));
};
