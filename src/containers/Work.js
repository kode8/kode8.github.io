import React from 'react';
import ParseHtml from 'Helpers/ParseHtml';
import GetContent from 'Api/GetContent';
import TitleAndText from 'Elements/TitleAndText/TitleAndText';
import WorkBlock from 'Elements/WorkBlock/WorkBlock';
import { FadeIn, ScaleIn } from 'Helpers/AnimateApi';

class Experience extends React.Component {
    
    constructor(props) {
        super(props);
        document.body.className = 'theme-starship';

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

        let getPageContent = GetContent.getPageContent('work'),
            getEntries = GetContent.getEntries({
                'content_type': 'workBlock', 
                'order' : 'sys.createdAt'
            });

        Promise.all([getPageContent, getEntries]).then((data) => {
            
            let { title, content } = data[0]['fields'];
            let { items } = data[1];

            this.setState({
                pageReady : true,
                pageContent : {
                    title : title,
                    content : content,
                },
                blocksContent : items,
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
                    <hr />
                    <div className="grid">
                        {
                            this.state.blocksContent.map((row, index) => {
                                const { title, date, url, brief } = row.fields;
                                return ( 
                                    <div className="grid__col" key={index}>
                                        <WorkBlock title={title} date={date} url={url}>
                                        { ParseHtml(brief) }
                                        </WorkBlock>
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