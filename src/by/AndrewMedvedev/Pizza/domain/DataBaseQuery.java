package by.AndrewMedvedev.Pizza.domain;

import by.AndrewMedvedev.Pizza.model.DataBase.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 * Created by Andrew on 12.05.2015.
 * Класс предоставляет методы работы с базой данной
 */
public class DataBaseQuery {

    static DataBaseQuery instance = null;
    public static DataBaseQuery getInstance() {
        if(instance == null) {
            instance = new DataBaseQuery();
        }
        return  instance;
    }

    private DataBaseQuery() {
        try {
            createTable();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    //DataBase Query Defenition
    String CREATE_COMPONENT_TABLE = "CREATE TABLE IF NOT EXISTS component(\n" +
            "\tid int auto_increment primary key,\n" +
            "    name varchar(80) not null,\n" +
            "    price int not null\n" +
            ");";


    /**
     * Метод создания новой таблицы в базе данных.
     * @throws java.sql.SQLException
     */
    private void createTable() throws SQLException {
        try {
            DataBaseConnection connection = DataBaseConnection.getInstance();

            //Объявляем создание новых таблиц
            connection.getStatement().executeUpdate(CREATE_COMPONENT_TABLE);
        } catch (Exception e) {
            System.err.println("[DB Creater]: " + e.getMessage());
            e.getStackTrace();
        } finally {
//            if (connection != null)
//                connection.closeConnection();
        }
    }

    //Ниже описываем остальные функции
    public void selectAllComponents(ArrayList<Component> comps) {
        DataBaseConnection connection = DataBaseConnection.getInstance();

        try {
            ResultSet result = connection.getStatement().executeQuery("SELECT * FROM component;");
            while (result.next()) { // Допилить запрос на поулчение всех копонентов
                Component comp = new Component();
                comp.setId(result.getInt(1));
                comp.setName(result.getString(2));
                comp.setPrice(result.getInt(3));
                comp.setImgPath(result.getString(4));
                comp.setLayer(result.getString(5));
                comp.setCategory(result.getString(6));
                comps.add(comp);
            }
        } catch (SQLException e) {
            System.out.print(e.getMessage());
        }
    }

    public Component selectComponentById(int id) {
        DataBaseConnection connection = DataBaseConnection.getInstance();
        try {
            ResultSet result = connection.getStatement().executeQuery("SELECT * FROM component WHERE ID = " + id);
            if(result != null){
                Component comp = new Component();
                comp.setId(result.getInt(1));
                comp.setName(result.getString(2));
                comp.setPrice(result.getInt(3));
                comp.setImgPath(result.getString(4));
                comp.setLayer(result.getString(5));
                comp.setCategory(result.getString(6));
                return comp;
            }
        } catch (SQLException e) {
            System.out.print(e.getMessage());
        }
        return null;
    }
}