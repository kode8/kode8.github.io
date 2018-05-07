import React from 'react';
import GetContent from 'Api/GetContent';
import PageWithContent from 'Helpers/hocs/PageWithContent';
import TitleAndText from 'Elements/TitleAndText/TitleAndText';
import Signature from 'Elements/Signature/Signature';
import ParseHtml from 'Helpers/ParseHtml';

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    document.body.className = 'theme-radical';
  }
  render() {
    const { title, content, signature } = this.props.content;

    return (
      <TitleAndText title={title}>
        { ParseHtml(content) }
        { signature && <Signature>{ signature }</Signature> }
      </TitleAndText>
    );
  }
}

const Home = PageWithContent(
  HomeComponent,
  {
    page: 'home',
  },
);

export default Home;
