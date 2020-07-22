const express = require('express');
const { getTopics, getPostsByTopic } = require('../controllers/topic_controller');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let topics = await getTopics();
    // console.log(topics);
    res.json(topics);
  } catch (error) {
    console.log(error);
  }
});

router.get('/:title', async (req, res) => {
  try {
    let posts = await getPostsByTopic(req.params.title);
    // console.log(posts);
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
