/**
 * The generator
 */
const FetchGenerator = function () {
    /**
     * Generate function
     *
     * @param {Object} context
     * @param {Array<Object>} requests
     * @param {Object} options
     *
     * @returns {string}
     */
    this.generate = function (context, requests) {
        const template = require('./template');

        const reqArray = Array.isArray(requests) ? requests : [requests];

        return reqArray.reduce((result, request) => {
            return result += template(request);
        }, '');
    };
};

FetchGenerator.identifier = 'com.james2doyle.FetchGenerator';
FetchGenerator.title = 'Fetch Generator';
FetchGenerator.fileExtension = 'js';
FetchGenerator.languageHighlighter = 'javascript';
registerCodeGenerator(FetchGenerator);
