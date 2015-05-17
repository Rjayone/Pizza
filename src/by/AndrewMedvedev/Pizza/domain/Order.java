package by.AndrewMedvedev.Pizza.domain;

import by.AndrewMedvedev.Pizza.model.DataBase.Component;

import java.util.ArrayList;

/**
 * Created by Andrew on 15.05.2015.
 * Класс представляет механизм обработки заказа пользователя
 */
public class Order {
    /**
     * Реализаия синглтона
     */
    private Order(){
        order = new ArrayList<>();
    }
    private static Order instance = null;
    public static Order getInstance() {
        if(instance == null)
            instance = new Order();
        return instance;
    }

    private ArrayList<Component> order = null;


    public void addComponent(Component comp) {
        order.add(comp);
    }


    public Component getComponentFromTableById(int id) {
        DataBaseQuery dbQuery = DataBaseQuery.getInstance();
        if(dbQuery != null) {
            return dbQuery.selectComponentById(id);
        }
        return null;
    }
}
