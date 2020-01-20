import Vue from 'vue';
import Router from 'vue-router';

import ErrorNotifications from './components/Services/ErrorNotifications';
import Calibration from './components/Services/Calibration';
import Motors from './components/Services/Motors';

Vue.use(Router);

const routes = [
	{ path: '/', component: ErrorNotifications },
	{ path: '/calibration', component: Calibration },
	{ path: '/motors', component: Motors }
];

const router = new Router({
	mode: 'history',
	routes,
	linkActiveClass: 'active'
});

export default router;
