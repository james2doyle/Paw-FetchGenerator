/**
 * Template builder
 *
 * @param {Object} request
 * @param {string} request.name
 * @param {string} request.url
 * @param {Object} request.body
 * @param {string} request.method
 * @param {Object} request.headers
 *
 * @returns {string}
 */
const template = function (request) {
    const { name, url, body, method, headers } = request;

    const data = {
        method,
        headers
    };

    const contentType = request.getHeaderByName('Content-Type');

    if (body.length > 0 && method !== 'GET') {
        const typeMapper = {
            'application/json': request.jsonBody,
            'application/x-www-form-urlencoded': request.getUrlEncodedBody(),
            'multipart/form-data': request.getMultipartBody(),
        };

        data.body = typeMapper[contentType] || body;
    }

    let fetchRequest = JSON.stringify(data, null, 6);

    // how to handle the response
    const callbackMethod = request.getHeaderByName('Accept') === 'application/json' ? 'json' : 'text';

    return `// ${name} (${method} ${url})
fetch("${url}", ${fetchRequest})
.then((res) => res.${callbackMethod}())
.then(console.log.bind(console))
.catch(console.error.bind(console));

`;
};

module.exports = template;
