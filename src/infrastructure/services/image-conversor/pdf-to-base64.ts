import { Injectable } from "@nestjs/common";
import { fromBuffer } from "pdf2pic";

@Injectable()
export class PDFToBase64Service {

  async convert(buffer: Buffer, saveFilename?: string, savePath?: string, format?: string, width?: number, height?: number) {
    const options = {
      density: 100,
      saveFilename,
      savePath: savePath || "./images",
      format: format || "jpeg",
      width: width || 600,
      height: height || 600
    };

    const converted = await fromBuffer(buffer, options)
      .bulk(-1, { responseType: "base64" } )
    return converted.map( ({ base64 }) => `data:image/jpeg;base64,${base64}` )
  }
}