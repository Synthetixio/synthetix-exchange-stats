const cache = require('memory-cache');
const synthetixJs = require('../utils/snxJS-connector');

const CACHE_LIMIT = 5 * 1000 * 60; // 5 minutes
const CACHE_KEY = 'totalSupply';

const getTotalSupply = async (req, res) => {
	const {
		snxJS: { Synthetix },
	} = synthetixJs;

	if (cache.get(CACHE_KEY)) {
		return res.send({ totalSupply: cache.get(CACHE_KEY) });
	}
	try {
		const totalSupply = await Synthetix.totalSupply();
		return res.send({ totalSupply: cache.put(CACHE_KEY, totalSupply / 1e18, CACHE_LIMIT) });
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

module.exports = getTotalSupply;
