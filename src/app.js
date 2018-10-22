import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import style from './style'

import SensorHelper from './src/sensorHelper'
import WebSocketHelper from './src/webSocketHelper'

export default class App extends React.Component {

	state = {}
	
	ws = new WebSocketHelper()
	sensorHelper = new SensorHelper()

	componentWillMount() {
		this.setupSensors()
	}

	setupSensors() {
		this.sensorHelper.onAccelerometerChange(acceleration => {
			this.acceleration = acceleration
		})

		this.sensorHelper.onOrientationChange(orientation => {
			let { azimuth: x, pitch: y, roll: z } = orientation
			this.orientation = { x, y, z }

			this.broadcast()
		})
	}

	broadcast() {
		let { acceleration, orientation } = this
		this.state.running && this.ws.send({ acceleration, orientation })
	}
	
	toggleExecution() {
		this.setState(prevState => ({ running: !prevState.running }))
	}

	render() {
		return (
			<View style={ style.container }>
				<TouchableOpacity 
					style={ style.button }
					onPress={ () => this.toggleExecution() }
				>
					<Text style={ style.textLabel }>Toggle</Text>
				</TouchableOpacity>
			</View>
		)
	}
}