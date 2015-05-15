package by.AndrewMedvedev.Pizza.model.DataBase;

/**
 * Created by Andrew on 12.05.2015.
 */
public class Component {
    private int id;
    private String name;
    private int price;
    private String imgPath;
    private String layer;
    private String category;

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }

    public String getImgPath() {
        return imgPath;
    }

    public String getLayer() {
        return layer;
    }

    public String getCategory() {
        return category;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public void setImgPath(String imgPath) {
        this.imgPath = imgPath;
    }

    public void setLayer(String layer) {
        this.layer = layer;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
