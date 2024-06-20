const express = require("express");
const router = express.Router();
const payOs = require("../utils/payOs");
router.post("/create", async function (req, res) {
  const { description, returnUrl, cancelUrl, totalPrice, orderCodeStatus } =
    req.body;

  if (
    !totalPrice ||
    !returnUrl ||
    !cancelUrl ||
    !description ||
    !orderCodeStatus
  ) {
    return res
      .status(400)
      .send(
        "Invalid Parameter, amount, returnUrl , cancelUrl, description, must not be undefined or null"
      );
  }

  const body = {
    orderCode: Number(String(new Date().getTime()).slice(-6)),
    amount: totalPrice,
    description,
    cancelUrl: "http://localhost:3006/fail",
    returnUrl: "http://localhost:3006/success",
    orderCodeStatus,
  };

  try {
    const paymentLinkRes = await payOs.createPaymentLink(body);
    console.log({
      amount: body.amount,
      returnUrl,
      cancelUrl,
      description,
      orderCodeStatus,
    });
    return res.json({
      error: 0,
      message: "Success",
      data: {
        bin: paymentLinkRes.bin,
        checkoutUrl: paymentLinkRes.checkoutUrl,
        accountNumber: paymentLinkRes.accountNumber,
        accountName: paymentLinkRes.accountName,
        amount: paymentLinkRes.amount,
        description: paymentLinkRes.description,
        orderCode: paymentLinkRes.orderCode,
        qrCode: paymentLinkRes.qrCode,
        cancelUrl: body.cancelUrl,
        returnUrl: body.returnUrl,
        orderCodeStatus: body.orderCodeStatus,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: -1,
      message: "Fail",
      data: null,
    });
  }
});

router.get("/:orderId", async function (req, res) {
  try {
    const order = await payOS.getPaymentLinkInfomation(req.params.orderId);
    if (!order) {
      return res.json({
        error: -1,
        message: "failed",
        data: null,
      });
    }
    return res.json({
      error: 0,
      message: "ok",
      data: order,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: -1,
      message: "failed",
      data: null,
    });
  }
});

router.put("/:orderId", async function (req, res) {
  try {
    const { orderId } = req.params;
    const body = req.body;
    const order = await payOS.cancelPaymentLink(
      orderId,
      body.cancellationReason
    );
    if (!order) {
      return res.json({
        error: -1,
        message: "failed",
        data: null,
      });
    }
    return res.json({
      error: 0,
      message: "ok",
      data: order,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      error: -1,
      message: "failed",
      data: null,
    });
  }
});

router.post("/confirm-webhook", async (req, res) => {
  const { webhookUrl } = req.body;
  try {
    await payOS.confirmWebhook(webhookUrl);
    return res.json({
      error: 0,
      message: "ok",
      data: null,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      error: -1,
      message: "failed",
      data: null,
    });
  }
});

module.exports = router;
