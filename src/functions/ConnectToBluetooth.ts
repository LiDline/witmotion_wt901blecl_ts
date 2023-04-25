import { DeviceInterface } from "./Device";
import { SensorData, extractDataFromRaw } from "./ExtractDataFromRaw";
import {
  defaultAccelerometerCalibration,
  defaultDofSelect,
  defaultMagnetometerCalibration,
  defaultRateSelect,
} from "./CalibrationFunctions";

export class UsingBluetooth implements DeviceInterface {
  private serviceUUID = "0000ffe5-0000-1000-8000-00805f9a34fb";
  private readUUID = "0000ffe4-0000-1000-8000-00805f9a34fb";
  private writeUUID = "0000ffe9-0000-1000-8000-00805f9a34fb";
  private server: BluetoothRemoteGATTServer | undefined;
  private service: BluetoothRemoteGATTService | undefined;
  private writeCharacteristic: BluetoothRemoteGATTCharacteristic | undefined;

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
    const readCharacteristic = await this.service?.getCharacteristic(
      this.readUUID
    );
    this.writeCharacteristic = await this.service?.getCharacteristic(
      this.writeUUID
    );

    // Создаём прослушиваетель событий, в котором будем преобразовывать и отправлять получаемые данные
    readCharacteristic?.addEventListener(
      "characteristicvaluechanged",
      (event) => {
        const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
        if (value !== undefined) {
          const byteData = new Uint8Array(value.buffer);
          onDataReceived && onDataReceived(extractDataFromRaw(byteData));
        }
      }
    );

    await readCharacteristic?.startNotifications();
  };

  public disconnect = async () => {
    this.server?.disconnect();
  };

  public accelerometerCalibration = async () => {
    await defaultAccelerometerCalibration(
      this.writeCharacteristic?.writeValue.bind(this.writeCharacteristic)
    );
  };

  public magnetometerCalibration = async (command: String) => {
    await defaultMagnetometerCalibration(
      command,
      this.writeCharacteristic?.writeValue.bind(this.writeCharacteristic)
    );
  };

  public dofSelect = async (command: String) => {
    await defaultDofSelect(
      command,
      this.writeCharacteristic?.writeValue.bind(this.writeCharacteristic)
    );
  };

  public rateSelect = async (command: Number) => {
    await defaultRateSelect(
      command,
      this.writeCharacteristic?.writeValue.bind(this.writeCharacteristic)
    );
  };
}
