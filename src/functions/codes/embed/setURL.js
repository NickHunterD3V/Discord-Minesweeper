module.exports = async (d, url) => {
    if (d.function.parent !== 'newEmbed') return d.throwError.notAllowed(d, `#(newEmbed)`)

    if (url == undefined) return d.throwError.required(d, 'url')

    d.data.embeds[d.data.embedIndex] = d.data.embeds[d.data.embedIndex].setURL(url);
};