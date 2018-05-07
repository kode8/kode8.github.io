import React from 'react';
import PageWithContent from 'Helpers/hocs/PageWithContent';
import ParseHtml from 'Helpers/ParseHtml';
import TitleAndText from 'Elements/TitleAndText/TitleAndText';

class ContactComponent extends React.Component {
  constructor(props) {
    super(props);
    document.body.className = 'theme-french';
  }

  render() {
    const { title, content } = this.props.content;

    return (
      <TitleAndText title={title}>
        { ParseHtml(content) }
      </TitleAndText>
    );
  }
}

const Contact = PageWithContent(
  ContactComponent,
  {
    page: 'contact',
  },
);

export default Contact;
