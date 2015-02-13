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
        '  -p, --evaluate                       evaluate function'
    ].join('\n')
}, {
    string: [
        'evaluate'
    ],
    alias: {
        e: 'evaluate'
    }
});

/**
 * evaluateFunction
 *
 * @return {string} target string
 */
function evaluateFunction() {
    return document.querySelector('html').innerHTML;
}

/**
 * getEvaluateFunction
 *
 * @param  {string} str evaluateFunction str
 * @return {Function}     evaluateFunction
 */
function getEvaluate(str) {

    if (!str) {
        return evaluateFunction;
    }

    try {
        return new Function('return ' + str);
    }
    catch (ex) {
        throw (ex);
    }

    return evaluateFunction;
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

                if (status === 'success') {

                    page.evaluate(getEvaluate(options.evaluate), function (result) {
                        process.stdout.write(result);
                        ph.exit();
                    });

                }
                else {
                    ph.exit();
                    console.error('open page fail');
                    process.exit(-1);
                }

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

