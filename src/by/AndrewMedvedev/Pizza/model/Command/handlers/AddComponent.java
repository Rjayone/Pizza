package by.AndrewMedvedev.Pizza.model.Command.handlers;

import by.AndrewMedvedev.Pizza.domain.Order;
import by.AndrewMedvedev.Pizza.model.Command.Command;
import by.AndrewMedvedev.Pizza.model.DataBase.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by Andrew on 15.05.2015.
 */
public class AddComponent implements Command {
    @Override
    public String execute(HttpServletRequest request, HttpServletResponse response) {
        return null;
    }

    public AddComponent(int id) {
        //get component from db by id
        Order order = Order.getInstance();
        if(order != null) {
            Component comp = order.getComponentFromTableById(id);
            if(comp != null) {
                order.addComponent(comp);
            }
        }
    }
}
