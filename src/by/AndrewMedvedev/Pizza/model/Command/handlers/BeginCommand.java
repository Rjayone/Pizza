package by.AndrewMedvedev.Pizza.model.Command.handlers;

import by.AndrewMedvedev.Pizza.model.Command.Command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by Andrew on 09.05.2015.
 * Обработчик кнопки перехода на страницу создания пиццы
 */
public class BeginCommand implements Command{
    @Override
    public String execute(HttpServletRequest request, HttpServletResponse response) {
        return "jsp/make.jsp";
    }
}
