    import { Server } from "https://deno.land/std/http/server.ts";
   
    const handler = async (request: Request) => {
      const body = `Your user-agent is:\n\n${request.headers.get(
       "user-agent",
      ) ?? "Unknown"}`;
      
      let t = "";
      
      if(request.body) {
      	t  = await request.text();
      }
      
      console.log(t);
   
      return new Response(body, { status: 200, headers: {"Content-Type": "text/html"} });
    };
   
    const server = new Server({ handler });
    const listener = Deno.listenTls({
      port: 8000,
      hostname: "0.0.0.0",
      certFile: "./cert.pem",
      keyFile: "./key.pem",
      transport: "tcp",
      // ALPN protocol support not yet stable.
       alpnProtocols: ["h2", "http/1.1"],
    });

   
    console.log("server listening on http://localhost:4505");
   
    await server.serve(listener);
