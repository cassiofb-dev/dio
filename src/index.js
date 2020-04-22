const Discord = require('discord.js');
const client = new Discord.Client();
const dio = require('./database/dio.json');

client.login(dio.config.token);

client.on('ready', () => {
    console.log(`logged as ${client.user.tag}`);
});

client.on('message', async msg => {

    const data = msg.content.toLowerCase();

    if(dio.responses.indexOf(data) === -1) return;

    const embed = new Discord.MessageEmbed();

    embed.setColor('#FFF000');
    embed.setTitle('Dio approaches the chat...');

    if(dio.gifs.responses.indexOf(data) !== -1){
        embed.setImage(dio.gifs[data]);
    }else if(dio.imgs.responses.indexOf(data) !== -1){
        embed.setImage(dio.imgs[data]);
    }

    if(dio.quotes.responses.indexOf(data) !== -1){
        embed.addFields({
            name:"Kono Dio Da! says:",
            value: dio.quotes[data]
        });
    }

    if(data === 'dio quotes'){
        const quote = dio.quotes[dio.quotes.responses[Math.floor(Math.random()*dio.quotes.responses.length)]]
        embed.addFields({
            name:"Kono Dio Da! says:",
            value: quote
        });
    }

    msg.channel.send(embed);
});