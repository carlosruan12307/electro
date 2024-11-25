const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
    send: (channel, data) => {
        console.log(channel, data);
    },
});
