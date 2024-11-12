import * as path from "@std/path";
import { getData } from "./get_data.ts";
import { getMatches, type machMakingData } from "./match_making.ts";
import { startWebServer } from "./web_server.ts";

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
    console.log(data);
    startWebServer();
}

main();
