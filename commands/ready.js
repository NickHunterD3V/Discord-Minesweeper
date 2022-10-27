module.exports = {
    type: 'ready',
    code: `
#(log HyteScript discord client: Logged in client: #(client name))
#(newArray gs | #(allGuilds))
#(arrayMap gs | #(allGuildMembers | {arrElement}))

`
}