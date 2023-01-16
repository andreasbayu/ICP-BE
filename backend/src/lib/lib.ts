import { Library } from 'ffi-napi';
import * as ref from 'ref-napi';

class Distance {
  distance: Array<Array<number>>;
}

class Result {
  cost: number;
  path: Array<number>;
}

function held_karp(dist: Distance): Result {
  const libraryDir = './modules/libhk';
  const myLib = Library(libraryDir, {
    held_karp: [ref.refType(ref.types.CString), [ref.types.CString]],
  });
  const readCS = myLib.held_karp(JSON.stringify(dist)).readCString();
  const parse = JSON.parse(readCS);
  const result = new Result();
  result.cost = parse?.cost;
  result.path = parse?.path;
  return result;
}

export { held_karp };
