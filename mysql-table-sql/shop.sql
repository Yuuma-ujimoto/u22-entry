create table shop(
	id int primary key auto_increment,
	shop_name varchar(200) not null comment 'ショップ名',
	shop_genre varchar(10) comment 'ジャンル',
	owner_id int not null comment 'HP作成者',
	postal_code varchar(20) comment '郵便番号',
	prefectures varchar(250) comment '都道府県',
	municipality varchar(250) comment '市区町村',
	address varchar(250) comment '番地',
    station varchar(200) comment '最寄り駅',
	open_time varchar(100) comment '開店時間',
	close_time varchar(100) comment '閉店時間',
	mail_address varchar(200) comment 'メールアドレス',
	phone_number varchar(200) comment '電話番号',
	template_type varchar(100) comment 'テンプレートの型',
	created_at datetime default current_timestamp,
	updated_at datetime default current_timestamp,
	shop_status varchar(100) default 'interim' comment 'interim:仮登録/fin:本登録' ,
	soft_delete int default 0,
	foreign key fk_owner_id(owner_id)
	references user(id)
);