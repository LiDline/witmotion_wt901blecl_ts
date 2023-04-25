import { SensorData } from "./ExtractDataFromRaw";
import { UsingUsb } from "./ConnectToUsb";
import { UsingBluetooth } from "./ConnectToBluetooth";
import { Device, DeviceInterface } from "./Device";

export class Application extends Device {
  device: DeviceInterface;

  // Выбор считывателя
  public choiceReader = (kind: boolean) => {
    switch (kind) {
      case false:
        this.device = new UsingUsb();
        break;
      case true:
        this.device = new UsingBluetooth();
        break;
    }
  };


  public connect = async (
    onDataReceived?: (data: SensorData) => void // Сигнатура функции, позволяющая передать сюда другую функцию со своими фокусами
  ) => {
    this.device.connect(onDataReceived);
  };


  public disconnect = async () => {
    this.device.disconnect();
  };

  public accelerometerCalibration = async () => {
    this.device.accelerometerCalibration();
  };

  public magnetometerCalibration = async (command: String) => {
    this.device.magnetometerCalibration(command);
  };

  public dofSelect = async (command: String) => {
    this.device.dofSelect(command);
  };

  public rateSelect = async (command: Number) => {
    this.device.rateSelect(command);
  };
}
