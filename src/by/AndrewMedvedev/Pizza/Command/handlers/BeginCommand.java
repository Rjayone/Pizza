package by.AndrewMedvedev.Pizza.Command.handlers;

import by.AndrewMedvedev.Pizza.domain.DataBaseQuery;
import by.AndrewMedvedev.Pizza.Command.Command;
import by.AndrewMedvedev.Pizza.model.DataBase.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;

/**
 * Created by Andrew on 09.05.2015.
 * Обработчик кнопки перехода на страницу создания пиццы
 */
public class BeginCommand implements Command{
    @Override
    public String execute(HttpServletRequest request, HttpServletResponse response) {
        DataBaseQuery DBQuery = DataBaseQuery.getInstance();
        ArrayList<Component> comps = new ArrayList<>();
        DBQuery.selectAllComponents(comps);
        request.setAttribute("components", comps);

        return "jsp/make.jsp";
    }
}
