'use strict';

const chai = require('chai');
const expect = require('chai').expect;
const samiSearch = require('../src');
const execa = require('execa');

describe('Query Composer API', function () {
  let result;

  before(function (done) {
    samiSearch('https://getcomposer.org/apidoc/1.1.0/doc-index.html', 'plugininstall')
      .then(res => {
        result = res;
        done();
      })
      .catch(err => {
        result = err;
        done();
      });
  });

  it('all results contains search query', function () {
    expect(
      result.filter(function (item) {
        return item.title.toLowerCase().indexOf('plugininstall') === -1
      }).length
    ).to.eql(0);
  });
});

describe('Caching', function () {
  let result;

  before(function (done) {
    execa.shell('cd cache/ && ls')
      .then(response => {
        result = response.stdout;
        done();
      })
      .catch(err => {
        result = err;
        done();
      });
  });

  it('cache have been created', function () {
    expect(result).to.eql('cache.json');
  });

  after(function (done) {
    execa.shell('cd cache/ && rm cache.json')
      .then(response => {
        result = response.stdout;
        done();
      })
      .catch(err => {
        result = err;
        done();
      });
  });
});

describe('Query Laravel API', function () {
  let result;

  before(function (done) {
    samiSearch('https://laravel.com/api/5.2/doc-index.html', 'eloquent')
      .then(res => {
        result = res;
        done();
      })
      .catch(err => {
        result = err;
        done();
      });
  });

  it('all results contains search query', function () {
    expect(
      result.filter(function (item) {
        return item.title.toLowerCase().indexOf('eloquent') === -1
      }).length
    ).to.eql(0);
  });
});

describe('Query Laravel API, Using Cache', function () {
  let result;

  before(function (done) {
    samiSearch('https://laravel.com/api/5.2/doc-index.html', 'view')
      .then(res => {
        result = res;
        done();
      })
      .catch(err => {
        result = err;
        done();
      });
  });

  it('all results contains search query', function () {
    expect(
      result.filter(function (item) {
        return item.title.toLowerCase().indexOf('view') === -1
      }).length
    ).to.eql(0);
  });
});

describe('Query Laravel API, With Cache Disabled', function () {
  let result;

  before(function (done) {
    samiSearch('https://laravel.com/api/5.2/doc-index.html', 'ServiceProvider', false)
      .then(res => {
        result = res;
        done();
      })
      .catch(err => {
        result = err;
        done();
      });
  });

  it('all results contains search query', function () {
    expect(
      result.filter(function (item) {
        return item.title.toLowerCase().indexOf('ServiceProvider'.toLowerCase()) === -1
      }).length
    ).to.eql(0);
  });

  after(function (done) {
    execa.shell('cd cache/ && rm cache.json')
      .then(response => {
        result = response.stdout;
        done();
      })
      .catch(err => {
        result = err;
        done();
      });
  });
});
