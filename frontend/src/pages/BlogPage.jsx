import React, { useState, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './blog.scss';

const BlogPage = forwardRef((props, ref) => {
  const { article } = props;
  console.log(article);
  const [display, setDisplay] = useState(false);
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true);

  // console.log(article.title);
  // console.log(ref);

  useImperativeHandle(ref, () => {
    return {
      showBlog: () => open(),
      hideBlog: () => close(),
    };
  });

  function open() {
    setDisplay(true);
    setLoading(true);
    document.body.style.overflow = 'hidden';
    console.log('Blog opened');

    axios({
      method: 'GET',
      url: `/api/blogs?link=${article.link}`,
    })
      .then((res) => {
        setLoading(false);
        setBlog(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function close() {
    setDisplay(false);
    setLoading(true);
    document.body.style.overflow = 'unset';
    console.log('Blog closed');
  }

  //console.log(props);

  if (display) {
    return ReactDOM.createPortal(
      <div className='blog-wrapper'>
        <div className='blog-backdrop' />
        <article className='blog-content py-5'>
          <header className='container'>
            <h1 className='py-2'>{article.title}</h1>
            <p className='text-secondary'>
              Written by {article.author} on {article.date}
            </p>
          </header>
          <main className='container'>
            <img src={article.image} alt='Loading' />
            <p className='text-dark'>{blog}</p>
          </main>
          <footer className='container'>
            <button className='btn btn-outline-dark btn-lg btn-block mb-5' onClick={close}>
              {loading ? (
                <div>
                  <i className='fa fa-spinner fa-pulse'></i>
                  Crawling medium.com , tap to cancel
                </div>
              ) : (
                'Go Back'
              )}
            </button>
          </footer>
        </article>
      </div>,
      document.getElementById('blog-root')
    );
  } else {
    return null;
  }
});

export default BlogPage;
