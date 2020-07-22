const express = require('express');
const { getBlog } = require('../controllers/blog_controller');

const router = express.Router();

router.get('/', async (req, res) => {
  let link = req.query.link;

  try {
    let data = await getBlog(link);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
