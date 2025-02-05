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
        #Set up driver by login to the main page
        self.driver = webdriver.Chrome(executable_path=driver_location)
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
    
    def test_friend_display(self):
        driver = self.driver
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[1]/a[3]/button").click()
        #Wait for friend page to load
        time.sleep(10)
        
        assert "Friends" in driver.page_source

    def test_return_to_index(self):
        driver = self.driver
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[1]/a[3]/button").click()
        #Wait for friend page to load
        time.sleep(10)

        assert "Friends" in driver.page_source

        #Click the logo to go back to homescreen
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[1]/a[1]/img").click()
        
        time.sleep(10)
        assert "Welcome to" in driver.page_source
    
    def test_add_friend_popup(self):
        driver = self.driver
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[1]/a[3]/button").click()
        #Wait for friend page to load
        time.sleep(10)

        assert "Friends" in driver.page_source

        #Click on add icon
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div/ul/li[1]/div/button").click()
        
        time.sleep(1)
        assert "Cancel" in driver.page_source
    
    def test_add_delete_friend(self):
        driver = self.driver
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[1]/a[3]/button").click()
        #Wait for friend page to load
        time.sleep(10)

        assert "Friends" in driver.page_source

        #Click on add icon
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div/ul/li[1]/div/button").click()

        time.sleep(1)
        
        #Fill in email field
        driver.find_element(By.XPATH, "/html/body/div[2]/div[3]/div/div[1]/div/div/input").send_keys("tester1@ucsd.edu")
        
        time.sleep(1)


        #Click to add button
        driver.find_element(By.XPATH, "/html/body/div[2]/div[3]/div/div[2]/button[2]").click()

        time.sleep(10)

        assert "tester1@ucsd.edu" in driver.page_source

        #delete friend for future test
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div/ul/div[3]/li/button").click()

        time.sleep(10)

        assert "tester1@ucsd.edu" not in driver.page_source

    def test_update_scoreboard(self):
        driver = self.driver

        #Make sure currently don't have that friend
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[1]/a[2]/button").click()
        #Wait for scoreboard page to load
        time.sleep(10)
        
        assert "testerGary" not in driver.page_source

        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[1]/a[3]/button").click()
        #Wait for friend page to load
        time.sleep(10)

        assert "Friends" in driver.page_source

        #Click on add icon
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div/ul/li[1]/div/button").click()

        time.sleep(1)
        
        #Fill in email field
        driver.find_element(By.XPATH, "/html/body/div[2]/div[3]/div/div[1]/div/div/input").send_keys("tester1@ucsd.edu")
        
        time.sleep(1)


        #Click to add button
        driver.find_element(By.XPATH, "/html/body/div[2]/div[3]/div/div[2]/button[2]").click()

        time.sleep(10)

        assert "tester1@ucsd.edu" in driver.page_source

        #Move to scoreboard page
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[1]/a[2]/button").click()
        #Wait for scoreboard page to load
        time.sleep(10)
        
        assert "testerGary" in driver.page_source

        #Moves back to friend page

        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[1]/a[3]/button").click()

        time.sleep(10)

        #delete friend for future test
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div/ul/div[3]/li/button").click()

        time.sleep(10)

        assert "tester1@ucsd.edu" not in driver.page_source

        #Make sure friend in scoreboard is being delelted
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[1]/a[2]/button").click()
        #Wait for scoreboard page to load
        time.sleep(10)
        
        assert "testerGary" not in driver.page_source

        


    def tearDown(self):
        self.driver.close()

if __name__ == '__main__':
    unittest.main()