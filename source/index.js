const express = require('express');
const app = express();

app.get("/", (request, response) => {
	response.sendStatus(200);
});

process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("\nANTI-CRASH | Here I am!");
});

app.listen(process.env.PORT);

const { DiscordClient } = require("./src/index.js")

new DiscordClient({
	token: process.env.TOKEN,
	prefix: "ms!",
	intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
	logJSErrors: true
})
	.addDatabase("data", {
		calcValue: "",
        generalLogs: '1018707984748134470',
        entranceLogs: '1018722055128092712',
        nicknameChangeLogs: '1019075099250413568',
	})
    /*.addDatabase('termo', {
        palavras,
        palavrasDificil,
        gerando: 'false',
        acertou: 'true',
        restantes: '6',
        pausado: 'false',
        quantia: '5',
        quantiaDicas: '3',
        mensagem: '',
        palavra: '',
        tentativas: '',
        naoInclui: '',
        dica: '',
        canal: '',
    })*/
    .addDatabase("game", {
        data: "{}"
    })
	.readFolder("./commands")
	.addEvents('messageCreate', 'interactionCreate', 'userJoin', 'userLeave')
	.addStatus({
		text: "ms!help | made by HyTera Development",
		type: 'listening',
		time: "15s"
	}, {
		text: "Discord MineSweeper v1 ",
		type: 'playing',
		time: "15s"
	})
