const express  = require("express");
const passport = require("passport"); 


const app  = express();
const port = (process.env.PORT || 5000);

const authUsersRouter   = require("./API/auth/users");
const usersActionRouter = require("./API/usersActions/posts"); 

const clientErrorHandler = require("./API/errorHandlers/clientError");
const catchAllHandler    = require("./API/errorHandlers/catchAll");

app.use(express.urlencoded({extended: false}));
app.use(express.json());

require("./DB").setConnection()
.then(() => console.log("MongoDB Connected"))
.catch(error => console.log(error));

app.use(passport.initialize());
require("./Config/passportConfig")(passport);

app.use("/api/auth", authUsersRouter);
app.use("/api/user", usersActionRouter);

app.use((req, res, next) => {
    return res.status(404).json({Client_Error: "Error 404 - Page Not Found"});
});

app.use(clientErrorHandler);
app.use(catchAllHandler);

app.listen(port, () => console.log(`Server Started On Port ${port}`));