interface diInterface {
  accelerometer_calibration: String;
  magnetometer_calibration: String;
  exit_calibration_mode: String;
  DOF_6: String;
  DOF_9: String;
  save_configuration: String;
}

interface diRateInterface {
  0.2: String;
  0.5: String;
  1: String;
  2: String;
  5: String;
  10: String;
  20: String;
  50: String;
}

function hexToDecimal(di: diInterface | diRateInterface) {
  const decimal: { [key: string]: number[] } = {};
  for (const key in di) {
    const hexValues = key.split("\\x").filter(Boolean);
    const decimalArray = hexValues.map((hexValue) => parseInt(hexValue, 16));
    decimal[key] = decimalArray;
  }
  return decimal;
}
//======================================================================================================

const di: diInterface = {
  // Из DataSheet: https://github.com/WITMOTION/WT901BLECL/blob/master/WT901BLECL%20DataSheet.pdf
  accelerometer_calibration: "\xFF\xAA\x01\x01\x00",
  magnetometer_calibration: "\xFF\xAA\x01\x07\x00",
  exit_calibration_mode: "\xFF\xAA\x01\x00\x00",
  DOF_6: "\xFF\xAA\x24\x01\x00",
  DOF_9: "\xFF\xAA\x24\x00\x00",
  save_configuration: "\xFF\xAA\x00\x00\x00",
};

export const diDecimal = hexToDecimal(di);

const diRate = {
  0.2: "\xFF\xAA\x03\x01\x00",
  0.5: "\xFF\xAA\x03\x02\x00",
  1: "\xFF\xAA\x03\x03\x00",
  2: "\xFF\xAA\x03\x04\x00",
  5: "\xFF\xAA\x03\x05\x00",
  10: "\xFF\xAA\x03\x06\x00",
  20: "\xFF\xAA\x03\x07\x00",
  50: "\xFF\xAA\x03\x08\x00",
};

export const diRateDecimal = hexToDecimal(diRate);
