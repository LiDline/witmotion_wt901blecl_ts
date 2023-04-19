import { sleep } from "@amcharts/amcharts5/.internal/core/util/Time";
import { CommandSettings } from "./CommandsForDevice";

export const switchWrite = async (
  command: String | Number,
  writeValue?: (value: ArrayBufferView) => Promise<void>
) => {
  switch (command) {
    case "accelerometer_calibration":
      writeValue &&
        (await writeValue(
          new Uint8Array(CommandSettings.accelerometer_calibration)
        ));
      await sleep(3100);
      writeValue &&
        (await writeValue(
          new Uint8Array(CommandSettings.exit_calibration_mode)
        ));
      break;
    case "magnetometer_calibration":
      writeValue &&
        (await writeValue(
          new Uint8Array(CommandSettings.magnetometer_calibration)
        ));
      break;
    case "exit_calibration_mode":
      writeValue &&
        (await writeValue(
          new Uint8Array(CommandSettings.exit_calibration_mode)
        ));
      break;
    case "6 DOF":
      writeValue && (await writeValue(new Uint8Array(CommandSettings.DOF_6)));
      writeValue &&
        (await writeValue(new Uint8Array(CommandSettings.save_configuration)));
      break;
    case "9 DOF":
      writeValue && (await writeValue(new Uint8Array(CommandSettings.DOF_9)));
      writeValue &&
        (await writeValue(new Uint8Array(CommandSettings.save_configuration)));
      break;
    case 0.2:
      writeValue && (await writeValue(new Uint8Array(CommandSettings["0.2"])));
      writeValue &&
        (await writeValue(new Uint8Array(CommandSettings.save_configuration)));
      break;
    case 0.5:
      writeValue && (await writeValue(new Uint8Array(CommandSettings["0.5"])));
      writeValue &&
        (await writeValue(new Uint8Array(CommandSettings.save_configuration)));
      break;
    case 1:
      writeValue && (await writeValue(new Uint8Array(CommandSettings[1])));
      writeValue &&
        (await writeValue(new Uint8Array(CommandSettings.save_configuration)));
      break;
    case 2:
      writeValue && (await writeValue(new Uint8Array(CommandSettings[2])));
      writeValue &&
        (await writeValue(new Uint8Array(CommandSettings.save_configuration)));
      break;
    case 5:
      writeValue && (await writeValue(new Uint8Array(CommandSettings[5])));
      writeValue &&
        (await writeValue(new Uint8Array(CommandSettings.save_configuration)));
      break;
    case 10:
      writeValue && (await writeValue(new Uint8Array(CommandSettings[10])));
      writeValue &&
        (await writeValue(new Uint8Array(CommandSettings.save_configuration)));
      break;
    case 20:
      writeValue && (await writeValue(new Uint8Array(CommandSettings[20])));
      writeValue &&
        (await writeValue(new Uint8Array(CommandSettings.save_configuration)));
      break;
    case 50:
      writeValue && (await writeValue(new Uint8Array(CommandSettings[50])));
      writeValue &&
        (await writeValue(new Uint8Array(CommandSettings.save_configuration)));
      break;
  }
};
