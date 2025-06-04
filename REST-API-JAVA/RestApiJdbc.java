import com.sun.net.httpserver.*;
import java.io.*;
import java.net.*;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.util.*;

public class RestApiJdbc {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        server.createContext("/login", new LoginHandler());
        server.setExecutor(null);
        server.start();
        System.out.println("Server started on port 8000");
    }
    static class LoginHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (!exchange.getRequestMethod().equalsIgnoreCase("POST")) {
                String response = "Only POST method is supported";
                exchange.sendResponseHeaders(405, response.length());
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
                return;
            }
            InputStream is = exchange.getRequestBody();
            String body = new String(is.readAllBytes(), StandardCharsets.UTF_8);
            Map<String, String> params = parseFormData(body);
            String username = params.get("username");
            String password = params.get("password");
            // validate
            boolean isValid = checkCreds(username, password);
            String response;
            int statusCode;

            if (isValid) {
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
        private Map<String, String> parseFormData(String body) throws UnsupportedEncodingException {
            Map<String, String> params = new HashMap<>();
            for (String pair : body.split("&")) {
                String[] parts = pair.split("=", 2);
                if (parts.length == 2) {
                    params.put(URLDecoder.decode(parts[0], StandardCharsets.UTF_8), URLDecoder.decode(parts[1], StandardCharsets.UTF_8));
                }
            }
            return params;
        }
        private boolean checkCreds(String username, String password) {
            String dbUrl = "jdbc:mysql://localhost:3306/restdb";
            String dbUser = "root";
            String dbPass = "28704";
            try {
                Connection conn = DriverManager.getConnection(dbUrl, dbUser, dbPass);
                String query = "SELECT * FROM users WHERE username= ? AND password = ?";
                PreparedStatement stmt = conn.prepareStatement(query);
                stmt.setString(1, username);
                stmt.setString(2, password);

                ResultSet rs = stmt.executeQuery();
                boolean exits = rs.next();

                rs.close();
                stmt.close();
                conn.close();
                return exits;
            } catch (SQLException e){
                e.printStackTrace();
                return false;
            }
        }
    }
}
