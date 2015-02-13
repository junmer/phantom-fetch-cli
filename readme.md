# phantom-fetch-cli [![Build Status](http://img.shields.io/travis/junmer/phantom-fetch-cli.svg?style=flat)](https://travis-ci.org/junmer/phantom-fetch-cli)

> fetch webpage content after phantom rendered

## Install

First, make sure [PhantomJS](http://phantomjs.org/) is installed. This module expects the ```phantomjs``` binary to be in PATH somewhere. In other words, type this:

```sh
$ phantomjs
```

If that works, so will [phantomjs-node](https://github.com/sgentle/phantomjs-node) and `phantom-fetch-cli`. It's only been tested with PhantomJS 1.3, and almost certainly doesn't work with anything older.

Install `phantom-fetch-cli` like this:

```sh
$ npm install -g phantom-fetch-cli
```

## Usage

```sh
$ phantom-fetch --help

  Usage
      $ phantom-fetch <url>  

    Example
      $ phantom-fetch //www.baidu.com
      $ phantom-fetch //www.baidu.com > baidu.txt  

    Options
      -e, --evaluate                       evaluate function
```
