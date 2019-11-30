import * as sapper from '@sapper/app';
import axios from 'axios';

axios.defaults.baseURL = 'https://straland.com/openciv/php/';
sapper.start({
	target: document.querySelector('#sapper')
});