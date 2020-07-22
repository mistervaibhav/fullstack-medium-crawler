const fetch = require('node-fetch');
const cheerio = require('cheerio');

function getBlog(url) {
  try {
    return fetch(url).then(async (res) => {
      // console.log(res.status);

      res = await res.text();

      const $ = cheerio.load(res);

      const blog = {};

      const content = $('article').find('div > section > div > div > p').text();

      //   blog.title = $(article).find('div > section > div > div > div > h1 ').text();
      //   blog.content = $(article).find('div > section > div > div > p').text();
      //   blog.responsesLink = $(article).find('section > .section-content > div > h3').text();

      // console.log(content);
      return content;
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getBlog,
};
