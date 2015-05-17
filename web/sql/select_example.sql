SELECT component.*, price.price, category.title FROM component
 INNER JOIN price on component.id = price.id
 INNER JOIN category on categoryId = category.id