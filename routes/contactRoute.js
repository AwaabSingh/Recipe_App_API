const express = require('express');
const { createContact} = require("../controllers/contactController");

const router = express.Router()

router.post('/', createContact)
// router.get('/', GetAllFeedbacks)

module.exports = router;