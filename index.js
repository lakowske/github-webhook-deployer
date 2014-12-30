/*
 * (C) 2014 Seth Lakowske
 */

var gitPull       = require('git-pull');
var git           = require('git-rev');
var createHandler = require('github-webhook-handler');
var http          = require('http');

/*
 * Deployer listens for github push events and pulls the changes
 * if the current directories branch has changes.  It kills the current
 * process and the daemon manager (forever) relaunches the server with
 * the up-to-date code.
 */
function Deployer(options) {
    this.options = options;
}

Deployer.prototype.listen = function(port) {
    var handler = createHandler(this.options);

    http.createServer(function (req, res) {
        handler(req, res, function (err) {
            res.statusCode = 404
            res.end('no such location')
        })
    }).listen(port)

    handler.on('error', function (err) {
        console.error('Error:', err.message)
    })

    handler.on('push', function (event) {
        console.log('Received a push event for %s to %s',
                    event.payload.repository.name,
                    event.payload.ref)

        //console.log(JSON.stringify(event));
        //get our current branch
        git.branch(function (str) {
            console.log('branch', str)

            //pull the latest changes
            gitPull('./', function (err, consoleOutput) {
                if (err) {
                    console.error("Error!", err, consoleOutput);
                } else {
                    console.log("Success!", consoleOutput);
                    process.exit(0);
                }
            });

        })

    })

    handler.on('issues', function (event) {
        console.log('Received an issue event for % action=%s: #%d %s',
                    event.payload.repository.name,
                    event.payload.action,
                    event.payload.issue.number,
                    event.payload.issue.title)


    })
}

module.exports = Deployer;
