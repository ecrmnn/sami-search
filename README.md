# sami-search
> Search any documentation built on Sami

[![Travis](https://img.shields.io/travis/ecrmnn/sami-search.svg?style=flat-square)](https://travis-ci.org/ecrmnn/sami-search.svg?branch=master)
[![npm version](https://img.shields.io/npm/v/sami-search.svg?style=flat-square)](http://badge.fury.io/js/sami-search)
[![npm downloads](https://img.shields.io/npm/dm/sami-search.svg?style=flat-square)](http://badge.fury.io/js/sami-search)
[![npm license](https://img.shields.io/npm/l/sami-search.svg?style=flat-square)](http://badge.fury.io/js/sami-search)

### Installation
```bash
npm install sami-search --save
```

### Usage
```javascript
const samiSearch = require('sami-search');

samiSearch('https://laravel.com/api/5.3/doc-index.html', 'ServiceProvider')
  .then(results => {
    //=> [
    //=>   {
    //=>     link: 'Illuminate/Support/ServiceProvider.html#method_commands',
    //=>     title: 'Illuminate\\Support\\ServiceProvider',
    //=>     description: 'Method in class ServiceProvider'
    //=>   },
    //=>   {...},
    //=>   {...},
    //=> ]
  })
  .catch(err => {
    result = err;
  });
```

### License
MIT © [Daniel Eckermann](http://danieleckermann.com)