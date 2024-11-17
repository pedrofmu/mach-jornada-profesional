import * as path from "@std/path";
import { getData } from "./get_data.ts";
import { generateMatchingSchedule, type Schedule } from "./match_making.ts";
import { createCSVdata } from "./generate_csv.ts";

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
    const schedule: Schedule = generateMatchingSchedule(data);
//    console.log("----------------------SCHEDULE-----------------");
//    console.log(schedule);
    const csvData: string = createCSVdata(schedule);
    Deno.writeTextFile("calendario.csv", csvData);
}

main();
