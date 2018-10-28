import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import style from './style'

import SensorHelper from './helpers/sensorHelper'
import WebSocketHelper from './helpers/webSocketHelper'

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
			this.orientation = orientation
			this.broadcast()
		})
	}

	broadcast() {
		let { acceleration, orientation } = this
		this.ws.send({
			isRecording: this.state.isRecording,
			data: { acceleration, orientation }
		})
	}
	
	toggleExecution() {
		this.setState(prevState => ({ isRecording: !prevState.isRecording }))
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