import { DeviceInterface } from "./ConnectToUsb";
import { SensorData } from "./ExtractDataFromRaw";

export class UsingBluetooth implements DeviceInterface {
  private serviceUUID = "0000ffe5-0000-1000-8000-00805f9a34fb";
  private readUUID = "0000ffe4-0000-1000-8000-00805f9a34fb";
  private writeUUID = "0000ffe9-0000-1000-8000-00805f9a34fb";
  private server: BluetoothRemoteGATTServer | undefined;

  // Подключаемся к USB
  Connect = async (onDataReceived?: (data: SensorData) => void) => {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [this.serviceUUID] }],
    });
    this.server = await device.gatt?.connect();

    const service = await this.server?.getPrimaryService(this.serviceUUID);
    const characteristic = await service?.getCharacteristic(this.readUUID);

    // Получим одно уведомление с датчика
    const value = await characteristic?.readValue();
    console.log(value);

  };

  // Отключение от устройства
  public Disconnect = async () => {
    this.server?.disconnect();
  };

  // Запись на устройство
  public Write = async (command: String | Number) => {};
}
