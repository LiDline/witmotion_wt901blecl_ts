import { DeviceInterface } from "./ConnectToUsb";
import { SensorData, extractDataFromRaw } from "./ExtractDataFromRaw";

export class UsingBluetooth implements DeviceInterface {
  private serviceUUID = "0000ffe5-0000-1000-8000-00805f9a34fb";
  private readUUID = "0000ffe4-0000-1000-8000-00805f9a34fb";
  private writeUUID = "0000ffe9-0000-1000-8000-00805f9a34fb";
  private server: BluetoothRemoteGATTServer | undefined;

  // Подключаемся к USB
  Connect = async (onDataReceived?: (data: SensorData) => void) => {
    // Ищем датчик по uuid его сервиса (он единственный) и подключаемся
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [this.serviceUUID] }],
    });
    this.server = await device.gatt?.connect();

    // Подключаемся к сервису и нужной характеристике (сейчас считывание)
    const service = await this.server?.getPrimaryService(this.serviceUUID);
    const characteristic = await service?.getCharacteristic(this.readUUID);

    // Создаём прослушиваетель событий, в котором будем преобразовывать и отправлять получаемые данные
    characteristic?.addEventListener("characteristicvaluechanged", (event) => {
      const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
      if (value !== undefined) {
        const byteData = new Uint8Array(value.buffer);

        onDataReceived && onDataReceived(extractDataFromRaw(byteData));
      }
    });

    // Запускаем прослушиватель
    await characteristic?.startNotifications();
  };

  // Отключение от устройства
  public Disconnect = async () => {
    this.server?.disconnect();
  };

  // Запись на устройство
  public Write = async (command: String | Number) => {};
}
