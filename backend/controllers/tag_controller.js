const fetch = require('node-fetch');
const cheerio = require('cheerio');

// * ===================================================================================

const loadedArticles = [];
var previousTag = '';

function generateLinks(url) {
  const links = [];

  const suffixes = ['latest', 'archive'];

  const yearSuffixes = [
    'archive/2020',
    'archive/2019',
    'archive/2018',
    'archive/2017',
    'archive/2016',
    'archive/2015',
    'archive/2014',
    'archive/2013',
    'archive/2012',
    'archive/2011',
    'archive/2010',
    'archive/2009',
    'archive/2008',
    'archive/2007',
    'archive/2006',
  ];
  const monthSuffixes = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  suffixes.forEach((suffix) => {
    links.push(`${url}/${suffix}`);
  });

  yearSuffixes.forEach((suffix) => {
    links.push(`${url}/${suffix}`);
  });

  yearSuffixes.forEach((year) => {
    monthSuffixes.forEach((month) => {
      links.push(`${url}/${year}/${month}`);
    });
  });

  return links;
}

// * ===================================================================================

function getArticles(link) {
  try {
    return fetch(link).then(async (res) => {
      // console.log(res.status);

      res = await res.text();

      const $ = cheerio.load(res);

      const articles = [];

      $('.streamItem').each(function () {
        const article = {};

        article.author = $(this).find('.u-flexCenter > .postMetaInline > a').text();
        article.date = $(this).find('.u-flexCenter > .postMetaInline > div > a > time').text();
        article.title = $(this).find('section > .section-content > div > h3').text();
        article.description = $(this).find('section > .section-content > div > h4').text();
        article.link = $(this).find('div.postArticle-readMore > a').attr('href');
        article.image = $(this).find('img:nth-child(2)').attr('src');
        // console.log(article.image);
        articles.push(article);
      });

      //console.log(article);
      return articles;
    });
  } catch (error) {
    console.log(error);
  }
}

// * ===================================================================================










// * ===================================================================================

async function searchByTag(tag, page) {
  var url = `https://medium.com/tag/${tag}`;

  if (tag !== previousTag) {
    loadedArticles.length = 0;
    previousTag = tag;
  }

  const links = generateLinks(url);

  const data = {};

  for (let index = page; index < page + 1; index++) {
    // console.log(links[index]);
    await getArticles(links[index]).then((res) => {
      loadedArticles.push(...res);
    });
  }

  const relatedTags = await fetch(url).then(async (res) => {
    res = await res.text();

    const tags = [];

    const $ = cheerio.load(res);

    $('.tags')
      .find('li > a')
      .each(function () {
        let relatedTag = $(this).text();
        tags.push(relatedTag);
      });

    return tags;
  });

  // console.log(relatedTags);
  // console.log(links);
  // console.log(articles);

  data.relatedTags = await relatedTags;

  let articlesWindow = loadedArticles;

  articlesWindow = articlesWindow.slice((page - 1) * 10, page * 10);

  data.articles = articlesWindow;

  // console.log(page);
  //console.log(articlesWindow);

  return data;
}



module.exports = {
  searchByTag,
};
