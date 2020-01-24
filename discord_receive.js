const Discord = require('discord.js')
const client = new Discord.Client()
const emoji = require('node-emoji')
const axios = require('axios')

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
        // don't respond to ourselves
        if(message.author == client.user)return
        // don't respond to webhooks
        if(message.author.discriminator == '0000')return
        const execstring=`cemit(${message.channel.name},escape(${message.member.displayName}#${message.author.discriminator}->${emoji.unemojify(message.cleanContent)}))`
        const headers={"Exec":execstring, "Encode":"Yes"}
        console.log(execstring)
        //requests.post(,headers=headers,auth=("#50","SomethingSecure"))
	axios({
		method: 'post',
		url: 'http://0.0.0.0:60601',
		headers: headers,
		auth:{
			username: '#50',
			password: 'SomethingSecure'
		}
	})
})

client.login('NjU3NzUxMDM2OTc0NDY1MDcy.Xf1weA.9MJzhdsLT_cM220pH40gaTJoABQ')
