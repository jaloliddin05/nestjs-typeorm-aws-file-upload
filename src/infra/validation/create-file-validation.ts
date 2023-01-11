import { ParseFilePipeBuilder } from '@nestjs/common';

const FileUploadValidationForCreate = new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: /(jpg|jpeg|png|gif)$/,
  })
  .addMaxSizeValidator({
    maxSize: 5 * 1024 * 1024,
  })
  .build({
    fileIsRequired: true,
  });

export default FileUploadValidationForCreate;
