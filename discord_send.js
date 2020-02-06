const hooks={
	'ashcom-channel-name':'https://discord.channel.webhook',
}

const md5 = require('md5')
const axios = require('axios')
const debug = require('debug')('relay')
const timer = require('debug')('timer')
timer('start')
debug('relay start')

const username = process.env['MUSHQ_A']
const message = process.env['MUSHQ_B']
const channel = process.env['MUSHQ_C']
const shouldFire = (!message.startsWith('[D]' && !message.endsWith('connected.'))
//Change ApiTool in souldFire to whatever your API Object is named.

if(shouldFire){
	const hook = hooks[channel]
	debug('variables set')
	debug('firing')
	axios.post(hook,{
		'username':username,
		'content':message,
		'avatar_url':`https://www.gravatar.com/avatar/${md5(username)}?d=robohash`
	})
	debug('fired')
}
debug('closing script')
timer('end')
