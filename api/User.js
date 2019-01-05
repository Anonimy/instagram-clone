import Posts from './Posts';

const Users = [
	{
		id: 13,
		username: 'anonimy',
		password: 'a',
		follows: [1, 2, 3, 4],
		userImage: null
	},
	{
		id: 1,
		username: 'barry.allen',
		password: 'iris2',
		follows: [2, 3, 4],
		userImage: 'https://pbs.twimg.com/profile_images/907049184116793346/mer0R7Iv_400x400.jpg'
	},
	{
		id: 2,
		username: 'omiranha',
		password: '1234',
		follows: [1, 3, 4],
		userImage: 'https://timedotcom.files.wordpress.com/2016/07/spiderman-homecoming.jpg'
	},
	{
		id: 3,
		username: 'verdinhomonstrao06',
		password: 'birl',
		follows: [4],
		userImage: 'https://100grana.files.wordpress.com/2010/01/hal_jordan.jpg'
	},
	{
		id: 4,
		username: 'ruivinhaaxd',
		password: 'xoxo',
		follows: [1, 3],
		userImage: 'https://media.self.com/photos/595f96c2427847455e70cfcc/4:3/w_728,c_limit/sansa-stark.jpg'
	}
];

function getUserById(id) {
	for (let user of Users) {
		if (user.id === id) {
			return user;
		}
	}
	return null;
}

function login({ username, password }) {
	return new Promise((resolve, reject) => {
		Users.forEach(user => {
			if (user.username === username && user.password === password) {
				resolve({
					code: 1,
					result: {
						session_id: user.id
					}
				});
			}
		});
		resolve({
			code: 0,
			result: 'Wrong username or password'
		});
	});
}

function signup({ username, password }) {
	return new Promise((resolve, reject) => {
		const id = Users.length;
		const shouldInsert = !Users.some(user => user.username === username);
		if (shouldInsert) {
			Users.push({
				id,
				username,
				password
			});
			resolve({
				code: 1,
				result: {
					session_id: id
				}
			});
		}
		resolve({
			code: 0,
			result: 'User already exists'
		});
	});
}

function listPosts(userid) {
	const user = getUserById(userid);
	if (user !== null) {
		const posts = Posts.list(user.follows);
		return posts.map(post => Object.assign(post, { user: getUserById(post.userid) }));
	}
	return [];
}

export default {
	getUserById,
	login,
	signup,
	listPosts
}; 