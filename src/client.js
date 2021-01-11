import * as sapper from '@sapper/app';
import axios from 'axios';

// Change to 'https://openciv.eu/php/' for production.
axios.defaults.baseURL = 'https://openciv.eu/dev/';
sapper.start({
	target: document.querySelector('#sapper')
});
