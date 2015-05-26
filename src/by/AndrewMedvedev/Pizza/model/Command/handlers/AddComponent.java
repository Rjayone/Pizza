package by.AndrewMedvedev.Pizza.model.Command.handlers;

import by.AndrewMedvedev.Pizza.domain.Order;
import by.AndrewMedvedev.Pizza.model.Command.Command;
import by.AndrewMedvedev.Pizza.model.DataBase.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;

/**
 * Created by Andrew on 15.05.2015.
 *
 */
public class AddComponent implements Command {
    @Override
    public String execute(HttpServletRequest request, HttpServletResponse response) {
        Order order = Order.getInstance();
        int orderPrice = order.calculateOrder();
        request.setAttribute("orderPrice", orderPrice);
        return "jsp/done.jsp";
    }


    public AddComponent(int id) {
        Order order = Order.getInstance();
        if(order != null) {
            Component comp = order.getComponentFromTableById(id);
            if(comp != null) {
                order.addComponent(comp);
            }
        }
    }


    public AddComponent(ArrayList<Integer> ids, int pizzaSize) {
        Order order = Order.getInstance();
        if(order != null) {
            for(int i = 0; i < ids.size(); i++) {
                Component comp = order.getComponentFromTableById(ids.get(i));
                if(comp != null) {
                    order.addComponent(comp);
                }
            }
            order.sendOrderToDataBase(pizzaSize);
        }
    }
}
