package by.AndrewMedvedev.Pizza.domain;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Created by Andrew on 12.05.2015.
 */
public class DataBaseConnection {

    private static DataBaseConnection instance = null;

    private static final String LOGIN = "root";
    private static final String PASSWORD = "root";
    private static final String CONECTION = "jdbc:mysql://localhost:3306/pizza?useUnicode=true&characterEncoding=utf8";

    private Connection connection = null;
    private Statement  statement  = null;

    private DataBaseConnection() {
        openConnection();
    }


    public static DataBaseConnection getInstance() {
        if(instance == null) {
            instance = new DataBaseConnection();
        }
        return instance;
    }
    /**
     * Закрытый метод. Выполняет открытие соединения для возможности взаимодействия с таблицей.
     * @throws SQLException
     */
    private void openConnection() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            connection = DriverManager.getConnection(CONECTION, LOGIN, PASSWORD);
            statement = connection.createStatement();
        } catch (SQLException | ClassNotFoundException exp) {
            exp.getStackTrace();
            System.err.print(exp.getMessage());
        }
    }

    public void closeConnection() {
        try {
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    public Statement getStatement() {
        return statement;
    }
}
