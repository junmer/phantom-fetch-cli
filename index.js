#!/usr/bin/env node

/**
 * @file fetch cli
 * @author junmer
 */

/* eslint-env node */

var fetcher = require('phantom-fetch');
var meow = require('meow');

var cli = meow({
    help: [
        'Usage',
        '  $ phantom-fetch <url>',
        '',
        'Example',
        '  $ phantom-fetch //www.baidu.com',
        '  $ phantom-fetch //www.baidu.com > baidu.txt',
        '',
        'Options',
        '  -p, --polling                       polling function',
        '  -v, --verbose                       verbose',
        '  -i, --interval                      interval',
        '  -t, --timeout                       timeout'
    ].join('\n')
}, {
    'boolean': [
        'verbose'
    ],
    string: [
        'polling',
        'interval',
        'timeout'
    ],
    alias: {
        p: 'polling',
        v: 'verbose',
        i: 'interval',
        t: 'timeout'
    }
});

/**
 * fetchCallback
 *
 * @param  {Error} err    phantom err
 * @param  {string} id     task id
 * @param  {string} result renderd html
 * @param  {Function} exit   phantom exit
 */
function fetchCallback(err, id, result, exit) {

    if (err) {
        console.error(err);
        throw (err);
    }

    process.stdout.write(result);

    exit();
}

/**
 * getPollingFunction
 *
 * @param  {string} str pollingFunction str
 * @return {Function}     pollingFunction
 */
function getPolling(str) {

    if (!str) {
        return;
    }

    try {
        return new Function('return ' + str);
    }
    catch (ex) {
        throw (ex);
    }
}

/**
 * pollingFunction
 *
 * @return {string} target string
 */
function pollingFunction() {
    return document.documentElement.innerHTML;
}

/**
 * fetch
 *
 * @param  {string} url     url
 * @param  {Object} options options
 */
function fetch(url, options) {

    fetcher.options(options);

    var config = {
        id: Date.now(),
        url: url,
        callback: fetchCallback,
        pollingFunction: getPolling(options.polling) || pollingFunction
    };

    fetcher.fetch(config);

}

// check input
if (!cli.input.length) {
    cli.showHelp();
}
else {
    fetch(cli.input[0], cli.flags);
}

