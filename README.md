# MyFridge

![Alt text](MyFridge_Logo.jpg?raw=true "Title")

### by Team: SESO



### Team Members:
- Xiaochen Li - PM
- Qiyu Chen
- Bobby Deng
- Ya Gao
- Jiarui Han
- Ziang Hong
- Yueqi Liao
- Guanyi Su
- Yicun Wu
- Guoguo Zhu

### Tech Stack

#### Front End
- React
- Material-UI

#### Back End
- Express.js

#### Database
- MongoDB

#### Testing
- Python
- Selenium with Python

#### Login Credentials:
Our application allows user to create new Account or log in to existed account,
our team provides two account for testing.
+------------------+----------+-----------------------------------------------+
| Account          | Password | Description                                   |
+------------------+----------+-----------------------------------------------+
| tester1@ucsd.edu | 12345    | Account with several food in the fridge,      |
|                  |          | tester could check for recipe recommendation, |
|                  |          | food-waste score board, friend list,          |
|                  |          | and grocery list directly.                    |
+------------------+----------+-----------------------------------------------+
| tester2@ucsd.edu | 8888     | Empty account, tester are allow to customize  |
|                  |          | the food they want to put into the fridge.    |
|                  |          | Tester should check recipe recommendation     |
|                  |          | after they added food into the fridge.        |
+------------------+----------+-----------------------------------------------+

### Installation and How to Run
This app can be installed by either with this url:
http://ec2-52-32-150-175.us-west-2.compute.amazonaws.com:3000/

Or can be installed locally on the machine.

First, change into desired local directory and run:
git clone https://github.com/ZaHong/myfridge_CSE110.git

Then, cd into the root directory of this git repository and run the following command to install our server end dependency:
cd backend/
npm install
npm start

Then without closing the current terminal, opens another terminal and cd into this application's root directory. Then run the following code to install our client side dependency and start the app
cd frontend/
npm install
npm start

Now, the default website should opened automatically and connect to localhost:3000 for this application
