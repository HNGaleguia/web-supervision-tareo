import React, { useEffect, useState } from "react";
import { ResponseApi, TareoListDto } from "./datas";

const TareoUI = () => {
    const [tareoData, setTareoData] = useState<TareoListDto[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = {
                    fechaInicio: "2023-11-24",
                    fechaFin: "2023-11-28",
                    idClienteEmpresa: "51062251-2bac-4d3b-8ace-7be66f2c45b7",
                    idClienteSede: "5db40118-88ad-11ee-a934-1666092c43f6",
                    numeroDocumento: "",
                    idOperacion: "",
                    idCategoria: ""
                };
                const response = await fetch('https://k2-app-supervision-commands.azurewebsites.net/api/Tareo/Post_CentroControl_Pizarra_Tareo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(params),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const result = await response.json();
                const resultResponse = result as ResponseApi;
                if (resultResponse.isSuccess) {
                    const valueData = resultResponse.valueData as TareoListDto[];
                    setTareoData(valueData);
                    // console.log(valueData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Llamada inicial al montar el componente
        fetchData();

        // Configurar la llamada repetitiva cada 30 segundos
        const intervalId = setInterval(fetchData, 30000);

        // Limpiar el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalId);
    }, []); // La dependencia vacía asegura que la llamada se realice solo una vez al montar el componente.

    const statusMarks = (marcacion: string, horaBase: string): string => {
        const fechaMarcacion = new Date(marcacion);
        const horaLimite = new Date(horaBase);

        // Agregar 10 minutos a la horaBase
        const horaTardanza = new Date(horaLimite.getTime() + 10 * 60000);

        if (fechaMarcacion <= horaLimite) {
            return "OK";
        } else if (fechaMarcacion > horaLimite && fechaMarcacion <= horaTardanza) {
            return "LATE";
        } else {
            return "NO";
        }
    };


    return (
        <React.Fragment>
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Nombres</th>
                        <th>Cargo</th>
                        <th>Turno</th>
                        <th>Horarios</th>
                        <th>CECO</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tareoData && tareoData.map((value) => (
                        <tr key={value.id}>
                            <td>{value.fechaRegistro.replace("T", "  ")}</td>
                            {/* <td>{new Date(value.fechaRegistro).toISOString().split('T')[0]}</td> */}
                            {/* <td>{new Date(value.fechaRegistro).toISOString().split('T')[1]}</td> */}
                            <td>{value.nombres}</td>
                            <td>{value.cargo}</td>
                            <td>{value.turno}</td>
                            <td>{`${value.horaInicio} - ${value.horaFin}`}</td>
                            <td>{value.ceco}</td>
                            <td>{statusMarks(value.fechaRegistro, value.horaInicio)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment>

    );
}

export default TareoUI;
