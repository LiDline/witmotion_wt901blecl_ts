import { DeviceInterface } from "./ConnectToUsb";
import { SensorData } from "./ExtractDataFromRaw";

export class UsingBluetooth implements DeviceInterface {
  private readUUID = "0000ffe4-0000-1000-8000-00805f9a34fb";

  // Подключаемся к USB
  Connect = async (onDataReceived?: (data: SensorData) => void) => {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
    });
    console.log(device.name);
    const server = await device.gatt?.connect();

    // const service = await server?.getPrimaryService(serviceUUID);
    // const characteristic = await service?.getCharacteristic(characteristicUUID);
    // Дальнейшие действия с characteristic...
  };

  // Отключение от устройства
  public Disconnect = async () => {};

  // Запись на устройство
  public Write = async (command: String | Number) => {};
}
