module.exports = {
    name: 'eval',
    code: `
#(newArray whitelist | 757006394531512390,786623348435976213)
#(if #(arrayIncludes whitelist | #(author)) != true | #(send you're dumb) #(break))

#(eval #(args all)) 
`
}

/*&eval #(createSlashCommand math | Math commands | 
	#(addSubcommand matrix | Resolves a matrix with given values and expression. | 
	  #(addNumberOption lines | Amount of matrix lines. | 1 || true) 
	  #(addNumberOption columns | Amount of matrix columns. | 1 || true))
      #(addStringOption expression | The expression of matrix values. ||| true)
)*/