create table if not exists component (
	id int auto_increment,
    name varchar(80) not null,
    imgPath varchar(255) not null,
    layer varchar(255) not null,
    priceId int not null,
    categoryId int not null,
    primary key (id),
    CONSTRAINT fk_priceId foreign key (priceId) references price(id) on delete cascade on update cascade,
    CONSTRAINT fk_categoryId foreign key (categoryId) references category(id)  on delete cascade on update cascade
) 
character set=cp1251
