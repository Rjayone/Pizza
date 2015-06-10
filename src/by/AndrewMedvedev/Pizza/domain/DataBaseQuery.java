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
            ResultSet result = connection.getStatement().executeQuery("SELECT component.*, price.price, category.title" +
                    " FROM component\n" +
                    " INNER JOIN price on component.id = price.id\n" +
                    " INNER JOIN category on categoryId = category.id" +
                    " ORDER BY categoryId");
            while (result.next()) { // Допилить запрос на поулчение всех копонентов
                Component comp = new Component();
                comp.setId(result.getInt(1));
                comp.setName(result.getString(2));
                comp.setPrice(result.getInt(7));
                comp.setImgPath(result.getString(3));
                comp.setLayer(result.getString(4));
                comp.setCategory(result.getString(6));
                comp.setCategoryTitle(result.getString(8));
                comps.add(comp);
            }
        } catch (SQLException e) {
            System.out.print(e.getMessage());
        }
    }

    public Component selectComponentById(int id) {
        //ToDo: Проверить правильность запроса
        DataBaseConnection connection = DataBaseConnection.getInstance();
        try {
            ResultSet result = connection.getStatement().executeQuery("SELECT component.*, price.price, category.title" +
                    " FROM component " +
                    " INNER JOIN price on component.id = price.id" +
                    " INNER JOIN category on categoryId = category.id" +
                    " WHERE component.id = " + id +
                    " ORDER BY categoryId");
            result.next();
            if(result != null){
                Component comp = new Component();
                comp.setId(result.getInt(1));
                comp.setName(result.getString(2));
                comp.setPrice(result.getInt(7));
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

    public void sendOrder(ArrayList<Component> comps, int size) {
        int totalPrice = 0;
        String components = "";
        for(int i = 0; i < comps.size(); i++) {
            totalPrice += comps.get(i).getPrice();
            components += comps.get(i).getName();
            if(i < comps.size() - 1)
                components += ", ";
        }

        DataBaseConnection connection = DataBaseConnection.getInstance();
        try {
            String query = String.format("INSERT INTO PizzaOrder (price, size, components) values(%d, %d, '%s')", totalPrice, size, components);
            connection.getStatement().execute(query);
        } catch (SQLException e) {
            System.err.print(e.getMessage());
        }
    }

    public void attachPhone(int count, String phone, int id) {
        DataBaseConnection connection = DataBaseConnection.getInstance();
        try {
            String query = String.format("UPDATE PizzaOrder SET count = %d, phone = '%s' where id = %d", count, phone, id) ;
            connection.getStatement().execute(query);
        } catch (SQLException e){
            System.err.print(e.getMessage());
        }
    }

    public int getLastIdToUpdate() {
        DataBaseConnection connection = DataBaseConnection.getInstance();
        try {
            String query = "SELECT id FROM pizzaorder ORDER BY id DESC LIMIT 1";
            ResultSet result = connection.getStatement().executeQuery(query);
            result.next();
            int id = result.getInt(1);
            return id;
        } catch (SQLException e){
            System.err.print(e.getMessage());
        }
        return -1;
    }
}
