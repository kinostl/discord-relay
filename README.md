This creates a relay between discord and rhost.
You need to fill in the hooks object with your hooks. Automated webhook creation might be done in the future, but for now its intentionally left out as a security measure.

discord_receive.js is a server that reads Discord, and calls an API Object to update Rhost.
discord_send.js is a curl-like script that makes a restful call to a Discord webhook when Rhost demands it to.

Move update_discord.sh into your Rhost Scripts folder, and make it executable.
Append this to your ComSysSIDEFX/DO_HIST1

`[setq(a,name(%#))][setq(b,[stripansi([r(7)])])][setq(c,[r(1)])][execscript(update_discord.sh)]`

Make sure you disable your API Count Handler by adding this to your netrhost.conf

`passapi_site 0.0.0.0 0.0.0.0`

You can use sites like normal to be restrictive on per site after doing this.
