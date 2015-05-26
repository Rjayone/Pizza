package by.AndrewMedvedev.Pizza.Utils;

import java.util.ArrayList;
import java.util.regex.Pattern;

/**
 *
 * Created by Andrew on 23.05.2015.
 */
public class Utils {
    static public ArrayList<Integer>parse(String args) {
        ArrayList<Integer> ids = new ArrayList<>();

        Pattern comma = Pattern.compile(",");
        String[ ] words = comma.split(args);
        for (int i = 0; i < words.length; i++) {
            ids.add(Integer.parseInt(words[i]));
        }
        return ids;
    }
}
