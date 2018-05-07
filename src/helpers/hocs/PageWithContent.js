import React from 'react';
import GetContent from 'Api/GetContent';
import { FadeIn } from 'Helpers/AnimateApi';

const PageWithContent = (WrappedComponent, getData) => class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageReady: props.state,
      content: {
        title: null,
        content: null,
        signature: null,
        entries: [],
      },
    };
  }

  componentDidMount() {
    // this.props.showLoader(true);

    const getContent = GetContent.getPageContent(getData.page) || {};
    const getEntries = GetContent.getEntries({
      content_type: getData.entries,
    });

    Promise.all([getContent, getEntries]).then((data) => {
      const { title, content, signature } = data[0].fields || {};
      const entries = data[1].items || [];

      this.setState({
        pageReady: true,
        content: {
          title,
          content,
          signature,
          entries,
        },
      });

      // this.props.showLoader(false);
    });
  }

  render() {
    return (
      <section>
        <FadeIn in={this.state.pageReady}>
          <WrappedComponent content={this.state.content} {...this.props} />
        </FadeIn>
      </section>
    );
  }
};

export default PageWithContent;
