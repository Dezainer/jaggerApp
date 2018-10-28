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
		// DeviceEventEmitter.addListener('orientation', ({ x, y, z }) =>
		// 	callback({
		// 		x: percentageToDegrees(x),
		// 		y: percentageToDegrees(y),
		// 		z: percentageToDegrees(z)
		// 	})
		// )
	}

	const percentageToDegrees = percentage => (
		percentage * 180 + (percentage > 0 ? 0 : 360)
	)

	return {
		onAccelerometerChange,
		onOrientationChange,
	}
}