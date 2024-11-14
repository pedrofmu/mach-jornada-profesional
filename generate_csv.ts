import type { Schedule } from "./match_making.ts";
import { stringify } from "@std/csv";

export function createCSVdata(schedule: Schedule): string{
    const rows: string[][] = [];

    for (const time in schedule){
        const row: string[] = [];
        row.push(time);
        for (let i = 0; i < schedule[time].length; i++){
            row.push(`${schedule[time][i].empresaA} , ${schedule[time][i].empresaB}`);
        } 
        rows.push(row);
    }
     
    return stringify(rows);
}
