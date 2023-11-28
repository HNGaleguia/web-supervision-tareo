export interface TareoListDto {
    id: string,
    fechaRegistro: string,
    numeroDocumento: string,
    nombres: string,
    cargo: string,
    turno: string,
    horaInicio: string,
    horaFin: string,
    ceco: string
}
export interface ResponseApi {
    isSuccess: boolean,
    message: string,
    valueData: object
}