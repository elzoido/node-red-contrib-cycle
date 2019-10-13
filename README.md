# node-red-contrib-cycle
A node that cycles sequentially between all outputs.

For the first message, the flow will be routed to the first output, on the next to the second and so on. After reaching the last output, the next message will again be routed to the first output.

The internal state is only stored in memory, so after restarting Node-RED, the next message will be routed to the first output.

Multiple nodes may be used in the same flow without interfering with each other.