import { SensorData, extractDataFromRaw } from "./ExtractDataFromRaw";
import { switchWrite } from "./switchWrite";

export class UsingUsb implements DeviceInterface {
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

  // Запись на устройство
  public write = async (command: String | Number) => {
    const writer = this.port.writable.getWriter();
    await switchWrite(command, writer.write.bind(writer));

    // Allow the serial port to be closed later.
    writer.releaseLock();
  };
}

export interface DeviceInterface {
  connect(onDataReceived?: (data: SensorData) => void): Promise<void>;
  disconnect(): Promise<void>;
  write(command: String | Number): Promise<void>;
}
