import React from 'react';
import moment from 'moment';
import DocumentTitle from 'react-document-title';
import ReadNext from '../components/ReadNext';
import { config } from 'config';
import catchLinks from 'catch-links';

import '../css/zenburn.css';
import '../css/brusselstogether.css';

module.exports = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {
    const _this = this;
    catchLinks(this.refs.markdown, function(href) {
      _this.context.router.push(href);
    });
  },

  render: function() {
    const { route } = this.props;
    const post = route.page.data;
    const htmlFromMarkdown = route.page.data.body;

    let datePosted;
    if (route.path.match(/\/blog\//)) {
      datePosted = (
        <em className="article-title__date">
          Posted {moment(post.date).format('MMMM D, YYYY')}
        </em>
      );
    }

    return (
      <DocumentTitle title={`${post.title} | ${config.blogTitle}`}>
        <div className="article">
          <div className="article-title">
            <h1>{post.title}</h1>
            { datePosted }
          </div>

          <div
            ref="markdown"
            className="article-body"
            dangerouslySetInnerHTML={{__html: htmlFromMarkdown}}/>

          <div className="article-footer">
            <ReadNext post={post} pages={route.pages}/>
          </div>

        </div>
      </DocumentTitle>
    );
  }
});
