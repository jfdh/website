import React from 'react';
import Typography from 'typography';
import DocumentTitle from 'react-document-title';
import { prefixLink } from 'gatsby-helpers'
import { GoogleFont, TypographyStyle } from 'utils/typography'

class Html extends React.Component {
  render() {
    let title;
    title = DocumentTitle.rewind();
    if (this.props.title) {
      title = this.props.title;
    }

    let cssLink
    if (process.env.NODE_ENV === 'production') {
      cssLink = <link rel="stylesheet" href={prefixLink('/styles.css')} />
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <meta name='viewport' content='user-scalable=no width=device-width, initial-scale=1.0 maximum-scale=1.0'/>
          <meta name="description" content={this.props.description} />
          <title>{title}</title>
          <link rel="shortcut icon" href="/favicon.png"/>

          {cssLink}

          <GoogleFont />
          <TypographyStyle />
        </head>
        <body className="landing-page">
          <div id="react-mount" dangerouslySetInnerHTML={{__html: this.props.body}} />
          <script src={prefixLink("/bundle.js")}/>
        </body>
      </html>
    );
  }
}

Html.defaultProps = { body: "" };

export default Html;
