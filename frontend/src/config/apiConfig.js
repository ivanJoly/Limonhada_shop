const prod = {
    url: 'https://limonahada-shop.herokuapp.com'
}
const dev = {
    url: 'http://localhost:5000'
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;