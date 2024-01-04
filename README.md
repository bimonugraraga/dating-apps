# dating-apps

## Setup
1. run ```npm i```
2. most of env is hard coded due to limited time, run ```npx sequelize db:create```, you can change the setup in ```config.js```
3. run ```npx sequelize db:migrate```
4. run ```npx sequelize db:seed:all``` (optional)
5. run ```npx nodemon app.js``` , you can change port in ```app.js```, default 3000
6. import postman json docs to postman app
7. you can change cron time to ```* * * * *``` every minute for testing in folder ```scheduler/index.js```

## Example user
email =  ```male1@mail.com```, password = ```123456```
email =  ```female1@mail.com```, password = ```123456```