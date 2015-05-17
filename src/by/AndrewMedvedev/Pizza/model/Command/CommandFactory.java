package by.AndrewMedvedev.Pizza.model.Command;

import by.AndrewMedvedev.Pizza.model.Command.handlers.AddComponent;
import by.AndrewMedvedev.Pizza.model.Command.handlers.BeginCommand;
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
            case "begin": command = new BeginCommand(); break;
            case "addComponent":{
                String id = request.getParameter("id");
                command = new AddComponent(Integer.parseInt(id)); break;
            }
        }
        return command;
    }
}
