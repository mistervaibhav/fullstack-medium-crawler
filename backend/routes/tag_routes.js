const express = require('express');
const { searchByTag } = require('../controllers/tag_controller');

const router = express.Router();

router.get('/:tag', async (req, res) => {
  // console.log('route called');
  // console.log(req.params.tag);
  // console.log(req.query.page);
  try {
    let data = await searchByTag(req.params.tag, req.query.page);

    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// router.get('/related/:tag', async (req, res) => {
//   // console.log('route called');
//   // console.log(req.params.tag);
//   // console.log(req.query.page);
//   try {
//     let data = await searchByTag(req.params.tag, req.query.page);

//     res.json(data);
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
