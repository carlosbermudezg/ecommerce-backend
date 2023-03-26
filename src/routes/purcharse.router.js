const { getAll, CreatePurcharse } = require('../controllers/purchase.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerPurcharse = express.Router();

routerPurcharse.route('/')
  .get(verifyJWT, getAll)
  .post(verifyJWT, CreatePurcharse)



module.exports = routerPurcharse;