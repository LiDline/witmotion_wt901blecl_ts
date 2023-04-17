import { DeviceInterface } from "./ConnectToUsb";
import { SensorData } from "./ExtractDataFromRaw";

export class UsingBluetooth implements DeviceInterface {
  // Подключаемся к USB
  Connect = async (onDataReceived?: (data: SensorData) => void) => {};

  // Отключение от устройства
  public Disconnect = async () => {};
  
  // Запись на устройство
  public Write = async (command: String | Number) => {};
}
