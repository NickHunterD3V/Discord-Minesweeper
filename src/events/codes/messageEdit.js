module.exports = async d => {
    d.client.on('messageUpdate', message => {
        d.commandManager.messageEdit.forEach(commandData => {
            let data = {}

            for (const key in d) {
                if (Object.hasOwnProperty.call(d, key)) {
                    const element = d[key];
                    
                    data[key] = element;
                }
            }

            data.message = message
            data.guild = message.guild
            data.channel = message.channel
            data.author = message.author
            data.command = commandData
            data.eventType = 'messageEdit'
            data.error = false
            data.data = d.getData()

            data.reader.default(data, commandData.code)
        });
    })
}