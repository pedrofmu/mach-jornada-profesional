import type { Empresa } from "./main.ts";

// Devolver las empresas que buscan lo que ofreces y cuales son dichos productos
// Devolver las empresas que ofrecen lo que buscas y cuales son dichos productos
//
// buscanLoQueOfreces {
//      empresa1 {
//          producto1, 
//      },
// },
// ofrecenLoQueBuscas {
//      empresa1 {
//          producto1,
//      },
// },
//

export type machMakingData = {
    buscanLoQueOfreces: { [key: string]: string[] };
    ofrecenLoQueBuscas: { [key: string]: string[] };
};


export function getMatches(empresa: Empresa, allEmpresas: Empresa[]): machMakingData {
    const returnData: machMakingData = {
        buscanLoQueOfreces: {},
        ofrecenLoQueBuscas: {}
    };

    for (let i = 0; i < allEmpresas.length; i++) {
        if (allEmpresas[i] === empresa) continue;

        // Buscar si hacen mach segun lo que la empresa busca
        for (let j = 0; j < allEmpresas[i].ofrece.length; j++) {
            for (let x = 0; x < empresa.busca.length; x++) {
                if (allEmpresas[i].ofrece[j] === empresa.busca[x]) {
                    // Verificar que el objeto existe antes de usar push
                    if (!(allEmpresas[i].nombre in returnData.buscanLoQueOfreces)) {
                        returnData.buscanLoQueOfreces[allEmpresas[i].nombre] = [];
                    }
                    returnData.buscanLoQueOfreces[allEmpresas[i].nombre].push(allEmpresas[i].ofrece[j]);
                }
            }
        }

        // Buscar si hacen mach segun lo que la empresa ofrece
        for (let j = 0; j < allEmpresas[i].busca.length; j++) {
            for (let x = 0; x < empresa.ofrece.length; x++) {
                if (allEmpresas[i].busca[j] === empresa.ofrece[x]) { // corregido, cambié ofreces[j] por busca[j]
                    // Verificar que el objeto existe antes de usar push
                    if (!(allEmpresas[i].nombre in returnData.ofrecenLoQueBuscas)) {
                        returnData.ofrecenLoQueBuscas[allEmpresas[i].nombre] = [];
                    }
                    returnData.ofrecenLoQueBuscas[allEmpresas[i].nombre].push(allEmpresas[i].busca[j]);
                }
            }
        }
    }

    return returnData;
}

