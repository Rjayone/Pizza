package by.AndrewMedvedev.Pizza.Command.handlers;

import by.AndrewMedvedev.Pizza.Command.Command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by Andrew on 28.05.2015.
 *
 */
public class SuccessOrder implements Command {

    @Override
    public String execute(HttpServletRequest request, HttpServletResponse response) {

        return "jsp/success.jsp";
    }
}
