import unittest
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

#Change to your own location for chromium driver
driver_location = "C:\Python27\Scripts\chromedriver.exe"


class LoginPageTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome(executable_path=driver_location)

    def test_connection(self):
        driver = self.driver
        driver.get('http://localhost:3000/')

        time.sleep(5)
        
        assert "Sign in"  in driver.page_source

    def test_login(self):
        driver = self.driver
        driver.get('http://localhost:3000/')

        #Get username field
        #Fill with some string
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/main/div/form/div[1]/div/input").send_keys("test@ucsd.edu")

        time.sleep(1)

        #Fill in the password
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/main/div/form/div[2]/div/input").send_keys("123")

        time.sleep(1)

        #Click on login
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/main/div/form/button").click()

        time.sleep(10)

        #Assert on index page
        assert "Welcome to" in driver.page_source
    
    def test_login_wrong_credential(self):
        driver = self.driver
        driver.get('http://localhost:3000/')

        #Get username field
        #Fill with some string
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/main/div/form/div[1]/div/input").send_keys("test@ucsd.edu")

        time.sleep(1)

        #Fill in the password
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/main/div/form/div[2]/div/input").send_keys("thisiswrongpassword")

        time.sleep(1)

        #Click on login
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/main/div/form/button").click()

        time.sleep(10)

        #Check for correct error handling
        assert "User Does Not Exist" in driver.page_source
    
    def test_login_empty_password(self):
        driver = self.driver
        driver.get('http://localhost:3000/')

        #Get username field
        #Fill with some string
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/main/div/form/div[1]/div/input").send_keys("test@ucsd.edu")

        time.sleep(1)

        #Click on login
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/main/div/form/button").click()

        time.sleep(10)

        #Check for correct error handling
        assert "Please Enter Valid Password" in driver.page_source

    def test_redirect_reset_password(self):
        driver = self.driver
        driver.get('http://localhost:3000/')

        #Click on login
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/main/div/form/div[3]/a[1]").click()

        time.sleep(10)

        #Check for correct error handling
        assert "Reset Password" in driver.page_source
    
    def test_redirect_sign_up(self):
        driver = self.driver
        driver.get('http://localhost:3000/')

        #Click on login
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/main/div/form/div[3]/a[2]").click()

        time.sleep(10)

        #Check for correct error handling
        assert "Sign Up" in driver.page_source


    def tearDown(self):
        self.driver.close()

if __name__ == '__main__':
    unittest.main()