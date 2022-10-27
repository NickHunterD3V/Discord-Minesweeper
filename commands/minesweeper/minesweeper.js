module.exports = [{
    name: "minesweeper-start",
    type: "commandInteraction",
    code: `
#(interactionDeferReply)
#(setCallback generateGame |
    #(block
        #(log test)
        #(newArray blocks | #(loop 10 | #(loop 10 | :white_large_square:)))
        #(set n | 25)
        #(while #(get n) > 0 |
            #(block
                #(set random | #(random 1 | 100))
                #(if #(arrayGet blocks | #(get random)) != :white_large_square: | #(break))
                #(arraySet blocks | #(get random) | :red_square:)
                #(subtract n)
            )
        )
        #(set fi | 1)
        #(set li | 10)
        #(newObject data | {
            "rows": [#(while #(get li) <= 100 |
                ["#(arraySlice blocks | #(get fi) | #(get li) | ", ")"]
                #(add fi | 10)
                #(add li | 10)
            )]
        })
        #(newObject nums | {
            "0": "zero",
            "1": "one",
            "2": "two",
            "3": "three",
            "4": "four",
        	"5": "five",
         	"6": "six",
          	"7": "seven",
           	"8": "eight"
        })
        #(set column | 0)
        #(set line | 0)
        #(set idx | 1)
        #(newArray blocksWithNumbers | #(arrayMap blocks | 
            #(if {arrElement} == :white_large_square: | 
                #(set bombs | 0)
                #(if #(calculate #(get column) - 1) != -1 && #(calculate #(get line) - 1) != -1 | 
                    #(if #(objectProperty data | rows | #(calculate #(get line) - 1) | #(calculate #(get column) - 1)) == :red_square: | #(add bombs))      
                )
                #(if #(calculate #(get line) - 1) != -1 | 
                    #(if #(objectProperty data | rows | #(calculate #(get line) - 1) | #(get column)) == :red_square: | #(add bombs))      
                )
                #(if #(calculate #(get column) + 1) != 10 && #(calculate #(get line) - 1) != -1 | 
                    #(if #(objectProperty data | rows | #(calculate #(get line) - 1) | #(calculate #(get column) + 1)) == :red_square: | #(add bombs))      
                )
                #(if #(calculate #(get column) - 1) != -1 | 
                    #(if #(objectProperty data | rows | #(get line) | #(calculate #(get column) - 1)) == :red_square: | #(add bombs))      
                )
                #(if #(calculate #(get column) + 1) != 10 | 
                    #(if #(objectProperty data | rows | #(get line) | #(calculate #(get column) + 1)) == :red_square: | #(add bombs))      
                )
                #(if #(calculate #(get column) - 1) != -1 && #(calculate #(get line) + 1) != 10 | 
                    #(if #(objectProperty data | rows | #(calculate #(get line) + 1) | #(calculate #(get column) - 1)) == :red_square: | #(add bombs))      
                )
                #(if #(calculate #(get line) + 1) != 10 | 
                    #(if #(objectProperty data | rows | #(calculate #(get line) + 1) | #(get column)) == :red_square: | #(add bombs))      
                )
                #(if #(calculate #(get column) + 1) != 10 && #(calculate #(get line) + 1) != 10 | 
                    #(if #(objectProperty data | rows | #(calculate #(get line) + 1) | #(calculate #(get column) + 1)) == :red_square: | #(add bombs))      
                )
                :#(objectProperty nums | #(get bombs)):
            | {arrElement})
            #(if #(get column) == 9 | 
                #(set column | 0)
                #(add line)
            |
                #(add column)    
            )
        ))
        #(log fmdd)
        #(set fi | 1)
        #(set li | 10)
        #(return {
            "id": "#(generateString 10)",
            "selected": "0,0",
            "shown": [],
            "rows": [#(while #(get li) <= 100 |
                ["#(arraySlice blocksWithNumbers | #(get fi) | #(get li) | ", ")"]
                #(add fi | 10)
                #(add li | 10)
            )]
        })
    )
)
#(if !#(hasUserVar data | game) | #(setUserVar data | #(runCallback generateGame) | game))
#(newObject data | #(getUserVar data | game))
#(log #(getObject data))

#(interactionEditReply #(runCallback minesweeperMessage))
`
}, {
    name: "minesweeperMessage",
    type: 'callback',
    code: `
#(newObject data | #(getUserVar data | game))
#(newRawArray lines | #(objectProperty data | rows))
#(newRawArray showns | #(objectProperty data | shown))
#(set line | 0)
#(newEmbed
    #(setTitle Minesweeper)
    #(setDescription 
        #(arrayMap lines |
            #(newRawArray l | {arrElement})
            #(set column | 0)
            #(arrayMap l |
                #(if #(unescape #(objectProperty data | selected)) == #(get column),#(get line) |
                    <:minesweeper_walkTile:1034989681424748656>
                |
                    #(if #(arrayIncludes showns | #(get column),#(get line)) | #(objectProperty data | rows | #(get line) | #(get column)) | <:minesweeper_tile:1034989700789841970>)
                )
                #(add column)
            | )
            #(set column | 0)
            #(add line)
        | %br%)
    )
)
#(newActionRow
    #(addButton secondary || mswp-break-#(author)-#(objectProperty data | id) || ⛏️)
    #(addButton primary || mswp-move_up-#(author)-#(objectProperty data | id) || ⬆️)
    #(addButton secondary || mswp-flag-#(author)-#(objectProperty data | id) || 🚩)
)
#(newActionRow
    #(addButton primary || mswp-move_left-#(author)-#(objectProperty data | id) || ⬅️)
    #(addButton primary || mswp-move_down-#(author)-#(objectProperty data | id) || ⬇️)
    #(addButton primary || mswp-move_right-#(author)-#(objectProperty data | id) || ➡️)
)
`
}, {
    type: "interaction",
    code: `
#(log #(interaction customId))
#(newArray d | #(interaction customId) | -)
#(if #(arrayGet d | 1) != mswp | #(break))
#(if #(arrayGet d | 3) != #(author) | #(interactionReply You can't use that button! | true) #(break))
#(if #(hasUserVar data | game) |
    #(newObject gameData | #(getUserVar data | game))
    #(if #(arrayGet d | 4) != #(objectProperty gameData | id) | #(interactionReply This game ended! | true) #(break))
|
    #(interactionReply This game ended!| true)
    #(break)
)
#(setCallback move_up |
    #(newArray pos | #(objectProperty gameData | selected))
    #(if #(arrayGet pos | 2) != 0 | #(arraySet pos | 2 | #(calculate #(arrayGet pos | 2) - 1)))
    #(objectSet gameData | selected | #(arrayJoin pos))
)
#(setCallback move_down |
    #(newArray pos | #(objectProperty gameData | selected))
    #(if #(arrayGet pos | 2) != 9 | #(arraySet pos | 2 | #(calculate #(arrayGet pos | 2) + 1)))
    #(objectSet gameData | selected | #(arrayJoin pos))
)
#(setCallback move_left |
    #(newArray pos | #(objectProperty gameData | selected))
    #(if #(arrayGet pos | 1) != 0 | #(arraySet pos | 1 | #(calculate #(arrayGet pos | 1) - 1)))
    #(objectSet gameData | selected | #(arrayJoin pos))
)
#(setCallback move_right |
    #(newArray pos | #(objectProperty gameData | selected))
    #(if #(arrayGet pos | 1) != 9 | #(arraySet pos | 1 | #(calculate #(arrayGet pos | 1) + 1)))
    #(objectSet gameData | selected | #(arrayJoin pos))
)
#(setCallback break |
    #(newRawArray shown | #(objectProperty gameData | shown))
    #(if #(arrayIncludes shown | #(objectProperty gameData | selected)) | #(break))
    #(arrayAppend shown | #(objectProperty gameData | selected))
    #(objectSet gameData | shown | ["#(arrayJoin shown | ", ")"])
)
#(setCallback flag |

)
#(runCallback #(arrayGet d | 2))
#(setUserVar data | #(getObject gameData) | game)
#(interactionUpdate #(runCallback minesweeperMessage))
`
}]




