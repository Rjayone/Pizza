package by.AndrewMedvedev.Pizza.model.Command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by Andrew on 09.05.2015.
 */
public interface Command {
    public String execute(HttpServletRequest request, HttpServletResponse response);
}
