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

    def test_connection(self):
        driver = self.driver
        assert "Welcome to" in driver.page_source

    def test_addFood_redirect(self):
        driver = self.driver
        buttonnum = 0
        for i in range(1,20):
            try:
                temp = " /html/body/div/div/div/div/div[2]/div/div/div[1]/div[2]/div/button[" + str(i) +"]"
                button = driver.find_element(By.XPATH, temp)
                button.click()
                buttonnum = i
            except:
                buttonnum = buttonnum
        driver.find_element(By.XPATH, " /html/body/div/div/div/div/div[2]/div/div/div[1]/div[2]/div/button[" + str(buttonnum) +"]")
        assert "New Food Item" in driver.page_source
    
    def test_addFood(self):
        driver = self.driver
        buttonnum = 0
        for i in range(1,20):
            try:
                temp = " /html/body/div/div/div/div/div[2]/div/div/div[1]/div[2]/div/button[" + str(i) +"]"
                button = driver.find_element(By.XPATH, temp)
                button.click()
                buttonnum = i
            except:
                buttonnum = buttonnum
        driver.find_element(By.XPATH, " /html/body/div/div/div/div/div[2]/div/div/div[1]/div[2]/div/button[" + str(buttonnum) +"]")
        time.sleep(1)
        #Added name
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div/div/div["+ str(buttonnum + 2) +"]/div/p/div/div/table/div/div[1]/div/div/input").send_keys("appletest")
        time.sleep(1)
        #Added Tag
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div/div/div["+ str(buttonnum + 2) +"]/div/p/div/div/table/div/div[2]/div/input").send_keys("fruittest")
        time.sleep(1)
        #Add Quantity
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div/div/div["+ str(buttonnum + 2) +"]/div/p/div/div/table/div/div[3]/div/input").send_keys("6")
        time.sleep(1)
        #Add Duration
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div/div/div["+ str(buttonnum + 2) +"]/div/p/div/div/table/div/div[5]/div/input").send_keys("10")
        time.sleep(1)
        #Click Save button
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div/div/div["+ str(buttonnum + 2) +"]/div/p/div/div/table/div/button").click()
        time.sleep(10)
        assert "Welcome to" in driver.page_source
        assert "appletest" in driver.page_source 
    
    def test_addFood_no_quantity_exception(self):
        driver = self.driver
        buttonnum = 0
        for i in range(1,20):
            try:
                temp = " /html/body/div/div/div/div/div[2]/div/div/div[1]/div[2]/div/button[" + str(i) +"]"
                button = driver.find_element(By.XPATH, temp)
                button.click()
                buttonnum = i
            except:
                buttonnum = buttonnum
        driver.find_element(By.XPATH, " /html/body/div/div/div/div/div[2]/div/div/div[1]/div[2]/div/button[" + str(buttonnum) +"]")
        time.sleep(1)
        #Added name
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div/div/div["+ str(buttonnum + 2) +"]/div/p/div/div/table/div/div[1]/div/div/input").send_keys("appletest")
        time.sleep(1)
        #Added Tag
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div/div/div["+ str(buttonnum + 2) +"]/div/p/div/div/table/div/div[2]/div/input").send_keys("fruittest")
        time.sleep(1)
        #Add Duration
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div/div/div["+ str(buttonnum + 2) +"]/div/p/div/div/table/div/div[5]/div/input").send_keys("10")
        time.sleep(1)
        #Click Save button
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div/div/div["+ str(buttonnum + 2) +"]/div/p/div/div/table/div/button").click()
        time.sleep(5)
        assert "Please Enter Numerical Quantity" in driver.page_source

        #Add Quantity
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div/div/div["+ str(buttonnum + 2) +"]/div/p/div/div/table/div/div[3]/div/input").send_keys("This is Invalid")
        time.sleep(1)
        assert "Please Enter Numerical Quantity" in driver.page_source

    def test_addFood_remove_food(self):
        driver = self.driver
        buttonnum = 0
        for i in range(1,20):
            try:
                temp = " /html/body/div/div/div/div/div[2]/div/div/div[1]/div[2]/div/button[" + str(i) +"]"
                button = driver.find_element(By.XPATH, temp)
                button.click()
                buttonnum = i
            except:
                buttonnum = buttonnum
        driver.find_element(By.XPATH, " /html/body/div/div/div/div/div[2]/div/div/div[1]/div[2]/div/button[" + str(buttonnum) +"]")
        time.sleep(1)
        #Added name
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div/div/div["+ str(buttonnum + 2) +"]/div/p/div/div/table/div/div[1]/div/div/input").send_keys("zremovetest")
        time.sleep(1)
        #Added Tag
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div/div/div["+ str(buttonnum + 2) +"]/div/p/div/div/table/div/div[2]/div/input").send_keys("test")
        time.sleep(1)
        #Add Quantity
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div/div/div["+ str(buttonnum + 2) +"]/div/p/div/div/table/div/div[3]/div/input").send_keys("6")
        time.sleep(1)
        #Add Duration
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div/div/div["+ str(buttonnum + 2) +"]/div/p/div/div/table/div/div[5]/div/input").send_keys("10000")
        time.sleep(1)
        #Click Save button
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div/div/div["+ str(buttonnum + 2) +"]/div/p/div/div/table/div/button").click()
        time.sleep(5)
        #Assert for succesfully add the food that is about to be removed
        assert "zremovetest" in driver.page_source

        time.sleep(1)
        driver.find_element(By.XPATH, " /html/body/div/div/div/div/div[2]/div/div/div[1]/div[2]/div/button[" + str(buttonnum) +"]").click()
        time.sleep(1)
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div/div/div[" + str(buttonnum+2) +"]/div/p/div/div/ul/li[7]/button[2]").click()
        time.sleep(5)
        #Assert for succesfully remove the food
        assert "zremovetest" not in driver.page_source
    
    def test_addFood_autocomplete(self):
        driver = self.driver
        buttonnum = 0
        for i in range(1,20):
            try:
                temp = " /html/body/div/div/div/div/div[2]/div/div/div[1]/div[2]/div/button[" + str(i) +"]"
                button = driver.find_element(By.XPATH, temp)
                button.click()
                buttonnum = i
            except:
                buttonnum = buttonnum
        driver.find_element(By.XPATH, " /html/body/div/div/div/div/div[2]/div/div/div[1]/div[2]/div/button[" + str(buttonnum) +"]")
        #wait for food list to be loaded
        time.sleep(5)

        #Added name
        driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div/div/div["+ str(buttonnum + 2) +"]/div/p/div/div/table/div/div[1]/div/div/input").send_keys("watermelon")
        time.sleep(1)
        
        assert "fruits" in driver.page_source

    def tearDown(self):
        self.driver.close()

if __name__ == '__main__':
    unittest.main()