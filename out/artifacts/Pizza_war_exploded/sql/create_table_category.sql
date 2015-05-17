create table if not exists category (
	id int not null,
    title varchar(80) primary key
) character set=cp1251;

CREATE INDEX indxes ON category (id);