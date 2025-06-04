import com.sun.net.httpserver.*;
import java.io.*;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class RestApi {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        // login endpoint
        server.createContext("/login", new LoginHandler());
        server.setExecutor(null);
        server.start();
        System.out.println("Server running at http://localhost:8000/login");
    }
    static class LoginHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
//            System.out.println(exchange.getRequestMethod());
            if(exchange.getRequestMethod().equals("GET")){
                String response = "Only POST method is supported";
                exchange.getResponseHeaders().add("Content-Type", "text/plain");
                exchange.sendResponseHeaders(405, response.length());
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
                return;
            }
            InputStream is = exchange.getRequestBody();
            byte[] reqBody = is.readAllBytes();
            String body = new String(reqBody, StandardCharsets.UTF_8);
            Map<String, String> params = parseFormData(body);
            String username = params.get("username");
            String password = params.get("password");
            String response;
            int statusCode;
            if("admin".equals(username)&& "admin".equals(password)){
                response = "Login successful";
                statusCode = 200;
            } else {
                response = "Invalid credentials";
                statusCode = 401;
            }
            exchange.getResponseHeaders().add("Content-Type", "text/plain");
            exchange.sendResponseHeaders(statusCode, response.length());
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }
    private static Map<String, String> parseFormData(String body) throws IOException {
        Map<String, String> map = new HashMap<>();
        String[] pairs = body.split("&");
        for(String pair: pairs){
            String[] parts = pair.split("=", 2);
            if(parts.length==2){
                String k = URLDecoder.decode(parts[0], StandardCharsets.UTF_8);
                String v = URLDecoder.decode(parts[1], StandardCharsets.UTF_8);
                map.put(k, v);
            }
        }
        return map;
    }
}
/*
COMPILE AND RUN COMMANDS
javac -cp ".;mysql-connector-j-9.1.0.jar" .\RestApiJdbc.java
java --add-modules jdk.httpserver -cp ".;mysql-connector-j-9.1.0.jar" .\RestApiJdbc.java
 */