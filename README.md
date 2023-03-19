# Getting Started with Create Dynamic form

This project has two parts one is dynamic form generation in react and type script and there is a server folder which has node.js server to 
serve files. Please make sure you have switched to node v16.14.0.

## Available Scripts


In the project directory, you can run: node index.js to serve server for you server will run on http://localhost:3000 by defaul. Before running this project you have to navigate to server folder and you should have to run npm install cammand which will download the required libraries to run node.js backend server.

### `Mock server api end points`

Once you will run the server you have access to following apis:

1. http://localhost:3000/login

Login api will assign a JWT token based on the request and all other apis will attach this token to the api call as a barer tokem.

2. http://localhost:3000/getFormJson

This end point will automatically provide a json that is required to generate the dynamic form.

3. http://localhost:3000/submit

Once user will fill the form he can submit the data as a payload it is post request.

4. http://localhost:3000/getdata

Get data api request can retrieve the data that is submitted by the user.

### `Dynamic form APP`

This app is fully designed to generate the form based on the json provided by the server.

There is 3 main parts of the dynamic form one is making input fields based on json provided by the server.
1. Validations on input fileds are done by Yup library which is very poplular and powerful for applying validations.
2. The skeleton of the form is crearted with help of Formik which is very very powerful and usefull for this kind of work.
3. Typescript is used to track interface of the application.
4. Routs are created with help of react router dom library.
5. Locals are done with help of i18n library

### `How to run it.`

Navigate to the root directory of this app and run npm install cammand. This cammand will install a required libraries run this application.

Once this app is up and running you will see the login page. Please input the following username and password.

username: test@test.com
password: test

### `Tests`

Fort unite test please run the below cammand to  run the tests.

npm test

