import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async url => {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    // console.log(res)
    const data = await res.json(); // metho to conver json to javaScript .json is a promise function that needs to be await

    if (!res.ok) {
      throw new Error(`(${res.status}) ${data.status} ${data.message}`);
    }
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
