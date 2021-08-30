create table shop_menu(
	id int primary key auto_increment,
	shop_id int,
	menu_img varchar(500),
	menu_name varchar(500),
	price int,
	description varchar(2000),
	created_at datetime default current_timestamp,
	updated_at datetime default current_timestamp,
	soft_delete int default 0,
	foreign key fk_shop_id(shop_id)
	references shop(id)
);