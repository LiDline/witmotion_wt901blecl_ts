import { sleep } from "@amcharts/amcharts5/.internal/core/util/Time";
import { Device } from "./Device";
import { SensorData, extractDataFromRaw } from "./ExtractDataFromRaw";

export class UsingUsb extends Device {
  private port: SerialPort;
  private reader: ReadableStreamDefaultReader<any>;

  // Подключаемся к USB
  connect = async (onDataReceived?: (data: SensorData) => void) => {
    this.port = await navigator.serial.requestPort({
      filters: [{ usbVendorId: 6790, usbProductId: 29987 }],
    });
    await this.port.open({ baudRate: 115200 });
    this.reader = this.port.readable.getReader();

    while (true) {
      const { value, done } = await this.reader.read();

      if (value.length !== 20) {
        continue;
      }

      // скидываем в функцию данные (сделали эту функцию не обязательной)
      onDataReceived && onDataReceived(extractDataFromRaw(value));

      if (done) {
        break;
      }
    }
  };

  // Отключение от устройства
  public disconnect = async () => {
    this.reader.cancel();
    this.reader.releaseLock();
    this.port.close();
  };

  public accelerometerCalibration = async () => {
    const writer = this.port.writable.getWriter();
    await writer.write(this.CommandSettings.accelerometer_calibration);
    await sleep(3100);
    await writer.write(this.CommandSettings.exit_calibration_mode);
    // Иначе другие не запустятся
    writer.releaseLock();
  };

  public magnetometerCalibration = async (command: String) => {
    const writer = this.port.writable.getWriter();
    switch (command) {
      case "start":
        await writer.write(this.CommandSettings.magnetometer_calibration);
        break;
      case "stop":
        await writer.write(this.CommandSettings.exit_calibration_mode);
        break;
    }
    writer.releaseLock();
  };

  public dofSelect = async (command: String) => {
    const writer = this.port.writable.getWriter();
    switch (command) {
      case "6 DOF":
        await writer.write(this.CommandSettings.DOF_6);
        break;
      case "9 DOF":
        await writer.write(this.CommandSettings.DOF_9);
        break;
    }
    writer.releaseLock();
  };

  public rateSelect = async (command: Number) => {
    const writer = this.port.writable.getWriter();
    switch (command) {
      case 0.2:
        await writer.write(this.RateSettings.rate_02);
        break;
      case 0.5:
        await writer.write(this.RateSettings.rate_05);
        break;
      case 1:
        await writer.write(this.RateSettings.rate_1);
        break;
      case 2:
        await writer.write(this.RateSettings.rate_2);
        break;
      case 5:
        await writer.write(this.RateSettings.rate_5);
        break;
      case 10:
        await writer.write(this.RateSettings.rate_10);
        break;
      case 20:
        await writer.write(this.RateSettings.rate_20);
        break;
      case 50:
        await writer.write(this.RateSettings.rate_50);
        break;
    }
    await writer.write(this.CommandSettings.save_configuration);
    writer.releaseLock();
  };
}
