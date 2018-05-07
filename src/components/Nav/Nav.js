import React from 'react';
import { NavLink, withRouter } from 'react-router-dom'; // Nav link adds some extra properties ie activeClassName
import GetContent from 'Api/GetContent';

import './nav.scss';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navItems: [],
    };

    const { match, location, history } = props;
  }

  componentDidMount() {
    this.getNavItems();
  }

  getNavItems() {
    GetContent.getEntries({
      content_type: 'navigation',
    }).then((results) => {
      const items = results.items;
      const navItems = [];

      items.map((item, index) => {
        const { slug, title, order } = item.fields;
        navItems.push({
          slug,
          title,
          order,
        });
      });

      const orderedItems = navItems.sort((a, b) => a.order - b.order);

      this.setState(() => ({
        navItems: orderedItems,
        navLoaded: true,
      }));
    });
  }

  render() {
    const navContainer = `${this.props.classNamePrefix}-nav`;
    const navLink = `${navContainer}__item-link`;
    const navLinkActive = `${navLink}--active`;

    return (
      <div>
        <ul className={navContainer}>
          {
            this.state.navItems.map((value, index) => (
              <li key={index}>
                <NavLink
                  exact
                  to={value.slug}
                  className={navLink}
                  activeClassName={navLinkActive}
                >
                  <span>{value.title}</span>
                </NavLink>
              </li>
                ))
            }
        </ul>
        { this.props.children }
      </div>
    );
  }
}

const NavWithRouter = withRouter(Nav);

export default NavWithRouter;
