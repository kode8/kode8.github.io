import React from 'react'
import { NavLink, withRouter} from 'react-router-dom' // Nav link adds some extra properties ie activeClassName
import GetContent from 'Api/GetContent'

import './nav.scss'

class Nav extends React.Component {

    constructor(props) {
        super(props);

        this.state = {  
            navItems: []
        }

        const { match, location, history } = props
    }

    componentDidMount() {
        this.getNavItems()
    }

    getNavItems() {
        GetContent.getEntries({
            'content_type': 'navigation'
        }).then((results) => {

            let items = results.items,
                navItems = [];

            items.map((item, index)=> {
                const { slug, title, order } = item.fields;
                navItems.push({
                    slug: slug,
                    title: title,
                    order: order,
                })
            })

            let orderedItems = navItems.sort( (a, b) => {
                return a['order'] - b['order'];
            });

            this.setState(()=>{
                return {
                    navItems : orderedItems,
                    navLoaded: true
                }
            });

        });
    }

    render() {

        let navContainer = `${this.props.classNamePrefix}-nav`,
            navLink = `${navContainer}__item-link`,
            navLinkActive = `${navLink}--active`

        return (     
            <div>
                <ul className={ navContainer }>
                { 
                    this.state.navItems.map( (value, index) => {
                        return (
                            <li key={ index }>
                                <NavLink 
                                    exact
                                    to={value.slug} 
                                    className={navLink} 
                                    activeClassName={navLinkActive}
                                    >
                                    <span>{value.title}</span>
                                </NavLink>
                            </li>
                        );
                    })
                }
                </ul>
                { this.props.children }
            </div>
        )
    }
}

const NavWithRouter = withRouter(Nav)

export default NavWithRouter;