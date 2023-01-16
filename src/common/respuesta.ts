import { ReturnDTO } from './return.DTO';

export class Respuesta {
  ok(data: any): ReturnDTO<any> {
    return new ReturnDTO(
      'Datos recuperados correctamente',
      'ok',
      data,
      new Date(),
    );
  }

  noOk(): ReturnDTO<any> {
    return new ReturnDTO(
      'Datos no recuperados',
      'bad request',
      null,
      new Date(),
    );
  }
}
