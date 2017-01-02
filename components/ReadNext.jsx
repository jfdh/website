import React from 'react';
import { Link } from 'react-router';
import { prune, include as includes } from 'underscore.string';
import find from 'lodash/collection/find';
import { rhythm, fontSizeToMS } from 'utils/typography'

class ReadNext extends React.Component {
  render() {
    let body, html, nextPost, readNext, breakpoint;
    readNext = this.props.post.readNext;

    if (readNext != null) {
      nextPost = find(this.props.pages, function(page) {
        return includes(page.path, readNext.slice(1, -1));
      });
    }

    if (!nextPost) {
      return React.createElement("noscript", null);
    } else {
      html = nextPost.data.body;

      // break at, and strip html tags
      let newline = html.indexOf('</');
      breakpoint = newline > 150 || newline < 0 ? 150 : newline;
      body = prune(html, breakpoint);
      body = body.replace(/<[^>]*>/g, '');

      return (
        <div>
          <hr />
          <h6 style={{margin: '15px 0'}}>Read next</h6>
          <h3>
            <Link
              to={nextPost.path}
              query={{readNext: true}}
              className="text-link__decorate">
              {nextPost.data.title}
            </Link>
          </h3>
          <p>{body}</p>
          <hr />
        </div>
      );
    }
  }
}

export default ReadNext;
