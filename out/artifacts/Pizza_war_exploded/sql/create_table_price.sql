create table if not exists price (
	id int auto_increment primary key,
    price int not null
) character set=cp1251;

CREATE INDEX indxes ON price (id);