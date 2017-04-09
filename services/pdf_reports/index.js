const jsreport = require('jsreport')

const render = (res, template) => {
    jsreport
        .render(template)
        .then(out => out.stream.pipe(res))
        .catch(e => res.end(e.message))
}

module.exports = render