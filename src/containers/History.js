import React from 'react';
import ParseHtml from 'Helpers/ParseHtml';
import GetContent from 'Api/GetContent';
import TitleAndText from 'Elements/TitleAndText/TitleAndText';
import HistoryBlock from 'Elements/HistoryBlock/HistoryBlock';
import { FadeIn, ScaleIn } from 'Helpers/AnimateApi';

class History extends React.Component {
    
    constructor(props) {
        super(props);
        document.body.className = 'theme-firered';

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

        let getPageContent = GetContent.getPageContent('history'),
            getEntries = GetContent.getEntries({
                'content_type': 'historyBlock', 
                'order' : 'sys.createdAt'
            });

        Promise.all([getPageContent, getEntries]).then((data) => {
            
            let { title, content, signature } = data[0]['fields'],
                { items } = data[1];

            this.setState({
                pageReady : true,
                pageContent : {
                    title : title,
                    content : content,
                    signature : signature
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
                                const { company, date, jobTitle, brief } = row.fields;
                                return ( 
                                    <div className="grid__col" key={index}>
                                        <HistoryBlock title={company} jobtitle={jobTitle} date={date} >
                                        { ParseHtml(brief) }
                                        </HistoryBlock>
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

export default History;