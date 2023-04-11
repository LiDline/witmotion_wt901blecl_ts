import { extractDataFromRaw, SensorData } from "./extractDataFromRaw";

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

      onDataReceived && onDataReceived(extractDataFromRaw(value));  // скидываем в функцию данные (сделали эту функцию не обязательной)
      // console.debug(value)

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
}

