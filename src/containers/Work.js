import React from 'react';
import GetContent from 'Api/GetContent';
import PageWithContent from 'Helpers/hocs/PageWithContent';
import TitleAndText from 'Elements/TitleAndText/TitleAndText';
import WorkBlock from 'Elements/WorkBlock/WorkBlock';
import ParseHtml from 'Helpers/ParseHtml';

class WorkComponent extends React.Component {
  constructor(props) {
    super(props);
    document.body.className = 'theme-starship';
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
        { entries &&
          <div className="grid">
            {

              e.map((row, index) => {
                const {
 title, date, url, brief,
} = row.fields;
                return (
                  <div className="grid__col" key={index}>
                    <WorkBlock title={title} date={date} url={url}>
                      { ParseHtml(brief) }
                    </WorkBlock>
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

const Work = PageWithContent(
  WorkComponent,
  {
    page: 'work',
    entries: 'workBlock',
  },
);

export default Work;
