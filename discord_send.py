import requests
import os
from discord import Webhook, RequestsWebhookAdapter

hooks={
        'newbie':'https://discordapp.com/api/webhooks/665537445445763083/5Dkklgi2U8TIuc3TEUK4_53sF9f59hamJojpzUIrHJmUtZ0sBLgKRe4Ki4Naio6SdJfQ',
        'public':'https://discordapp.com/api/webhooks/657282464682606595/iljMIKzVlGOPFLB3RmQwgOQAYQc2nucLfXR7fn0EkijL83SmV0ywvmjm99GGigQdESz3',
        'ad-workshop':'https://discordapp.com/api/webhooks/665537954256650250/9cDHyyvzceCYS4LgtIp23JCwYVH5OtQIAYwaE-G65VigA25zSRyrEWzrpx0YYnQIAaFK',
        'workshop':'https://discordapp.com/api/webhooks/665538090948886543/o7nNdtte-x3O3YNzzCNp7n4UafMBG_z364-y_A4CsjlEAwHzZCoF245Fymj0YWWyN6cY',
        }

channel = os.environ['MUSHQ_C']
hook = hooks[channel]
webhook = Webhook.from_url(hook, adapter=RequestsWebhookAdapter())

username = os.environ['MUSHQ_A']
message = os.environ['MUSHQ_B']
if(username != "ApiTool"):
    webhook.send(message, username=username)
