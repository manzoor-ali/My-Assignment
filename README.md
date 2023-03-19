# Getting Started with Create Dynamic form

This project consists of two parts - one is the dynamic form generation in React and TypeScript, and the other is a Node.js server to serve files. Before running this project, make sure to switch to Node v16.14.0.

## Available Scripts

In the project directory, you can run node index.js to start the server. By default, the server will run on http://localhost:3000. Before running this project, navigate to the server folder and run the npm install command to download the required libraries to run the Node.js backend server.


### `Mock server api end points`

After running the server, you will have access to the following APIs:

1. http://localhost:3000/login - This API assigns a JWT token based on the request, which will be attached to all subsequent API calls as a bearer token.

2. http://localhost:3000/getFormJson - This endpoint provides the JSON required to generate the dynamic form.

3. http://localhost:3000/submit - Once the user fills out the form, they can submit the data as a payload through a POST request.

4. http://localhost:3000/getdata - This API retrieves the data submitted by the user.

### `Dynamic form APP`

This app is designed to generate a form based on the JSON provided by the server. There are three main parts of the dynamic form:

1. Input fields are generated based on the JSON provided by the server.
2. Input field validations are performed using the Yup library.
3. The skeleton of the form is created with the help of Formik, which is useful for this kind of work.
4. TypeScript is used to track the interface of the application.
5. Routes are created with the help of the react-router-dom library.
6. Locales are handled with the i18n library.

### `How to run it.`

To run the app, navigate to the root directory of this app and run the npm install command to install the required libraries. Once the app is up and running, you will see the login page. Input the following username and password to log in:

username: test@test.com
password: test

### `Tests`

To run unit tests, run the command npm test. 

npm test

### `Deployment`

Deployment is straightforward with Docker. This application has a Dockerfile that helps to create a Docker image. To deploy the app:

1. Run the command docker build -t assignment to create a Docker image.
2. Run the command docker tag assignment visiostudio1/assignment to tag the Docker image.
3. Upload the image on the server, and then pull that image on AWS or any other server and run it inside of Docker using the command docker push visiostudio1/assignment.

