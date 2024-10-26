import * as path from "@std/path";
import { getData } from "./get_data.ts";

export type empresa = {
    nombre: string;
    numeroTelefono: string;
    direccionCorreo: string;
    empresa: string;
    mesasRedondas: string[];
    busca: string[];
    ofrece: string[];
    seApuntaAlBrunch: string;
    infoAdicional: string;
};

const filePath: string = path.resolve(
    "./sensitive-data/excel.csv",
);

async function main() {
    const data: empresa[] = await getData(filePath);
    console.log(data);
}

main();
