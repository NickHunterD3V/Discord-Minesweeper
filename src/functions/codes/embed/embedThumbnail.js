module.exports = async d => {
    let [url, index = d.data.embeds.length] = d.func.params.splits;

    if (isNaN(index) || Number(index) < 1 || !d.data.embeds[Number(index) - 1]) return d.throwError.invalid(d, 'index', index);

    d.data.embeds[Number(index) - 1] = d.data.embeds[Number(index) - 1]
    .setThumbnail(url);
};