import { route } from "@std/http";
import { open } from 'https://deno.land/x/open/index.ts';
import { getMatches } from "./match_making.ts";
import { getEmpresaByName } from "./get_data.ts";
import { data, type Empresa } from "./main.ts";

function defaultHandler(_req: Request) {
    return new Response("Not found", { status: 404 });
}

// HTML directo en una variable
const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MATCH JORNADA PROFESIONAL - INTERACTIVE SITE</title>
</head>
<body>
    <input type="text" id="empresa" placeholder="empresa">
    <button id="search">Buscar</button>
    <div id="response"></div>

    <script>
        document.getElementById('search').addEventListener('click', async () => {
            const empresa = document.getElementById('empresa').value;
            const url = "http://127.0.0.1:4242/query?empresa=" + encodeURIComponent(empresa); 

            console.log(url);

            try {
                const response = await fetch(url);
                const data = await response.text();
                document.getElementById('response').textContent = data; 
            } catch (error) {
                console.error('Error al obtener los datos:', error);
                document.getElementById('response').textContent = 'Hubo un error al obtener los datos.';
            }
        });
    </script>
</body>
</html>`;

const routes = [
  {
    pattern: new URLPattern({ pathname: "/" }),
    handler: () => {
      return new Response(htmlContent, {
        headers: { "Content-Type": "text/html" },
      });
    },
  },
  {
    pattern: new URLPattern({ pathname: "/query" }),
    handler: (req: Request) => {
      const url = new URL(req.url);
      const params = Object.fromEntries(url.searchParams.entries()); 

      const empresa = getEmpresaByName(params.empresa, data);

      const returnData = getMatches(empresa as Empresa, data); 

      return new Response(JSON.stringify(returnData), {
        headers: { "Content-Type": "application/json" },
      });
    },
  },
];

export function startWebServer(): void {
    const handler = route(routes, defaultHandler);
    Deno.serve({ port: 4242, hostname: "127.0.0.1" }, handler);
    open("http://127.0.0.1:4242/");
}

