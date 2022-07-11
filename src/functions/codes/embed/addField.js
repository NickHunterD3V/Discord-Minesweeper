module.exports = async (d, name, value, inline = 'false') => {
    if (d.function.parent !== 'newEmbed') return d.throwError.notAllowed(d, `#(newEmbed)`)

    if (name == undefined) return d.throwError.required(d, 'name')
    if (value == undefined) return d.throwError.required(d, 'value')

    d.data.embeds[d.data.embedIndex] = d.data.embeds[d.data.embedIndex].addField(name, value, inline === 'true' ? true : false);
    
};