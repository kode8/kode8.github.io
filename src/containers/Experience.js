import React from 'react';
import ParseHtml from 'Helpers/ParseHtml';
import GetContent from 'Api/GetContent';
import TitleAndText from 'Elements/TitleAndText/TitleAndText';
import Signature from 'Elements/Signature/Signature';
import { FadeIn, ScaleIn } from 'Helpers/AnimateApi';

class Experience extends React.Component {
    
    constructor(props) {
        super(props);
        document.body.className = 'theme-radical';

        console.log(props);

        const pageContent = {},
              blocksContent = []

        this.state = {
            pageReady: false,
            pageContent: pageContent,
            blocksContent: blocksContent
        }
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
          this.props.onRouteChanged;
        }
    }

    componentDidMount() {

        const getPageContent = GetContent.getPageContent('experience');
        const getEntries = GetContent.getEntries('experienceBlock');

        Promise.all([getPageContent, getEntries]).then((data) => {
            let getPageContent = data[0],
                getEntries = data[1];

            this.setState({
                pageReady : true,
                pageContent : {
                    title : getPageContent.fields.title,
                    content : getPageContent.fields.content,
                    signature : getPageContent.fields.signature
                },
                blocksContent : getEntries.items,
            });

            this.props.pageLoading(false);
        });

    }

    render() {
        return(
            <section>
                <FadeIn in={ this.state.pageReady }>
                    <TitleAndText title={this.state.pageContent.title}>
                        { ParseHtml(this.state.pageContent.content) }
                    </TitleAndText>
                    <hr />
                    <div className="grid">
                        {
                            this.state.blocksContent.map((row, index) => {
                                return ( 
                                    <div className="grid__col" key={index}>
                                        <TitleAndText title={row.fields.title} titleSize="small" textSize="small" >
                                        { ParseHtml(row.fields.content) }
                                        </TitleAndText>
                                    </div>
                                )
                            })
                        }
                    </div>
                </FadeIn>
            </section>
        )
    }
}

export default Experience;