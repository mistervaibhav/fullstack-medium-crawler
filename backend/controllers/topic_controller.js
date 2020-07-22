const fetch = require('node-fetch');
const cheerio = require('cheerio');

/* *
 * GET ALL TOPICS
 */
function getTopics() {
  return fetch('https://medium.com/topics').then(async (res) => {
    res = await res.text();

    const topics = [];

    const $ = cheerio.load(res);

    $('.js-sourceStream')
      .find('.streamItem section')
      .each(function (index, element) {
        let category = $(element).find('header').text();
        // console.log(`==================${category}======================`);
        $(element)
          .find('.link')
          .each(function (index, item) {
            let title = $(item).text();
            let link = $(item).attr('href');
            let topic = {};
            topic.title = title;
            topic.category = category;
            topic.link = link;
            topics.push(topic);
          });
      });

    return topics;
  });
}

/* *
 * GET BLOGS BY TOPIC
 */
function getPostsByTopic(title) {
  return fetch(`https://medium.com/topic/${title}`).then(async (res) => {
    res = await res.text();

    const posts = [];

    const $ = cheerio.load(res);

    $('#root > div > div > div > div > div > div:nth-child(4)')
      .find('div > section')
      .each(function () {
        let post = {};

        post.title = $(this).find('div > section > div > div > div > h3 > a').text();
        post.description = $(this).find('div > section > div > div > div > div > h3 > a').text();
        post.author = $(this).find('div > section > div > div > div > div > div > span > a').text();
        post.date = $(this)
          .find('div > section > div > div > div > div > span')
          .text()
          .split('·')[0];
        post.readingTime = $(this)
          .find('div > section > div > div > div > div > span')
          .text()
          .split('·')[1];
        post.link = $(this).find('div > section > div > div > div > h3 > a').attr('href')
          ? $(this).find('div > section > div > div > div > h3 > a').attr('href').split('?')[0]
          : '';

        posts.push(post);
      });

    return posts;
  });
}

module.exports = {
  getTopics,
  getPostsByTopic,
};

/*
#root > div > div > div > div > div > div:nth-child(4)
comics : if ig ai du r ih ii ij ik il
art : hz ia ai du r ib ic id ie if
fiction : if ig ai du r ih ii ij ik il
#root > div > div.n.p > div > div > div.dd.de.df.dg.dh.di.dj.dk.dl.dm.dn.do.dp.dq.dr.ds.dt.du.dv.dw.dx > div:nth-child(4) > div.fg.fh.r > section:nth-child(5) > div > section > div > div








*/
