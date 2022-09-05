const Discord = require('discord.js')
const client = new Discord.Client()
const axios = require('axios')
const rhost = require('./rhost')

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
	// don't respond to ourselves
	if(message.author == client.user)return
	// don't respond to webhooks
	if(message.author.discriminator == '0000')return
	const name = rhost.encodeString(`<${message.author.username}#${message.author.discriminator}>`)
	//const name = `<${message.member.displayName}#${message.author.discriminator}>`
	//Uncomment this, and comment the previous one to enable server nicknames instead.
	let post = rhost.encodeString(message.cleanContent)
	post = post.replace(/\r|\n|\r\n|\n\r/g,'%r%ch%cx%[cont%] ')
	if(message.attachments.array().length > 0){
		post = message.attachments.reduce((accumulate, attachment)=>`${accumulate}%r${attachment.url}`,`${post}%r- Attachments -`)
	}
	const execstring=`@cemitnp [udefault(me/chanhandler,${message.channel.name},${message.channel.name})]=%ch%cm[D]%cn ${name} ${post}`
	const headers={"Exec":execstring, "Encode":"Yes", "Parse":"ansiparse"}

	axios({
		method: 'post',
		url: 'http://0.0.0.0:60601',
		headers: headers,
		auth:{
			username: '#50',
			password: 'SomethingSecure'
		}
	}).catch((e)=>{console.error(e.message)})
})

client.login('DISCORD BOT TOKEN')
