import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Post from '../components/Post';

import './app.scss';

const HomePage = () => {
  const [tag, setTag] = useState('');
  const [relatedTags, setRelatedTags] = useState([]);
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchHistory, setSearchHistory] = useState([]);
  const [formData, setFormData] = useState('');
  const [timeTaken, setTimeTaken] = useState(0);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    if (tag && tag !== '') {
      let cancel;
      let start = new Date();
      let end;
      setLoading(true);
      axios({
        method: 'GET',
        url: `/api/tags/${tag}?page=${page}`,
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          // console.log(res.data);

          setRelatedTags(res.data.relatedTags);
          setArticles((prevArticles) => {
            return [...prevArticles, ...res.data.articles];
          });
          setLoading(false);
          end = new Date();
          setTimeTaken(end - start);
          // setArticles(res.data.articles);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            return;
          }
        });

      return () => cancel();
    }
  }, [page]);

  useEffect(() => {
    if (tag && tag !== '') {
      // console.log(tag);
      let start = new Date();
      let end;
      setPage(1);
      setArticles([]);
      setLoading(true);
      axios({
        method: 'GET',
        url: `/api/tags/${tag}?page=${page}`,
      })
        .then((res) => {
          // console.log(res.data);
          setRelatedTags(res.data.relatedTags);
          setArticles(res.data.articles);
          setLoading(false);
          setSearchHistory((prevTag) => {
            return [...prevTag, tag];
          });
          end = new Date();
          setTimeTaken(end - start);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            return;
          }
        });
    }
  }, [tag]);

  function handleSubmit(event) {
    event.preventDefault();
    setTag(formData);
    // console.log('handleSubmit : ' + formData);
  }

  function handleChange(event) {
    // setTag(event.target.value);
    setFormData(event.target.value);
    // console.log('handleChange : ' + event.target.value);
  }

  return (
    <div id='app'>
      <header className='bg-dark '>
        <div className='container'>
          <div className='row header-content'>
            <i className='fa fa-medium col-lg-3 col-md-1 col-sm-1 col-1'></i>
            <form onSubmit={handleSubmit} className='col-lg-5  col-md-7 col-sm-7 col-7'>
              <div className='input-group'>
                <input
                  className='p-1 form-control '
                  type='text'
                  value={formData}
                  onChange={handleChange}
                  list='searchHistory'
                  placeholder='Search for tags'
                />
                <datalist id='searchHistory'>
                  {searchHistory.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}
                </datalist>
                <div className='input-group-append'>
                  <button className='btn btn-outline-light' type='submit'>
                    <i className='fa fa-search '></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </header>
      <main className='container'>
        {tag === '' ? <h2>Get started by searching for a tag</h2> : null}
        <div className='related-tags m-1'>
          {relatedTags.length !== 0 && <h4>Related Tags :</h4>}
          {relatedTags &&
            relatedTags.map((tag, index) => (
              <span
                onClick={() => {
                  setTag(tag);
                  setFormData(tag);
                }}
                className='btn btn-outline-dark m-2 shadow-sm'
                key={index}
              >
                {tag}
              </span>
            ))}
        </div>
        <div className='article-container'>
          {articles.map(
            (article, index) => article && article.title && <Post key={index} article={article} />
          )}
          {loading ? (
            tag === '' ? null : (
              <div className='post-loading-screen'>
                <i className='fa fa-spinner fa-pulse'></i>
                <h2>Getting things ready</h2>
              </div>
            )
          ) : (
            <div className='alert alert-success mt-4'>
              Loaded Blogs in {timeTaken / 1000} seconds
            </div>
          )}
        </div>
      </main>
      <footer className='container my-3'>
        <button className='btn btn-dark btn-lg btn-block' onClick={() => setPage(page + 1)}>
          {loading ? (
            tag === '' ? (
              'Waiting for you to search something'
            ) : (
              <div>
                <i className='fa fa-spinner fa-pulse'></i>
                Crawling medium.com
              </div>
            )
          ) : (
            'Next 10 Blogs'
          )}
        </button>
      </footer>
    </div>
  );
};

export default HomePage;
