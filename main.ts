import * as path from "@std/path";
import { getData } from "./get_data.ts";
import { generateMatchingSchedule } from "./match_making.ts";

export let data: Empresa[];

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
    data = await getData(filePath);
    generateMatchingSchedule(data);
}

main();
