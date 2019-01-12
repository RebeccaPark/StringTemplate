const { render } = require('./template');

function assert(a, b, msg) {
    if (a !== b) {
	throw new Error(`FAILED ${msg}: Expected ${a} to equal ${b}`);
    }
}

assert(render('{{ foo }}', { foo: 'bar' }), 'bar', 'Basic variable substitution');
assert(render('111{{ foo }}222', { foo: 'bar' }), '111bar222', 'Variable substitution with surrounding characters');
assert(render('{{ foo }}{{ abe }} {} {{ a }}', { foo: 'bar', abe: 2, a: 'flubberty' }), 'bar2 {} flubberty', 'Handles multiple variables')
assert(render('{{g}}', { g: 'bar' }), 'bar', 'Handles no spaces inside template');
assert(render('{% for value in array %}Step: {{ value }} {% endfor %} {{ value }}', { value: 'this is tricky!', array: [1, 2, 3] }),
       'Step: 1 Step: 2 Step: 3  this is tricky!', 'Implementing for loop');
/*
assert(render('{% for v in nested %}{% for n in v %}Step {{n}}, {% endfor %}{% endfor %}', { nested: [[1, 2], [3, 4]] }),
      'Step 1, Step 2, Step 3, Step 4 ');
assert(render('{% for avalue in a %}{% for bvalue in b %}Step {{avalue}}-{{bvalue}}, {% endfor %}{% endfor %}', { a: [1, 2], b: [3, 4] }),
      'Step 1-3, Step 1-4, Step 2-3, Step 2-4 ');
*/
