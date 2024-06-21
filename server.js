const express = require("express");

const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

// Import các router và controller
const authRouter = require("./src/routers/authRoutes");
const userRouter = require("./src/routers/userRoutes");
const productRouter = require("./src/routers/productRoutes");
const cartRouter = require("./src/routers/cartRouter");
const checkoutRouter = require("./src/routers/checkoutRoutes");
const paymentRouter = require("./src/routers/paymentRoutes");
const paymentController = require("./src/controllers/payment-Controller");
const orderController = require("./src/controllers/oder-controller");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware để parse JSON
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect(
    "mongodb+srv://linh270702:ZQytxhfVyF4Q0yev@cluster0.aih5xfq.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

// Định nghĩa các route
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/status", paymentRouter);
app.use("/payment", paymentController);
app.use("/order", orderController);
app.use("/checkout", checkoutRouter);

// Route để gửi email
app.post("/sendEmail", async (req, res) => {
  const { email } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "linhnvnde160328@fpt.edu.vn",
      pass: "pqmwyzzhvywkuzpg",
    },
  });

  await transporter.sendMail(
    {
      from: "linhnvnde160328@fpt.edu.vn",
      to: email,
      subject: "Hello Customer",
      text: "Hello world",
    },
    (err) => {
      if (err) {
        return res.json({
          message: "Send fail",
          error: err,
        });
      }
      return res.json({
        message: `Send successfully to address ${email}`,
      });
    }
  );
});

// Bắt đầu server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
