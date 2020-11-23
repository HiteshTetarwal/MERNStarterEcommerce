# MERNStarterEcommerce

## Pre-Configuration
You will need below tools to start to run the project:
1. [Node](https://nodejs.org/en/download/)
2. [Postman](https://www.postman.com/downloads/)
3. [Robo3T](https://robomongo.org/download)
4. [MongoDB](https://www.mongodb.com/try/download/community)

### Installing Packages Needed
To run this project without any issues, you will need to install all the packages used in the project.

1. Download the [package.json](https://github.com/HiteshTetarwal/MERNStarterEcommerce/blob/master/projbackend/package.json) file and place it in ```projectbackend``` directory.

2. ```package.json``` includes all the packages required for this project. And run the command below in the ```projectbackend```. (``package.json`` includes ```express``` configurations as well. So no need to install it separately, it will be installed along with below command)

            npm install

### Starting a fresh server
1. Everytime on fresh new startup of system. The MongoDB server is required to run again. Use the below command to run MongoDB. Target the ```mongo.exe``` path to run whenever you want to start MongoDB:
            
            "C:\Program Files\MongoDB\Server\4.4\bin\mongo.exe"
            
2. Go to the porject directory where app.js is located and run the below command to start the server.

            npm start
