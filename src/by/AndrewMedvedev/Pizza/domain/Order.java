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
    static public int currentOrderId = 0;
    public int pizzaSize = 1;

    public void addComponent(Component comp) {
        order.add(comp);
    }


    /**
     * Метод на основе ид полчает из базы данных компонент.
     * @param id - ид компонента, который нужно получить из бд.
     * @return компонент полученный из бд.
     */
    public Component getComponentFromTableById(int id) {
        DataBaseQuery dbQuery = DataBaseQuery.getInstance();
        if(dbQuery != null) {
            return dbQuery.selectComponentById(id);
        }
        return null;
    }


    /**
     * Метод рассчитывает суммаруню стоимость заказа
     * @return суммарная стоимость заказа
     */
    public int calculateOrder() {
        int totalPrice = 0;
        for(int i = 0; i < order.size(); i++)
            totalPrice += order.get(i).getPrice();
        double scalar = 1;
        if(pizzaSize == 2) scalar = 1.3;
        if(pizzaSize == 3) scalar = 1.5;
        return (int)(totalPrice * scalar);
    }

    public void sendOrderToDataBase(int size) {
        DataBaseQuery query = DataBaseQuery.getInstance();
        if(query != null){
            query.sendOrder(order, size);
            currentOrderId++;
        }
    }

    public void updateOrderData(String phone, int count) {
        DataBaseQuery query = DataBaseQuery.getInstance();
        if(query != null) {
            query.attachPhone(count, phone, currentOrderId);
        }
    }

    public void clear() {
        order.clear();
    }
}
