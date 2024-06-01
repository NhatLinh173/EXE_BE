const express = require("express");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const authRouter = require("./src/routers/authRoutes");
const userRouter = require("./src/routers/userRoutes");
const productRouter = require("./src/routers/productRoutes");
const cartRouter = require("./src/routers/cartRouter");
const checkoutRouter = require("./src/routers/checkoutRoutes");
const paymentRouter = require("./src/routers/paymentRoutes");
const app = express();
const PORT = 3000;

app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/exe")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/status", paymentRouter);
app.use("/payment", require("./src/controllers/payment-Controller"));
app.use("/order", require("./src/controllers/oder-controller"));
app.use("/checkout", checkoutRouter);
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
      text: "Hello word",
    },
    (err) => {
      if (err) {
        return res.json({
          message: "Send fail",
          error: err,
        });
      }
      return res.json({
        message: `Send successfully for address ${email}`,
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
