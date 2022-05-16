    import { Server } from "https://deno.land/std/http/server.ts";
   
    const handler = (request: Request) => {
      const body = `Your user-agent is:\n\n${request.headers.get(
       "user-agent",
      ) ?? "Unknown"}`;
   
      return new Response(body, { status: 200 });
    };
   
    const server = new Server({ handler });
    const listener = Deno.listenTls({
      port: 443,
      hostname: "0.0.0.0",
      certFile: "./cert.pem",
      keyFile: "./key.pem",
      transport: "tcp",
      // ALPN protocol support not yet stable.
       alpnProtocols: ["h2", "http/1.1"],
    });

   
    console.log("server listening on http://localhost:4505");
   
    await server.serve(listener);
