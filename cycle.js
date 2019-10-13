module.exports = function(RED) {
    function CycleNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            var nodeContext = this.context();
            var conf_outputs = parseInt(config.outputs);
            var out = new Array(conf_outputs);
            var output = nodeContext.get('output') || 0;
            if (msg.hasOwnProperty("reset")) {
                nodeContext.set('output', 0);
            } else {
                out[output] = msg;
                output = (output + 1) % conf_outputs;
                nodeContext.set('output', output);
                node.send(out);
            }
        });
    }
    RED.nodes.registerType("cycle",CycleNode);
}
