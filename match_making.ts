import type { Empresa } from "./main.ts";

// todos los maches por una empresa X
type EmpresaMachs = {
    empresaName: string;
    machingEmpresas: string[];
};

type Mach = {
    empresaA: string;
    empresaB: string;
};

// Calendario con todos los horarios, la key es la hora y por cada key hay una lista de Maches
type Schedule = {
    [key: string]: Mach[];
};

function generateEmpresasMatchs(allEmpresas: Empresa[]): EmpresaMachs[] {
    const returnData: EmpresaMachs[] = [];
    // Buscar si hacen mach segun lo que la empresa busca
    for (let i = 0; i < allEmpresas.length; i++) {
        const empresa = allEmpresas[i];
        const machingEmpresas: string[] = [];
        for (let j = 0; j < allEmpresas.length; j++) {
            if (allEmpresas[j].empresa === empresa.empresa) {
                continue;
            }

            for (let x = 0; x < empresa.ofrece.length; x++) {
                for (let y = 0; y < allEmpresas[j].busca.length; y++) {
                    if (empresa.ofrece[x] === allEmpresas[j].busca[y]) {
                        machingEmpresas.push(allEmpresas[j].empresa);
                        if (machingEmpresas.indexOf(allEmpresas[j].empresa) === -1){
                            machingEmpresas.push(allEmpresas[j].empresa);
                        }
                    }
                }
            }
        }
        returnData.push({
            empresaName: empresa.empresa,
            machingEmpresas: machingEmpresas,
        });
    }

    return returnData;
}

// Devolver el horario
export function generateMatchingSchedule(allEmpresas: Empresa[]): Schedule {
    const matchData = generateEmpresasMatchs(allEmpresas);
    console.log(matchData);
    return {};
}
