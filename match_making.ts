import type { Empresa } from "./main.ts";

// todos los maches por una empresa X
type EmpresaMachs = {
    empresaName: string;
    machingEmpresas: string[];
};

type Match = {
    empresaA: string;
    empresaB: string;
};

// Calendario con todos los horarios, la key es la hora y por cada key hay una lista de Maches
export type Schedule = {
    [key: string]: Match[];
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
                    if (
                        empresa.ofrece[x] === allEmpresas[j].busca[y] &&
                        !machingEmpresas.includes(allEmpresas[j].empresa)
                    ) {
                        machingEmpresas.push(allEmpresas[j].empresa);
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

function convertMinsATime(m: number): string {
    // Calcula las horas y los minutos
    const horas = Math.floor(m / 60);
    const minutos = m % 60;

    // Convierte a formato militar (HH:MM) asegurando dos dígitos
    const formatoHoras = horas.toString().padStart(2, "0");
    const formatoMinutos = minutos.toString().padStart(2, "0");

    return `${formatoHoras}:${formatoMinutos}`;
}

function generateMatch(
    empresa: EmpresaMachs,
    timeMatches: Match[],
    allMatches: EmpresaMachs[],
): Match {
    // comprobar que no este ya
    for (let i = 0; i < timeMatches.length; i++) {
        if (
            timeMatches[i].empresaA === empresa.empresaName ||
            timeMatches[i].empresaB === empresa.empresaName
        ) {
            return {
                empresaA: "error",
                empresaB: "error",
            };
        }
    }

    for (let i = 0; i < empresa.machingEmpresas.length; i++) {
        // comprobar que no este ya en los time matches
        let addEntry: boolean = true;
        for (let j = 0; j < timeMatches.length; j++) {
            if (
                timeMatches[j].empresaA === empresa.machingEmpresas[i] ||
                timeMatches[j].empresaB === empresa.machingEmpresas[i]
            ) {
                addEntry = false;
                break;
            }
        }

        if (addEntry) {
            const empresaA = empresa.empresaName;
            const empresaB = empresa.machingEmpresas[i];

            const index = empresa.machingEmpresas.indexOf(
                empresa.machingEmpresas[i],
            );
            empresa.machingEmpresas.splice(index, 1);

            for (let j = 0; j < allMatches.length; j++) {
                if (allMatches[j].empresaName === empresaB) {
                    const index = allMatches[j].machingEmpresas.indexOf(
                        allMatches[j].machingEmpresas[j],
                    );
                    allMatches[j].machingEmpresas.splice(index, 1);
                }
            }

            return {
                empresaA: empresaA,
                empresaB: empresaB,
            };
        }
    }

    return {
        empresaA: "error",
        empresaB: "error",
    };
}

// Devolver el horario
export function generateMatchingSchedule(allEmpresas: Empresa[]): Schedule {
    const matchData: EmpresaMachs[] = generateEmpresasMatchs(allEmpresas);
    console.log(JSON.stringify(matchData));
    const schedule: Schedule = {};
    // Populate Schedule
    // desde las 15:15 hasta las 17:05 en mins 110
    for (let i = 0; i < 110; i += 8) {
        schedule[convertMinsATime(915 + i)] = [];
    }

    // iterar en cada franja de tiempo
    for (const time in schedule) {
        for (let i = 0; i < matchData.length; i++) {
            const mach = generateMatch(matchData[i], schedule[time], matchData);
            if (mach.empresaA !== "error" && mach.empresaB !== "error") {
                schedule[time].push(mach);
            }
        }
    }

    return schedule;
}
