import React from 'react';
import ParseHtml from 'Helpers/ParseHtml';
import GetContent from 'Api/GetContent';
import TitleAndText from 'Elements/TitleAndText/TitleAndText';
import { FadeIn, ScaleIn } from 'Helpers/AnimateApi';

class Contact extends React.Component {
    
    constructor(props) {
        super(props);
        document.body.className = 'theme-french';

        const pageContent = {},
              blocksContent = []

        this.state = {
            pageReady: false,
            pageContent: pageContent,
            blocksContent: blocksContent
        }
    }

    componentDidMount() {

        this.props.showLoader(true);

        let getPageContent = GetContent.getPageContent('contact')

        getPageContent.then((data) => {
            
            let { title, content } = data['fields'];

            this.setState({
                pageReady : true,
                pageContent : {
                    title : title,
                    content : content,
                }
            });

            this.props.showLoader(false);
        });

    }

    render() {

        const { title, content } = this.state.pageContent;

        return(
            <section>
                <FadeIn in={this.state.pageReady}>
                    <TitleAndText title={title}>
                        { ParseHtml(content) }
                    </TitleAndText>
                </FadeIn>
            </section>
        )
    }
}

export default Contact;