import { MovementSensor } from 'NativeModules'
import { DeviceEventEmitter } from 'react-native'

export default () => {
	
	const onAccelerometerChange = callback => {
		MovementSensor.startAcceleration()
		DeviceEventEmitter.addListener('acceleration', callback)
	}

	const onOrientationChange = callback => {
		MovementSensor.startOrientation()
		DeviceEventEmitter.addListener('orientation', callback)
	}
	
	return {
		onAccelerometerChange,
		onOrientationChange
	}
}