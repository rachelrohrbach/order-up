'use strict';

const router = require(`express`).Router();
const timeController = require(`../../controllers/timeController`);

router.route(`/`).get(timeController.findAll).post(timeController.create);
router.route(`/deleteMany`).delete(timeController.removeMany);

router.route(`/updateMany`).put(timeController.updateMany);
router
  .route(`/:id`)
  .get(timeController.findById)
  .put(timeController.update)
  .delete(timeController.remove);

module.exports = router;
