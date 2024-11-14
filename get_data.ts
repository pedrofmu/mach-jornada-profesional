import { parse } from "@std/csv";
import type { Empresa } from "./main.ts";

function deleteDuplicateEmpresas(empresas: Empresa[]): Empresa[] {
    const empresasFiltered = empresas.reduce((acc: Empresa[], current: Empresa) => {
        // Verifica si ya existe una empresa con el mismo tipo en el acumulador
        const yaExiste = acc.some(e => e.empresa === current.empresa);
        
        // Si no existe, agrega la empresa actual al acumulador
        if (!yaExiste) {
            acc.push(current);
        }
        
        return acc;
    }, []);
    
    return empresasFiltered;
}

export async function getData(filePath: string): Promise<Empresa[]> {
    let textContent: string = await Deno.readTextFile(filePath);

    const stringsToReplace: string[] = [
        "Nombre",
        "Número de teléfono",
        "Dirección de correo electrónico",
        "Empresa",
        "MESAS REDONDAS. ¿A cual vas a asistir? ",
        "¿Que buscas en el B2b?",
        "¿Qué ofreces en el B2b?",
        "¿Te apuntas al Brunch Networking?",
        "Proporcione información adicional que nos pueda ser útil para organizar el B2B y el Brunch. *Número de asistente al Brunch* Horario límite del B2B*....",
    ];

    const newStrings: string[] = [
        "nombre",
        "telefono",
        "correo",
        "empresa",
        "mesas_redondas",
        "buscas",
        "ofreces",
        "brunch_networking",
        "informacion_adicional",
    ];

    for (let i = 0; i < stringsToReplace.length; i++) {
        const pattern = stringsToReplace[i]
            .replace(/\?/g, "\\?")
            .replace(/\./g, "\\.")
            .replace(/\*/g, "\\*")
            .replace(/\s/g, "\\s")
            .replace(/\u00A0/g, "\\s");

        const regex = new RegExp(pattern, "g");
        textContent = textContent.replace(regex, newStrings[i]);
    }

    const dataParsed = parse(textContent, {
        skipFirstRow: true,
        strip: true,
    });

    let empresas: Empresa[] = dataParsed.map((row): Empresa => {
        return {
            nombre: row.nombre,
            numeroTelefono: row.telefono,
            direccionCorreo: row.correo,
            empresa: row.empresa,
            mesasRedondas: row.mesas_redondas.split(";").filter((item) =>
                item.trim() !== ""
            ),
            busca: row.buscas.split(";").filter((item) => item.trim() !== ""),
            ofrece: row.ofreces.split(";").filter((item) => item.trim() !== ""),
            seApuntaAlBrunch: row.brunch_networking,
            infoAdicional: row.informacion_adicional,
        };
    });

    // limpiar empresas repetidas
    empresas = deleteDuplicateEmpresas(empresas);

    return empresas;
}
