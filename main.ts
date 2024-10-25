import Excel from "exceljs";
import * as path from "@std/path";

type empresa = {
    nombre: string;
    numeroTelefono: string;
    direccionCorreo: string;
    empresa: string;
    mesasRedondas: string;
    busca: string;
    ofrece: string;
    seApuntaAlBrunch: string;
    infoAdicional: string;
};

const filePath: string = path.resolve(
    "./sensitive-data/excel.xlsx",
);

function getCellValue(row: Excel.Row, cellIndex: number) {
    const cell = row.getCell(cellIndex);

    return cell.value ? cell.value.toString() : "";
}

async function main() {
    const workbook = new Excel.Workbook();

    console.warn(filePath);
    const content = await workbook.xlsx.readFile(filePath);

    const worksheet = content.worksheets[0];
    const rowStartIndex = 1;
    const numberOfRows = worksheet.rowCount - 1;

    const rows = worksheet.getRows(rowStartIndex, numberOfRows) ?? [];

    const empresas: empresa[] = rows.map((row): empresa => {
        return {
            nombre: getCellValue(row, 6),
            numeroTelefono: "",
            direccionCorreo: "",
            empresa: "",
            mesasRedondas: "",
            busca: "",
            ofrece: "",
            seApuntaAlBrunch: "",
            infoAdicional: "",
        };
    });

    console.log(empresas);
}

/**
 * Run CLI.
 */

main();
