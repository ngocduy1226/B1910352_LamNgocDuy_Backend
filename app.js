const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route")
const ApiError = require("./app/api-error");
const app = express();

app.use("/api/contacts", contactsRouter);

// handle 404 response
app.use((req, res, next) => {
     //chay khi khong co route dc dinh nghia nao khop voi yeu cau. goi next() de chuyen san middleware xu ly loi
     return next(new ApiError(404, "Resource not found"));
});
//define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    //Middleware xu ly loi tap trung
    //trong cac doan code xu ly o cac route, goi next(error) se chuyen ve middeware xu ly loi nay
    return res.status(err.statusCode || 500).json({
        message:err.message || "Internal Server Error",
    });
});
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

app.get("/", (req,res) => {
    res.json({
        message: "Welcome to contact book application."
    });
});

module.exports =  app;
