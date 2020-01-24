const hooks={
	'newbie':'https://discordapp.com/api/webhooks/665537445445763083/5Dkklgi2U8TIuc3TEUK4_53sF9f59hamJojpzUIrHJmUtZ0sBLgKRe4Ki4Naio6SdJfQ',
	'public':'https://discordapp.com/api/webhooks/657282464682606595/iljMIKzVlGOPFLB3RmQwgOQAYQc2nucLfXR7fn0EkijL83SmV0ywvmjm99GGigQdESz3',
	'ad-workshop':'https://discordapp.com/api/webhooks/665537954256650250/9cDHyyvzceCYS4LgtIp23JCwYVH5OtQIAYwaE-G65VigA25zSRyrEWzrpx0YYnQIAaFK',
	'workshop':'https://discordapp.com/api/webhooks/665538090948886543/o7nNdtte-x3O3YNzzCNp7n4UafMBG_z364-y_A4CsjlEAwHzZCoF245Fymj0YWWyN6cY',
	'test':'https://discordapp.com/api/webhooks/670032397567524864/y25MIeeJLJ3fQjGtGqoP341kmKXWm7mnnN5QVWFXXxwik0h7nMq7_YuYXBwYrhAXZqIq',
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
const shouldFire = (username != "ApiTool" && !message.endsWith('connected.'))


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
