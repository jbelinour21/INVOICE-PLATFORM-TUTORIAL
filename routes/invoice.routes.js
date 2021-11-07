const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const invoiceControllers = require("../controllers/invoice.controllers");

router.get("/", verifyToken, invoiceControllers.getInvoices);
router.get(
  "/auto_complete",
  verifyToken,
  invoiceControllers.getInvoiceAutoComplete
);
router.post("/", verifyToken, invoiceControllers.createInvoice);
router.get("/me", verifyToken, invoiceControllers.getOwnInvoices);
router.get(
  "/:invoiceRef",
  verifyToken,
  invoiceControllers.getInvoiceByReference
);
router.get("/:invoiceId/cancel", verifyToken, invoiceControllers.cancelInvoice);
router.get(
  "/:invoiceId/confirm",
  verifyToken,
  invoiceControllers.confirmInvoice
);
module.exports = router;