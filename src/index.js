import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './components/HelloWorld';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<HelloWorld />, document.getElementById('content'));
registerServiceWorker();
