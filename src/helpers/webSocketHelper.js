export default () => {
	let ws = new WebSocket('ws://192.168.15.7:3000')

	const send = data => {
		ws.send(JSON.stringify(data))
	}

	const close = () => {
		ws.close()
	}

	return {
		send,
		close
	}
}