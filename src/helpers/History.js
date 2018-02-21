import React from 'react'
import CreateHistory from 'history/createBrowserHistory'

const History = CreateHistory()

// Listen to history changes.
// You can unlisten by calling the constant (`unlisten()`).
// const unlisten = History.listen((location, action) => {
//   console.log(action, location.pathname, location.state);
// });

export default History