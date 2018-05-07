
import React from 'react';

const createMarkup = (html) => {
    return {__html: html};
};

const parseHTML = (html) => {
return <div dangerouslySetInnerHTML={createMarkup(html)} />
}

export default parseHTML;