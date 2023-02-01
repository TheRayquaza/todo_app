
const make_response = (req, res, next) => {
    res.body = {};
    next();
}

export default make_response;