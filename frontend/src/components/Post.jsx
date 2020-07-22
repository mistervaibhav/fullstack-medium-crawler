import React, { forwardRef, useRef, useState } from 'react';
import BlogPage from '../pages/BlogPage';

const Post = forwardRef((props, ref) => {
  const { article } = props;

  // const [article, setArticle] = useState(initialState)

  const blogRef = useRef();
  // console.log(article.image);

  function showBlog() {
    blogRef.current.showBlog();
  }

  return (
    <div ref={ref} className='card mt-4 shadow'>
      <img className='card-img-top image' src={article.image} alt='Loading...'></img>
      <div className='card-body'>
        <h5 className='card-title'>{article.title}</h5>
        <h6 className='card-subtitle mb-2 text-muted'>{article.author}</h6>
        <p className='card-text'>{article.description}</p>
        <h6 className='card-subtitle mb-2 text-muted'>{article.date}</h6>
        <button className='btn btn-outline-dark' onClick={showBlog}>
          Read More
        </button>
      </div>
      <BlogPage ref={blogRef} article={article} />
    </div>
  );
});

export default Post;
