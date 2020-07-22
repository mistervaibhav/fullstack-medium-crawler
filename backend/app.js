const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || 5000;

app.use(cors());

// console.log(__dirname);
// console.log(path.join(__dirname, '../frontend', 'build'));
// console.log(path.join(__dirname, '../frontend', 'build', 'index.html'));

const topicRouter = require('./routes/topic_routes');
const tagRouter = require('./routes/tag_routes');
const blogRouter = require('./routes/blog_routes');

app.use('/api/topics', topicRouter);
app.use('/api/tags', tagRouter);
app.use('/api/blogs', blogRouter);

// ! COMMENT THIS CODE BLOCK IN DEV MODE
// if (process.env.NODE_ENV === 'production') {

// }

app.use(express.static(path.join(__dirname, '../frontend', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`=========={CREATED SERVER AT PORT ${PORT}}==========`);
  process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at:', p, 'reason:', reason);
    process.exit(1);
  });
});
