const server = Deno.listenTls({
      port: 8000,
      hostname: "0.0.0.0",
      certFile: "./cert.pem",
      keyFile: "./key.pem",
      transport: "tcp",
      // ALPN protocol support not yet stable.
       alpnProtocols: ["h2", "http/1.1"],
    });

for await (const conn of server) {
  (async () => {
    const httpConn = Deno.serveHttp(conn);
    try{
    for await (const requestEvent of httpConn) {
    let t = "";
      
      if(requestEvent.request.body) {
      	t  = await requestEvent.request.text();
      }
      
      console.log(t);
     await requestEvent.respondWith(
     	
     	
     
      new Response("hello world", {
        status: 200,
      }),
    );
    }
    } catch(_e){
    	console.log(_e);
    }
  })();
}

