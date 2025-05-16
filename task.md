3
-create repository
-initialize repository
-node module,pakage.json,pakage-lock.json
-install express
-create server
-listen port 7777
-write request handler for /test , /hello
-see --watch

4
--initialize git
-.gitignore
-create a remote repo on github
-push all code to remote origin
-play with route and route extensions ex./hello, / ,hello/2 ,/xyz
-order of the routes matters a lot
-write logic to handle GET, POST, DELETE, PATCH API calls and test them on postman
-query params in routes
-dynamic routes

5
-multiple routehandlers
-next()
-next function add errors along with res.send()
-what is moodleware why do we need it
-how express.js basically handles requests behind the schenes
-difference app.use and app.all
-write dummy auth middlea=ware for admin
-write a dummy auth middleware for all user Routes,except /user /login
-error handling using app.use("/",(err,req,res,next)={});

6
-create cluster
-install mongoose
-connect application to thi database
-connect first database and than starting application
-create a user schema

7
-what is the deifference betwwen json or javascript
-add json middleware
-make your signup api dynamic to receive data from the  and user
-API = get user from the email
-API - FEED API - GET /feed - get all the users from the database
-API - find by id 
-API - delete user

8
-schema options
-add required,unique,lowercase,min,minlength,trim
-add default
-create a cudtom validatetion function for gender
-improve db schema - appropiate validations each field in schema
-add timestamps
-api level validation patch request
-api validation all fields
-external email validator
-install validator

9
-validate data in signup api
-install bcrypt pakage
-create password using bcrypt.hash $ save the user is excupted passwords
-create login api
-compare password and throw error email or password invalid
-install cookie parser
-just send a dummy cookie to user
-create get/profile api check if you the cookie back
-in login apin create a jwt token 
-read the cookie inside your profile api and find the logged user
-user auth middleware
-add the userauth middleware in profile api send a new sendconnection quest api
-test the expiry of jwt token and cookie for 7days
-create userschema method to getJWT()
-create userschema methos to comparepassword(passwordinputbyuser)