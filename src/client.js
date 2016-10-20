var dgram   = require("dgram"),
    util    = require("util");



var Client = function(host, port, prefix) {
    this.host = host;
    this.port = port;
    this.prefix = prefix;

    // Create socket (ignore errors)
    this.socket = dgram.createSocket("udp4");
    this.socket.on("error", function() {});
};

Client.prototype.timing = function(bucket, value) {
    this.send(bucket, value + "|ms");
};

Client.prototype.count = function(bucket, value) {
    this.send(bucket, value + "|c");
};

Client.prototype.increment = function(bucket) {
    this.count(bucket, 1);
};

Client.prototype.decrement = function(bucket) {
    this.count(bucket, -1);
};

Client.prototype.gauge = function(bucket, value) {
    this.send(bucket, value + "|g");
};

Client.prototype.send = function(bucket, value) {

    var buffer = new Buffer(this.prefix + bucket + ":" + value);

    // Send (ignore errors)
    this.socket.send(buffer, 0, buffer.length, this.port, this.host,
        function (err, bytes) {}
    );
};


exports.Client = Client;
