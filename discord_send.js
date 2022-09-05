const hooks={
	'ashcom-channel-name':'DISCORD CHANNEL WEBHOOK',
}

const md5 = require('md5')
const axios = require('axios')
const debug = require('debug')('relay')
const timer = require('debug')('timer')
const rhost = require('./rhost')
timer('start')
debug('relay start')

const username = rhost.decodeString(process.env['MUSHQ_A'])
const message = rhost.decodeString(process.env['MUSHQ_B'])
const channel = rhost.decodeString(process.env['MUSHQ_C'])
const shouldFire = (!message.startsWith('[D]') && !message.endsWith('connected.'))
//Change ApiTool in souldFire to whatever your API Object is named.

if(shouldFire){
	const hook = hooks[channel]
	debug('variables set')
	debug('firing')
	axios.post(hook,{
		'username':username,
		'content':message,
		'avatar_url':`https://www.gravatar.com/avatar/${md5(username)}?d=robohash`
	}).catch((e)=>{console.error(e.message)})
	debug('fired')
}
debug('closing script')
timer('end')
