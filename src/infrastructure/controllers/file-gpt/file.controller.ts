import { Controller, Post, Body, UseInterceptors, UploadedFile, UploadedFiles, Get, Param, Delete } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '@services/gpt/assistant/file.service';

@Controller("file")
export class FileController {
  constructor(
    private readonly fileService: FileService,
  ) {}


  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file) {
    return this.fileService.create({
      file: file,
      purpose: "assistants"
    });
  }

  @Get("/:id")
  retrieveFile(@Param("id") id: string ) {
    return this.fileService.retrieve(id);
  }

  @Get("/:id/content")
  retrieveFileContent(@Param("id") id: string ) {
    return this.fileService.retrieveContent(id);
  }

  @Get()
  listFiles() {
    return this.fileService.list();
  }

  @Delete("/:id")
  delete(@Param("id") id: string) {
    return this.fileService.delete(id);
  }
}
