import { Injectable } from "@nestjs/common";

@Injectable()
export class ImageToBase64Service {

  async convert(file) {
    const base64Data = file.toString('base64');
    console.log(base64Data)
    const dataURI = `data:image/jpeg;base64,${base64Data}`;
    return dataURI
  }
}