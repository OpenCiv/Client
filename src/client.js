import * as sapper from '@sapper/app';
import axios from 'axios';

axios.defaults.baseURL = 'http://openciv.eu/dev/';
sapper.start({
	target: document.querySelector('#sapper')
});