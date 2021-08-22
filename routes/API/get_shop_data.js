const express = require("express")
const router = express.Router()
const connection = require("../../config/mysql")

router.post("/all-shop")