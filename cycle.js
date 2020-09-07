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
                var skip = 1;
                if (msg.hasOwnProperty('skip') && Number.isInteger(msg.skip.STATE)) {
                    skip = msg.skip.STATE;
                }
                out[output] = msg;
                output += skip;
                while (output < 0) {
                    output += conf_outputs;
                }
                output %= conf_outputs;
                nodeContext.set('output', output);
                node.send(out);
            }
        });
    }
    RED.nodes.registerType("cycle",CycleNode);
}
