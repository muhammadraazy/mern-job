### For Easy testing jwt Token on POSTMAN
- set this snippet to global environtment on postman test
  
```javascript
    const jsonData = pm.response.json();
    pm.globals.set('token', jsonData.token)
```

## Good Resource for practice coding
- [exercism.io](https://exercism.org/users/sign_in)

 ### Important package
 - express-async-errors => to handle async error
 - http-status-codes => to display http status codes
-  morgan => for http logger
 

 ### mock data for api
 - [mockaroo](https://www.mockaroo.com/)
 

## Setup For Production
- delete node_modules folder
- then install all dependencies
```shell
    npm install && npm start
```

 ### To Serve front end app
 ```javascript
    app.use(express.static(path.join(process.cwd(), '../client/build')))

    // if route is not the same like server route then always redirect to front end app;
    app.get("*", (req, res) => {
    res.sendFile(path.join(process.cwd(), '../client/build', 'index.html'))
    })  
 ```


 ### Security Package for backend and database
 - [xss-clean](https://www.npmjs.com/package/xss-clean) => to sanitize user input
 - [mongo-sanitize](https://www.npmjs.com/package/mongo-sanitize) - a standalone module that sanitizes inputs against query selector injection attacks
 - [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) - to limit repeated request to server
 - helmetjs => to secure http header or connection to server