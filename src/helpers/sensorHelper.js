import { MovementSensor } from 'NativeModules'

export default () => {
	
	const onAccelerometerChange = callback => {
		MovementSensor.onAcceleration(callback)
	}

	const onOrientationChange = callback => {
		MovementSensor.onRotation(callback)
	}

	return {
		onAccelerometerChange,
		onOrientationChange,
	}
}