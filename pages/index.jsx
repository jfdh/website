import React from 'react';
import moment from 'moment';
import { RouteHandler, Link } from 'react-router';
import sortBy from 'lodash/collection/sortBy';
import include from 'underscore.string/include'
import DocumentTitle from 'react-document-title';
import access from 'safe-access';
import { prefixLink } from 'gatsby-helpers';
import { rhythm, fontSizeToMS } from 'utils/typography'
import { config } from 'config';

class Index extends React.Component {

  render() {
    let draftsPage; // drafts page to go at top of list
    let contactPage;
    const pages = this.props.route.pages;

    const sortedPages = pages
      .filter(page => {
        if (page.path !== '/blog/drafts/') {
          return true;
        } else {
          draftsPage = page;
          return false;
        }
      })
      .sort(page => access(page, 'data.date'))
      .reverse();

    // insert drafts at top
    sortedPages.unshift(draftsPage);

    const pageLinks = sortedPages
      .filter(page => (page && page.file.ext === 'md' && !page.path.includes('/404')))
      .map(page => {
        const title = access(page, 'data.title') || page.path;
        console.log("page", page);
        if (page.path === '/contact/') {
          contactPage = page.data.body;
          return;
        }
        if (!page.path.match(/\/blog\//)) return;

        const date = page.data.date
          ? (<span className="posts-item__date">{moment(page.data.date).format('dddd Do MMMM YYYY')}</span>)
          : false;

        return (
          <li key={page.path} className="posts-item">
            <Link
              to={prefixLink(page.path)}
              className="posts-item__title text-link__decorate">
              {title}
            </Link>
            { date }
          </li>
        );
      });

    return (
      <DocumentTitle title={`${config.blogTitle}`}>
      <div className="content">
        <iframe className="youtube" width="560" height="315" src="https://www.youtube.com/embed/wVTx3OorJtc" frameBorder="0" allowFullscreen></iframe>
        <ul className="posts">
          {pageLinks}
        </ul>
        <h2>Join us</h2>
        <div dangerouslySetInnerHTML={{__html: contactPage}}/>
      </div>
      </DocumentTitle>
    )
  }
}

Index.propTypes = {
  route: React.PropTypes.object,
};

export default Index;
