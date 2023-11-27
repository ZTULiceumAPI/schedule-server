const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const renderController = require("../controllers/render-controller");
const scheduleController = require("../controllers/schedule-controller");
const adminController = require("../controllers/admin-controller");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.get("/getClientId", userController.createUserClientId);

router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.post("/refresh", userController.refresh);
router.get("/getUser", userController.getUser);
router.get("/users", userController.getUsers);
router.post("/refresh", userController.refresh);

// router.post("/check", scheduleController.checkReq);

router.get("/schedule", scheduleController.getSchedule);

router.post("/schedule", scheduleController.createSchedule);

router.put("/schedule", scheduleController.putSchedule);

router.delete("/schedule", scheduleController.deleteSchedule);

router.post("/schedule/noteonline", scheduleController.noteOnline);

router.get(
  "/admin/getOnline",
  [authMiddleware, adminMiddleware],
  adminController.getOnline
);

router.get(
  "/admin/anoncement",
  [authMiddleware, adminMiddleware],
  adminController.getAllAnoncements
);

router.post(
  "/admin/anoncement",
  [authMiddleware, adminMiddleware],
  adminController.createAnoncement
);

router.put(
  "/admin/anoncement",
  [authMiddleware, adminMiddleware],
  adminController.editAnoncement
);
router.put(
  "/admin/anoncement/pin",
  [authMiddleware, adminMiddleware],
  adminController.pinAnoncement
);

router.get("/anonces", scheduleController.getAllAnoncements);
router.get("/anonces/pinned", scheduleController.getPinnedAnoncements);

router.get("/anoncesClosest", scheduleController.getClosestEvent);

router.post(
  "/admin/anoncement-delete",
  [authMiddleware, adminMiddleware],
  adminController.deleteAnoncement
);

// keep render onlone
router.get("/keep-server-online", renderController.keepServerOnline);

module.exports = router;
