/*
 * (C) Seth Lakowske
 */

var Deployer = require('./');
var test     = require('tape');
var Push     = require('github-push-event');
var fs       = require('fs');
var crypto   = require('crypto');
var bl       = require('bl');

function signBlob (key, blob) {
  return 'sha1=' +
  crypto.createHmac('sha1', key).update(blob).digest('hex')
}

test('can receive push events', function(t) {

    var dataSign = 'faked';
    var event    = 'faked';

    //read in event template
    var event = fs.readFileSync('pushEvent.txt');
    var b     = bl(function(err, data) {
        dataSig   = signBlob('testSecret', data);
        event = data;
    })

    b.write(event);

    b.end();

    var port = 3334;

    var path = '/webhook';

    var deployer = new Deployer({ path : path, secret : 'testSecret' });

    deployer.listen(port);

    //describe the webhook push event
    var push = new Push({
        url       : 'http://localhost:'+port+path,
        delivery  : 'b476ef00-8d9e-11e4-9962-1c7fc692548e',
        signature : dataSig,
        string    : event,
        hostname  : 'localhost',
        port      : port,
        path      : path,
    })

    //send the push event
    push.push(function() {
        deployer.close();
        t.end();
    });
})

