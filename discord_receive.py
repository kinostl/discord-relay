import discord
import asyncio
import requests
import emoji

class RhostRelayClient(discord.Client):
    async def on_ready(self):
        print('Logged on as', self.user)

    async def on_message(self, message):
        # don't respond to ourselves
        if message.author == self.user:
            return
        # don't respond to webhooks
        if message.author.discriminator == '0000':
            return
	# rhost api update channel
        #execstring="cemit({},escape({}#{} says, \"{}\"))".format(message.channel.name,message.author.display_name, message.author.discriminator, message.clean_content).encode('ascii', 'ignore').decode('ascii')
        execstring="cemit({},escape({}#{} says, \"{}\"))".format(message.channel.name,message.author.display_name, message.author.discriminator, emoji.demojize(message.clean_content))
        headers={"Exec":execstring, "Encode":"Yes"}
        print(execstring)
        requests.post("http://localhost:60601",headers=headers,auth=("#50","SomethingSecure"))
        #print(message.content)
        #curl -X POST --user "#50:SomethingSecure" -H "Exec:cemit(test,ApiBot says 'cemit hello from API')" --head http://localhost:60601

# don't mind me I'm just going to use 
# A RIDICULOUS AMOUNT OF MEMORY
# to be a relay
# because Discord is a stupid piece of shit
# that constantly demands websockets for anything useful
client = RhostRelayClient()
client.run('NjU3NzUxMDM2OTc0NDY1MDcy.Xf1weA.9MJzhdsLT_cM220pH40gaTJoABQ')
