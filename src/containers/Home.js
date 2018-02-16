import React from 'react';
import { Link } from 'react-router-dom';

import { FadeIn } from 'Helpers/AnimateApi';

import ParseHtml from 'Helpers/ParseHtml';
import GetContent from 'Api/GetContent';
import TitleAndText from 'Elements/TitleAndText/TitleAndText';
import Signature from 'Elements/Signature/Signature';

class Home extends React.Component {
    
    constructor(props) {
        super(props);
        document.body.className = 'theme-gigas';

        const data = {};

        this.state = {
            pageReady: false,
            page: data,
        }
    }

    componentDidMount() {
        GetContent.getPageContent('home').then((content) => {
            this.setState(()=>{
                this.props.pageLoading(false);
                return {
                    pageReady : true,
                    page: {
                        title: content.fields.title,
                        content: content.fields.content,
                        signature: content.fields.signature
                    }
                }
            });
        });
    }
      
    render() {
        return(
            <section>
                 <FadeIn in={ this.state.pageReady }>
                    <TitleAndText title={this.state.page.title}>
                        { ParseHtml(this.state.page.content) }
                        <Signature>{this.state.page.signature}</Signature>
                    </TitleAndText>
                </FadeIn>

            </section>
        )
    }
}

export default Home;