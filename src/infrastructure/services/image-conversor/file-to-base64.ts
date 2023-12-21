import { Injectable } from "@nestjs/common";

@Injectable()
export class FileToBase64Service {

  convertToBase64DataUri(buffer: Buffer, mimeType = "image/jpeg") {
    const base64Data = this.convertToBase64(buffer);
    
    return `data:${mimeType};base64,${base64Data}`;
  }
  
  convertToBase64(buffer: Buffer) {
    return buffer.toString('base64');
  }
}