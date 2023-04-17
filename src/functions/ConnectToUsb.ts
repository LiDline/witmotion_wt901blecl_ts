import { sleep } from "@amcharts/amcharts5/.internal/core/util/Time";
import { CommandSettings } from "./CommandsForDevice";
import { SensorData, extractDataFromRaw } from "./ExtractDataFromRaw";

export class UsingUsb implements DeviceInterface {
  private port: SerialPort;
  private reader: ReadableStreamDefaultReader<any>;

  // Подключаемся к USB
  Connect = async (onDataReceived?: (data: SensorData) => void) => {
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
  public Disconnect = async () => {
    this.reader.cancel();
    this.reader.releaseLock();
    this.port.close();
  };

  // Запись на устройство
  public Write = async (command: String | Number) => {
    const writer = this.port.writable.getWriter();
    switch (command) {
      case "accelerometer_calibration":
        const data = new Uint8Array(CommandSettings.accelerometer_calibration);
        await writer.write(data);
        await sleep(3100);
        await writer.write(
          new Uint8Array(CommandSettings.exit_calibration_mode)
        );
        break;
      case "magnetometer_calibration":
        await writer.write(
          new Uint8Array(CommandSettings.magnetometer_calibration)
        );
        break;
      case "exit_calibration_mode":
        await writer.write(
          new Uint8Array(CommandSettings.exit_calibration_mode)
        );
        break;
      case "6 DOF":
        await writer.write(new Uint8Array(CommandSettings.DOF_6));
        await writer.write(new Uint8Array(CommandSettings.save_configuration));
        break;
      case "9 DOF":
        await writer.write(new Uint8Array(CommandSettings.DOF_9));
        await writer.write(new Uint8Array(CommandSettings.save_configuration));
        break;
      case 0.2:
        await writer.write(new Uint8Array(CommandSettings["0.2"]));
        await writer.write(new Uint8Array(CommandSettings.save_configuration));
        break;
      case 0.5:
        await writer.write(new Uint8Array(CommandSettings["0.5"]));
        await writer.write(new Uint8Array(CommandSettings.save_configuration));
        break;
      case 1:
        await writer.write(new Uint8Array(CommandSettings[1]));
        await writer.write(new Uint8Array(CommandSettings.save_configuration));
        break;
      case 2:
        await writer.write(new Uint8Array(CommandSettings[2]));
        await writer.write(new Uint8Array(CommandSettings.save_configuration));
        break;
      case 5:
        await writer.write(new Uint8Array(CommandSettings[5]));
        await writer.write(new Uint8Array(CommandSettings.save_configuration));
        break;
      case 10:
        await writer.write(new Uint8Array(CommandSettings[10]));
        await writer.write(new Uint8Array(CommandSettings.save_configuration));
        break;
      case 20:
        await writer.write(new Uint8Array(CommandSettings[20]));
        await writer.write(new Uint8Array(CommandSettings.save_configuration));
        break;
      case 50:
        await writer.write(new Uint8Array(CommandSettings[50]));
        await writer.write(new Uint8Array(CommandSettings.save_configuration));
        break;
    }

    // Allow the serial port to be closed later.
    writer.releaseLock();
  };
}

export interface DeviceInterface {
  Connect(onDataReceived?: (data: SensorData) => void): Promise<void>;
  Disconnect(): Promise<void>;
  Write(command: String | Number): Promise<void>;
}
