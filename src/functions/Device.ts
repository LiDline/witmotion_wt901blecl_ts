import { SensorData } from "./ExtractDataFromRaw";

export interface DeviceInterface {
  connect(onDataReceived?: (data: SensorData) => void): Promise<void>;
  disconnect(): Promise<void>;
  accelerometerCalibration(): Promise<void>;
  magnetometerCalibration(command: String): Promise<void>;
  dofSelect(command: String): Promise<void>;
  rateSelect(command: Number): Promise<void>;
}

export class Device implements DeviceInterface {
  public CommandSettings = {
    accelerometer_calibration: new Uint8Array([255, 170, 1, 1, 0]),
    magnetometer_calibration: new Uint8Array([255, 170, 1, 7, 0]),
    exit_calibration_mode: new Uint8Array([255, 170, 1, 0, 0]),
    DOF_6: new Uint8Array([255, 170, 36, 1, 0]),
    DOF_9: new Uint8Array([255, 170, 36, 0, 0]),
    save_configuration: new Uint8Array([255, 170, 0, 0, 0]),
  };
  public RateSettings = {
    rate_02: new Uint8Array([255, 170, 3, 1, 0]),
    rate_05: new Uint8Array([255, 170, 3, 2, 0]),
    rate_1: new Uint8Array([255, 170, 3, 3, 0]),
    rate_2: new Uint8Array([255, 170, 3, 4, 0]),
    rate_5: new Uint8Array([255, 170, 3, 5, 0]),
    rate_10: new Uint8Array([255, 170, 3, 6, 0]),
    rate_20: new Uint8Array([255, 170, 3, 7, 0]),
    rate_50: new Uint8Array([255, 170, 3, 8, 0]),
  };

  public connect = async (onDataReceived?: (data: SensorData) => void) => {};

  public disconnect = async () => {};

  public accelerometerCalibration = async () => {};

  public magnetometerCalibration = async (command: String) => {};

  public dofSelect = async (command: String) => {};

  public rateSelect = async (command: Number) => {};

}
