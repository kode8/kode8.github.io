import React from 'react';
import GetContent from 'Api/GetContent';
import PageWithContent from 'Helpers/hocs/PageWithContent';
import TitleAndText from 'Elements/TitleAndText/TitleAndText';
import ParseHtml from 'Helpers/ParseHtml';

class ExperienceComponent extends React.Component {
  constructor(props) {
    super(props);
    document.body.className = 'theme-gigas';
  }

  render() {
    const { title, content, entries } = this.props.content;

    return (
      <div>
        <TitleAndText title={title}>
          { ParseHtml(content) }
        </TitleAndText>
        <hr />
        { entries &&
          <div className="grid">
            {
              entries.map((row, index) => {
                  const { title, content } = row.fields;
                  return (
                    <div className="grid__col" key={index}>
                      <TitleAndText title={title} titleSize="small" textSize="small" >
                        { ParseHtml(content) }
                      </TitleAndText>
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

const Experience = PageWithContent(
  ExperienceComponent,
  {
    page: 'experience',
    entries: 'experienceBlock',
  },
);

export default Experience;
