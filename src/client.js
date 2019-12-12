import * as sapper from '@sapper/app';
import axios from 'axios';

axios.defaults.baseURL = 'https://openciv.eu/dev/';
sapper.start({
	target: document.querySelector('#sapper')
});
