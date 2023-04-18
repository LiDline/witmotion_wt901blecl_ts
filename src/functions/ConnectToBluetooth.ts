import { DeviceInterface } from "./ConnectToUsb";
import { SensorData } from "./ExtractDataFromRaw";

export class UsingBluetooth implements DeviceInterface {
  private readUUID = "0000ffe4-0000-1000-8000-00805f9a34fb";

  // Подключаемся к USB
  Connect = async (onDataReceived?: (data: SensorData) => void) => {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
    });
  };

  // Отключение от устройства
  public Disconnect = async () => {};

  // Запись на устройство
  public Write = async (command: String | Number) => {};
}
