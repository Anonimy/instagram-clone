const Posts = [
	{
		id: 1,
		url: 'https://media.self.com/photos/595f96c2427847455e70cfcc/4:3/w_728,c_limit/sansa-stark.jpg',
		numLikes: '345.234',
		description: 'Faça dos seus sonhos um objetivo :3',
		userid: 4
	},
	{
		id: 2,
		url: 'https://www.androidcentral.com/sites/androidcentral.com/files/styles/xlarge/public/article_images/2018/04/spider-man-phone.jpg?itok=i73OYxG8',
		numLikes: 2,
		description: 'Humildade em primeiro lugar',
		userid: 2
	},
	{
		id: 3,
		url: 'https://static1.squarespace.com/static/5539b16ae4b09e35ffe0d93c/t/59259c2fe6f2e13e7e31d484/1495637046142/',
		numLikes: 103,
		description: 'TA SAINDO DA JAULA O MONSTRO! BIRRRLLLL',
		userid: 3
	},
	{
		id: 4,
		url: 'https://qph.fs.quoracdn.net/main-qimg-31b8e7d1f23324439b61bde58aada54c',
		numLikes: 13,
		description: 'Falsidade é igual barata: não tenho medo, tenho nojo... #derrotado',
		userid: 1
	},
	{
		id: 5,
		url: 'https://i.pinimg.com/736x/6c/ca/99/6cca99b9a8c097c377e8d3405bbbad05--peter-baelish-aidan-gillen.jpg',
		numLikes: '981.273',
		description: 'Seja a mudança que você quer ver no mundo',
		userid: 4
	}
];

function list(userids = []) {
	return Posts.filter(post => {
		return userids.includes(post.userid);
	});
}

export default {
	list
};