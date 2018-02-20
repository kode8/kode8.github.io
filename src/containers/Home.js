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

        document.body.className = 'theme-radical';

        const data = {};

        this.state = {
            pageReady: false,
            page: data,
        }
    }

    componentDidMount() {

        this.props.showLoader(true);

        GetContent.getPageContent('home').then((data) => {

            const { title, content, signature } = data.fields;
            
            this.props.showLoader(false);

            this.setState(()=>{
                return {
                    pageReady : true,
                    page: {
                        title: title,
                        content: content,
                        signature: signature
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