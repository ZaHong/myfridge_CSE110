import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

#Change to your own location for chromium driver
driver_location = "C:\Python27\Scripts\chromedriver.exe"
driver = webdriver.Chrome(executable_path=driver_location)


def test_login():
    driver.get('http://localhost:3000/')

    #Get username field
    #Fill with some string
    driver.find_element(By.XPATH, "/html/body/div/main/div[2]/div/form/div[1]/div/input").send_keys("abcdefg@ucsd.edu")

    time.sleep(1)

    #Fill in the password
    driver.find_element(By.XPATH, "/html/body/div/main/div[2]/div/form/div[2]/div/input").send_keys("pass123")

    time.sleep(1)

    #Click on login
    driver.find_element(By.XPATH, "/html/body/div/main/div[2]/div/form/button").click()

if __name__ == '__main__':
    test_login()