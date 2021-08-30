create table user(
	id int primary key auto_increment,
	user_name varchar(200) not null,
	mail_address varchar(200) not null unique,
  password varchar(256) not null,
  created_at datetime default current_timestamp,
	updated_at datetime default null,
	soft_delete int default 0
);
