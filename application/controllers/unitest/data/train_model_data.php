 <?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
 CREATE TABLE IF NOT EXISTS `trains` (
	`train_id` INT(5)  UNSIGNED NOT NULL AUTO_INCREMENT,
	-- 列车编号
	`serial` VARCHAR(20)  NOT NULL UNIQUE ,
	-- 列车额外信息勇json格式进行编码,通常是这样{"meal_carriag": "012", "cariage_count": 20}
	`extra_info` VARCHAR(255) DEFAULT NULL,
	-- 创建时间
	`created_at` DATETIME NOT NULL,
	-- 更新时间
	`modified_at` TIMESTAMP NOT NULL,
	PRIMARY KEY (`train_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `carriages` (
	`carriage_id` INT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
	-- 车厢编号
	`serial` VARCHAR(20) NOT NULL UNIQUE,
	-- 座位数量
	`seat_capacity` INT(5) NOT NULL,
	-- 车厢座位状态, json编码表示,{"idle": [], "occupied": [], "changing": []}
	`seat_status` VARCHAR(100) DEFAULT NULL,
	-- 创建时间
	`created_at` DATETIME NOT NULL,
	-- 更新时间
	`modified_at` TIMESTAMP NOT NULL,
	PRIMARY KEY (`carriage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci AUTO_INCREMENT=1;
*/
//
/*
 @modify by whl
 @modify_time  2013/05/03
 @modify_aspect $trains add the 'extra_info' 


    */




$trains = array(
	0 => array(
		'serial' => 'K448',
		'extra_info' => array(
			'餐车号' => 12,
			'列车长' => '王小二',
			'出发城市' => '西安',
			'终点城市' => '洛阳',
		)
	)
);

$carriages = array(
	0 => array(
		'serial' => '1',
		'seat_capacity' => '50'
	),
	1 => array(
		'serial' => '2',
		'seat_capacity' => '50'
	),
	2 => array(
		'serial' => '3',
		'seat_capacity' => '50'
	),
);

$time_table = array(
	0 => array(
		'name' => '西安',
		'forth_arrive_time' => '00:00',
		'forth_leave_time' => '12:34',
		'back_arrive_time' => '00:00',
		'back_leave_time' => '12:34'
	),
	1 => array(
		'name' => '华山',
		'forth_arrive_time' => '13:00',
		'forth_leave_time' => '13:10',
		'back_arrive_time' => '13:00',
		'back_leave_time' => '13:10'
	),
	2 => array(
		'name' => '洛阳',
		'forth_arrive_time' => '16:12',
		'forth_leave_time' => '16:18',
		'back_arrive_time' => '16:12',
		'back_leave_time' => '16:18'
	)
);
?>