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
