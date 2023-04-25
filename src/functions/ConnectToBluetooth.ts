import { Device } from "./Device";
import { SensorData, extractDataFromRaw } from "./ExtractDataFromRaw";

export class UsingBluetooth extends Device {
  private serviceUUID = "0000ffe5-0000-1000-8000-00805f9a34fb";
  private readUUID = "0000ffe4-0000-1000-8000-00805f9a34fb";
  private writeUUID = "0000ffe9-0000-1000-8000-00805f9a34fb";
  private server: BluetoothRemoteGATTServer | undefined;
  private service: BluetoothRemoteGATTService | undefined;

  // Подключаемся к Bluetooth
  connect = async (onDataReceived?: (data: SensorData) => void) => {
    // Ищем датчик по uuid его сервиса (он единственный) и подключаемся
    const device = await navigator.bluetooth.requestDevice({
      // uuid сервисов можно глянуть на "chrome://bluetooth-internals" (для Chrome)
      filters: [{ services: [this.serviceUUID] }],
    });
    this.server = await device.gatt?.connect();

    // Подключаемся к сервису и нужной характеристике (сейчас считывание)
    this.service = await this.server?.getPrimaryService(this.serviceUUID);
    const characteristic = await this.service?.getCharacteristic(this.readUUID);

    // Создаём прослушиваетель событий, в котором будем преобразовывать и отправлять получаемые данные
    characteristic?.addEventListener("characteristicvaluechanged", (event) => {
      const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
      if (value !== undefined) {
        const byteData = new Uint8Array(value.buffer);
        onDataReceived && onDataReceived(extractDataFromRaw(byteData));
      }
    });


    await characteristic?.startNotifications();
  };


  public disconnect = async () => {
    this.server?.disconnect();
  };

  // public write = async (command: String | Number) => {
  //   const characteristic = await this.service?.getCharacteristic(
  //     this.writeUUID
  //   );
  //   switchWrite(command, characteristic?.writeValue.bind(characteristic));
  // };

  public accelerometerCalibration = async () => {

  };

  public magnetometerCalibration = async (command: String) => {

  };

  public dofSelect = async (command: String) => {

  };

  public rateSelect = async (command: Number) => {

  };
}
