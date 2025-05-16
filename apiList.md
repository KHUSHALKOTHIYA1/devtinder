## auth router
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter 
- POST /request/send/intrested/:userId  
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestedId
- POST /request/review/rejected/:requestedId

## userRouter
- GET /user/connections
- GET /user/requests/received
- GET /user/feed - gets you the profiles of other users on platform

status : ignores ,inrested,accepted,rejected
