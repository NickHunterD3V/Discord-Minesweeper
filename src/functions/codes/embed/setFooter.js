module.exports = async (d, text, iconURL) => {
    if (d.function.parent !== 'newEmbed') return d.throwError.notAllowed(d, `#(newEmbed)`)

    if (text == undefined) return d.throwError.required(d, 'text')

    d.data.embeds[d.data.embedIndex] = d.data.embeds[d.data.embedIndex].setFooter({ text, iconURL });
};