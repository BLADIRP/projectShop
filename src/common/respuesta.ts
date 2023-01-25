import { ReturnDTO } from './return.DTO';

export class Response {
  static ok(data: any, message?: string): ReturnDTO<any> {
    return new ReturnDTO(
      message ? message : 'Datos recuperados correctamente',
      'ok',
      data,
      new Date(),
    );
  }

  static isError(error?: string): ReturnDTO<any> {
    return new ReturnDTO(
      error ? error : 'Datos no recuperados',
      'bad request',
      null,
      new Date(),
    );
  }
}
