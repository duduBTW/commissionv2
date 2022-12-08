/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-restricted-globals
export {};
import { encode } from "blurhash";

addEventListener("message", (event) => {
  const { payload, info } = event.data;
  console.log("payload", payload.width);
  const hash = encode(payload.data, payload.width, payload.height, 4, 4);
  console.log("hash", hash);
  postMessage({
    hash,
    width: payload.width,
    height: payload.height,
    imageUrl: payload.imageUrl,
    ...info,
  });
});
