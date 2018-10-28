package com.jagger;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import com.facebook.react.modules.core.DeviceEventManagerModule;

import android.hardware.Sensor;
import android.hardware.SensorManager;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;

import android.content.Context;

public class MovementSensor extends ReactContextBaseJavaModule implements SensorEventListener {

	private SensorManager sensorManager;
	private ReactApplicationContext reactContext;

	public MovementSensor(ReactApplicationContext reactContext) {
		super(reactContext);

		this.reactContext = reactContext;
		this.sensorManager = (SensorManager) reactContext.getSystemService(Context.SENSOR_SERVICE);
	}

	@Override
	public String getName() {
		return "MovementSensor";
	}

	@Override
	public void onSensorChanged(SensorEvent sensorEvent) {
		if(sensorEvent.sensor.getType() == Sensor.TYPE_LINEAR_ACCELERATION) {
			this.reactContext
				.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
				.emit("acceleration", this.sensorDataToPoint(sensorEvent.values));
		}

		if(sensorEvent.sensor.getType() == Sensor.TYPE_ROTATION_VECTOR) {
			this.reactContext
				.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
				.emit("orientation", this.sensorDataToPoint(sensorEvent.values));
		}
	}

	@Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {}

	public WritableMap sensorDataToPoint(float[] sensorData) {
		WritableMap point = Arguments.createMap();

		point.putDouble("x", sensorData[0]);
		point.putDouble("y", sensorData[1]);
		point.putDouble("z", sensorData[2]);

		return point;
	}

	@ReactMethod
	public void startAcceleration() {
		Sensor sensor = sensorManager.getDefaultSensor(Sensor.TYPE_LINEAR_ACCELERATION);
		sensorManager.registerListener(this, sensor, SensorManager.SENSOR_DELAY_FASTEST);
	}

	@ReactMethod
	public void startOrientation() {
		Sensor sensor = sensorManager.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR);
		sensorManager.registerListener(this, sensor, SensorManager.SENSOR_DELAY_FASTEST);
	}
}