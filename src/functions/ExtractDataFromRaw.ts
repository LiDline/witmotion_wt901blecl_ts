import { Buffer } from "buffer";


export interface SensorData {
  axc: Coordinates;
  vel: Coordinates;
  ang: Coordinates;
}

interface Coordinates {
  x: number;
  y: number;
  z: number;
}

export function extractDataFromRaw(raw: Uint8Array): SensorData {
  const length = raw.length;

  let decoded: number[] = [];

  for (let i = 2; i < length; i = i + 2) {
    let buffer = Buffer.from(raw.slice(i, i + 2));
    decoded = decoded.concat(buffer.readInt16LE(0));
  }

  let ax = (decoded[0] / 32768.0) * 16;
  let ay = (decoded[1] / 32768.0) * 16;
  let az = (decoded[2] / 32768.0) * 16;

  let wx = (decoded[3] / 32768.0) * 2000;
  let wy = (decoded[4] / 32768.0) * 2000;
  let wz = (decoded[5] / 32768.0) * 2000;

  let Ax = (decoded[6] / 32768.0) * 180;
  let Ay = (decoded[7] / 32768.0) * 180;
  let Az = (decoded[8] / 32768.0) * 180;

  return {
    axc: { x: ax, y: ay, z: az },
    vel: { x: wx, y: wy, z: wz },
    ang: { x: Ax, y: Ay, z: Az },
  };
}
