import * as path from "@std/path";
import { getData } from "./get_data.ts";
import { getMatches, type machMakingData } from "./match_making.ts";

export type Empresa = {
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
    const data: Empresa[] = await getData(filePath);
    const machData: machMakingData = getMatches(data[1], data);
    console.log(data);
    console.log(machData);
}

main();
