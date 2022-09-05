// copied and pasted from deno-rhost
//

function* mapString(str) {
	for(var ch of str[Symbol.iterator]()) {
		var cp = ch.codePointAt(0)
		if(cp > 127) {
			cp = cp.toString(0x10).padStart(4, '0')
			yield `%<u${cp}>`
		} else {
			yield String.fromCodePoint(cp)
		}
	}
}

/* Output back to Rhost, Rhost-encoding all Unicode code points above low ASCII */
function encodeString(str) {
	var ret = ""
	for(var ch of mapString(str)) {
		ret += ch
	}
	return ret
}

/* Translate Rhost-encoded Unicode into utf-8 */
function decodeString(str) {
	return str.replace(/%<u([0-9a-fA-F]+)>/g, function(match, p1) {
		try {
			return String.fromCodePoint(Number.parseInt(p1, 0x10))
		} catch(e) {
			return p1
		}
	})
}

module.exports = {
	mapString,
	encodeString,
	decodeString
}
