## auth router
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter 
- POST /request/send/:status/:userId  
- POST /request/send/:status/:userId

## userRouter
- GET /user/connections
- GET /user/requests/received
- GET /user/feed - gets you the profiles of other users on platform

status : ignores ,inrested,accepted,rejected
