package by.AndrewMedvedev.Pizza.model.Command;

import by.AndrewMedvedev.Pizza.Utils.Utils;
import by.AndrewMedvedev.Pizza.domain.Order;
import by.AndrewMedvedev.Pizza.model.Command.handlers.AddComponent;
import by.AndrewMedvedev.Pizza.model.Command.handlers.BeginCommand;
import by.AndrewMedvedev.Pizza.model.Command.handlers.SuccessOrder;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Andrew on 09.05.2015.
 * CommandFactory - pattern that returns specific handler for command
 */
public class CommandFactory {
    static public Command receiveHandler(HttpServletRequest request) {
        String action = request.getParameter("command");
        Command command = null;
        if(action == null)
            return null;
        switch (action) {
            case "begin": {
                command = new BeginCommand();
                break;
            }
            case "forward":{
                Order.getInstance().clear();
                String components = request.getParameter("componentsId");
                String size = request.getParameter("size");
                int pizzaSize = Integer.parseInt(size);
                command = new AddComponent(Utils.parse(components), pizzaSize);
                break;
            }
            case "confirm": {
                command = new SuccessOrder();
                break;
            }
        }
        return command;
    }
}
