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
        <h2>Why don't you do it?</h2>
        <iframe className="youtube" width="560" height="315" src="https://www.youtube.com/embed/wVTx3OorJtc" frameBorder="0" allowFullscreen></iframe>
        <ul className="posts">
          {pageLinks}
        </ul>
        <p>We all have something to contribute to make Brussels a better city. But it's still too hard to get things done.</p>
        <p>BrusselsTogether lets you create a virtual association so that you can get started in no time and focus on what you want to do to improve Brussels. No paperwork needed.<br />
        <a href="/services/">Find out more</a>.</p>
        <p>
        We curate a <b>monthly newsletter</b> with the best initiatives happening in Brussels.<br /><a href="http://brusselstogether.us15.list-manage.com/subscribe?u=bc4a7d8ae7c38b1bb4ae32404&id=08f5b0187e">Sign up for the newsletter</a>.
        </p>
        <p>
        We also host a <b>monthly meetup</b> where we showcase 3 great initiatives and give you the opportunity to share yours.<br /><a href="https://meetup.com/BrusselsTogether">Join our Meetup Group</a>.
        </p>
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
