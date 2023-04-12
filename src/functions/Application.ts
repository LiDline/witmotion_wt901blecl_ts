import { sleep } from "@amcharts/amcharts5/.internal/core/util/Time";
import { extractDataFromRaw, SensorData } from "./ExtractDataFromRaw";
import { CommandSettings } from "./CommandsForDevice";

export class Application {
  private port: SerialPort;
  private reader: ReadableStreamDefaultReader<any>;

  // Подключение к устройству
  public connectToDevices = async (
    onDataReceived?: (data: SensorData) => void // Сигнатура функции, позволяющая передать сюда другую функцию со своими фокусами
  ) => {
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

      onDataReceived && onDataReceived(extractDataFromRaw(value)); // скидываем в функцию данные (сделали эту функцию не обязательной)

      if (done) {
        break;
      }
    }
  };

  // Отключение от устройства
  public disconnectToDevices = async () => {
    this.reader.cancel();
    this.reader.releaseLock();
    this.port.close();
    console.debug("closed");
  };

  // Запись на устройство (пока только кал. акс.)
  public writeOnDevice = async (id: String) => {
    const writer = this.port.writable.getWriter();
    switch (id) {
      case "accelerometer_calibration":
        const data = new Uint8Array(CommandSettings.accelerometer_calibration);
        await writer.write(data);
        await sleep(3100);
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
    }

    // Allow the serial port to be closed later.
    writer.releaseLock();
  };
}
