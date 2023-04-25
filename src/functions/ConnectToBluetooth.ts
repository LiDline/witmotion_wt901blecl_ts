import { sleep } from "@amcharts/amcharts5/.internal/core/util/Time";
import { Device } from "./Device";
import { SensorData, extractDataFromRaw } from "./ExtractDataFromRaw";

export class UsingBluetooth extends Device {
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
    this.writeCharacteristic?.writeValue(
      this.CommandSettings.accelerometer_calibration
    );
    await sleep(3100);
    this.writeCharacteristic?.writeValue(
      this.CommandSettings.exit_calibration_mode
    );
  };

  public magnetometerCalibration = async (command: String) => {
    switch (command) {
      case "start":
        await this.writeCharacteristic?.writeValue(
          this.CommandSettings.magnetometer_calibration
        );
        break;
      case "stop":
        await this.writeCharacteristic?.writeValue(
          this.CommandSettings.exit_calibration_mode
        );
        break;
    }
  };

  public dofSelect = async (command: String) => {
    switch (command) {
      case "6 DOF":
        await this.writeCharacteristic?.writeValue(this.CommandSettings.DOF_6);
        break;
      case "9 DOF":
        await this.writeCharacteristic?.writeValue(this.CommandSettings.DOF_9);
        break;
    }
    await this.writeCharacteristic?.writeValue(
      this.CommandSettings.save_configuration
    );
  };

  public rateSelect = async (command: Number) => {
    switch (command) {
      case 0.2:
        await this.writeCharacteristic?.writeValue(this.RateSettings.rate_02);
        break;
      case 0.5:
        await this.writeCharacteristic?.writeValue(this.RateSettings.rate_05);
        break;
      case 1:
        await this.writeCharacteristic?.writeValue(this.RateSettings.rate_1);
        break;
      case 2:
        await this.writeCharacteristic?.writeValue(this.RateSettings.rate_2);
        break;
      case 5:
        await this.writeCharacteristic?.writeValue(this.RateSettings.rate_5);
        break;
      case 10:
        await this.writeCharacteristic?.writeValue(this.RateSettings.rate_10);
        break;
      case 20:
        await this.writeCharacteristic?.writeValue(this.RateSettings.rate_20);
        break;
      case 50:
        await this.writeCharacteristic?.writeValue(this.RateSettings.rate_50);
        break;
    }
    await this.writeCharacteristic?.writeValue(
      this.CommandSettings.save_configuration
    );
  };
}
