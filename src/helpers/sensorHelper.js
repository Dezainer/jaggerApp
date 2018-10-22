import { DeviceEventEmitter } from 'react-native'
import { SensorManager } from 'NativeModules'

export default () => {
	let changeRate = 1000 / 250

	SensorManager.startAccelerometer(changeRate)
	SensorManager.startOrientation(changeRate)
	
	const onAccelerometerChange = callback => {
		DeviceEventEmitter.addListener('Accelerometer', callback)
	}

	const onOrientationChange = callback => {
		DeviceEventEmitter.addListener('Orientation', callback)
	}

	const terminate = () => {
		SensorManager.stopAccelerometer()
		SensorManager.stopOrientation()
	}

	return {
		onAccelerometerChange,
		onOrientationChange,
		terminate
	}
}