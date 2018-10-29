export default () => {
	let ws = new WebSocket('ws://192.168.15.7:3000?type=tracker')

	const send = data => {
		ws.readyState === ws.OPEN &&
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