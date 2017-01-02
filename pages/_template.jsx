import React from 'react';
import { RouteHandler, Link } from 'react-router';
import { Container, Grid, Breakpoint, Span } from 'react-responsive-grid';
import { rhythm, fontSizeToMS } from '../utils/typography'
import { config } from 'config';

import Header from '../components/Header.jsx'
import '../css/styles.css';

class Template extends React.Component {
  render() {

    const { location, children } = this.props

    const header = <Header type="main" title={config.authorName} path={location.pathname} />;

    return (
      <Container>
        <Grid columns={12} style={{padding: `${rhythm(1/2)} ${rhythm(1/2)}`}}>
          <Breakpoint minWidth={700} widthMethod="componentWidth">

            <Span columns={3}>
              <div style={{
                padding: '1rem',
                whiteSpace: 'pre-wrap'
              }}>{header}</div>
            </Span>

            <Span columns={9} last>
              <div style={{
                padding: '1rem'
              }}>
                {this.props.children}
              </div>
            </Span>

          </Breakpoint>
          <Breakpoint maxWidth={700} widthMethod="componentWidth">

            <div style={{
              padding: '1rem',
              whiteSpace: 'pre-wrap'
            }}>{header}</div>

            <hr />

            <div style={{
              padding: '1rem'
            }}>
              {this.props.children}
            </div>

          </Breakpoint>
        </Grid>
      </Container>
    );
  }
}

export default Template;
