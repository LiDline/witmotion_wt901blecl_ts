import { SensorData } from "./ExtractDataFromRaw";
import { DeviceInterface, UsingUsb } from "./ConnectToUsb";
import { UsingBluetooth } from "./ConnectToBluetooth";

export class Application {
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

  // Подключение к устройству
  public connectToDevices = async (
    onDataReceived?: (data: SensorData) => void // Сигнатура функции, позволяющая передать сюда другую функцию со своими фокусами
  ) => {
    this.device.Connect(onDataReceived);
  };

  // Отключение от устройства
  public disconnectToDevices = async () => {
    this.device.Disconnect();
  };

  // Запись на устройство (пока только кал. акс.)
  public writeOnDevice = async (command: String | Number) => {
    this.device.Write(command);
  };
}
