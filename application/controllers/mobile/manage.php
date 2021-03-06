<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 /**
  *Homepage Class
  *
  *@category mobile
  *@author dinsy
  */
 class Manage extends CI_Controller {

	 private $manage_groups = array('admin', 'superadmin');
	/**
	 *Show  index page
	*/
	function __construct()
	{
		parent::__construct();
		$this->load->model('rbac_model');
		
		if ( $this->session->userdata('is_login') !== TRUE ) {
			$this->load->helper('url');
			redirect('/mobile/webpage/login?url=/mobile/manage', 'refresh');
		}

		$user_groups = $this->rbac_model->get_user_groups($this->session->userdata('user_id'), 'groups.name');

		$is_allowed = FALSE;
		foreach ($user_groups as $ug) {
			if (in_array($ug['name'], $this->manage_groups)) {
				$is_allowed = TRUE;
				break;
			}
		}

		if ( ! $is_allowed) {
			show_error('not allowed, you don\'t have kind of permission!');
		}
	}
	
	function index()
	{
		$data['appname'] = 'Manage';
		$data['params'] = '';
		$this->load->view('mobile/template', $data);
	}
	
	function carriage($carriage_serial)
	{
		if ( ! isset($carriage_serial)) {
			echo "error carriage serial.";
			return;
		}
		$data['appname'] = 'Seat';
		$data['params'] = 'type=seat_status&notice=seat_status&serial='.$carriage_serial;
		$this->load->view('mobile/template', $data);
	}

	function traininfo()
	{
		$data['appname'] = 'Traininfo';
		$data['params'] = 'type=train_info';
		$this->load->view('mobile/template', $data);
	}
 }

