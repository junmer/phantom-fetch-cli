#!/usr/bin/env node

/**
 * @file fetch cli
 * @author junmer
 */

/* eslint-env node */
var phantom = require('phantom');
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
        '  -p, --polling                       polling function'
    ].join('\n')
}, {
    string: [
        'polling'
    ],
    alias: {
        p: 'polling'
    }
});

/**
 * pollingFunction
 *
 * @return {string} target string
 */
function pollingFunction() {
    return document.querySelector('html').innerHTML;
}

/**
 * getPollingFunction
 *
 * @param  {string} str pollingFunction str
 * @return {Function}     pollingFunction
 */
function getPolling(str) {

    if (!str) {
        return pollingFunction;
    }

    try {
        return new Function('return ' + str);
    }
    catch (ex) {
        throw (ex);
    }

    return pollingFunction;
}


/**
 * fetch
 *
 * @param  {string} url     url
 * @param  {Object} options options
 */
function fetch(url, options) {

    options['load-images'] = 'no';

    phantom.create(function (ph) {
        ph.createPage(function (page) {

            page.open(url, function (status) {

                // if (status !== 'success') {
                //     throw new Error('status: ' + status);
                // }

                page.evaluate(getPolling(options.polling), function (result) {
                    process.stdout.write(result);
                    ph.exit();
                });

            });
        });
    }, options);

}

// check input
if (!cli.input.length) {
    cli.showHelp();
}
else {
    fetch(cli.input[0], cli.flags);
}

