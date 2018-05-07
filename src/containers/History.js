import React from 'react';
import GetContent from 'Api/GetContent';
import PageWithContent from 'Helpers/hocs/PageWithContent';
import TitleAndText from 'Elements/TitleAndText/TitleAndText';
import HistoryBlock from 'Elements/HistoryBlock/HistoryBlock';
import ParseHtml from 'Helpers/ParseHtml';

class HistoryComponent extends React.Component {
  constructor(props) {
    super(props);
    document.body.className = 'theme-firered';
  }

  render() {
    const { title, content, entries } = this.props.content;
    const e = entries.sort((a, b) => b.fields.order - a.fields.order);
    return (
      <div>
        <TitleAndText title={title}>
          { ParseHtml(content) }
        </TitleAndText>
        <hr />
        {
          e &&
          <div className="grid">
            {

              e.map((row, index) => {
                const {
 company, date, jobTitle, brief,
} = row.fields;
                return (
                  <div className="grid__col" key={index}>
                    <HistoryBlock title={company} jobtitle={jobTitle} date={date} >
                      { ParseHtml(brief) }
                    </HistoryBlock>
                  </div>
                );
              })
            }
          </div>
        }
      </div>
    );
  }
}

const History = PageWithContent(
  HistoryComponent,
  {
    page: 'history',
    entries: 'historyBlock',
  },
);

export default History;
