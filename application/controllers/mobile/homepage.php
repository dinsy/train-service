 <?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 /**
  *Homepage Class
  *
  *@category mobile
  *@author dinsy
  */
 class Homepage extends CI_Controller {
	/**
	 *Show  index page
	*/
	function index()
	{
		$this->output->enable_profiler(TRUE);
		
		echo 'mobile version.';
		$this->load->library('test');
		echo $this->test->test();

		date_default_timezone_set('UTC');
		$this->load->helper('My_utils');
		echo current_datetime();
		echo "\n";

	}
 }

 //end of the file
 //location: application/contollers/mobile/homepage.php