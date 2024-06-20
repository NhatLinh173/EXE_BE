const Payment = require("./payment");
const Checkoout = require("./Checkout");
const Checkout = require("./Checkout");

Payment.watch().on("change", async (change) => {
  if (
    change.operationType === "update" &&
    change.updateDescription.updateFields.orderCodeStatus
  ) {
    const updatedOrderCodeStatus =
      change.updateDescription.updateFields.orderCodeStatus;

    const checkoutDoc = await Checkout.findOne({
      orderCodeStatus: updatedOrderCodeStatus,
    });

    if (checkoutDoc) {
      checkoutDoc.status = "Update Status";
      await checkoutDoc.save();
      console.log("Checkout status update successfully: ", checkoutDoc);
    } else {
      console.log(
        "No checkout document found with the updated orderCodeStatus: ",
        updatedOrderCodeStatus
      );
    }
  }
});
