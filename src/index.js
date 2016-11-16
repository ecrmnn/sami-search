'use strict';

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const moment = require('moment');
const cheerio = require('cheerio');
const cache = path.join(__dirname, '../cache/cache.json');

const getDataFromSamiDocumentIndex = samiDocumentIndex => {
  return new Promise((resolve, reject) => {
    axios.get(samiDocumentIndex)
      .then(function (response) {
        const $ = cheerio.load(response.data);
        const results = [];

        $('dt').each((key, element) => {
          const link = $(element).find('a').attr('href');
          const title = $(element).find('abbr').attr('title');
          const description = $(element).find('em').text();

          if (typeof title !== 'undefined') {
            results.push({link, title, description});
          }
        });

        resolve(results);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

const updateCache = results => {
  fs.writeFile(cache, JSON.stringify(results), (err) => {
    if (err) {
      throw err;
    }
  });
};

const search = (list, query) => {
  return list.filter(function (item) {
    const pieces = item.title.split('\\');

    return pieces[pieces.length - 1].toLowerCase().indexOf(query.toLowerCase()) === 0;
  });
};

module.exports = (samiDocumentIndex, query, useCache) => {
  if (useCache !== false) {
    useCache = true;
  }

  return new Promise((resolve, reject) => {
    if (useCache) {
      fs.readFile(cache, 'utf-8', (err, content) => {
        if (err) {
          getDataFromSamiDocumentIndex(samiDocumentIndex)
            .then(results => {
              updateCache(results);
              resolve(search(results, query));
            })
            .catch(err => {
              reject(err);
            });
        } else {
          fs.stat(cache, (err, stats) => {
            if (!err) {
              const hoursSinceCacheUpdated = moment().diff(moment(stats.mtime), 'hours');

              if (hoursSinceCacheUpdated >= 24) {
                getDataFromSamiDocumentIndex(samiDocumentIndex)
                  .then(results => {
                    updateCache(results);
                    resolve(search(results, query));
                  })
                  .catch(err => {
                    reject(err);
                  });
              } else {
                resolve(search(JSON.parse(content), query));
              }
            } else {
              reject(err);
            }
          })
        }
      });
    } else {
      getDataFromSamiDocumentIndex(samiDocumentIndex)
        .then(results => {
          updateCache(results);
          resolve(search(results, query));
        })
        .catch(err => {
          reject(err);
        });
    }
  });
};