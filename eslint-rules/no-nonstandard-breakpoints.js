const { breakpoints } = require('../config/breakpoints');

const breakpointValues = Object.values(breakpoints);

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow non-standard breakpoints in media queries and style code',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      nonStandard: 'Non-standard breakpoint value "{{value}}" used. Use only values from /config/breakpoints.ts.'
    },
    schema: [],
  },
  create(context) {
    function checkLiteral(node) {
      if (typeof node.value === 'string' && node.value.includes('px')) {
        const pxMatch = node.value.match(/(\d{2,4})px/);
        if (pxMatch && !breakpointValues.includes(pxMatch[0])) {
          context.report({
            node,
            messageId: 'nonStandard',
            data: { value: pxMatch[0] },
          });
        }
      }
    }
    return {
      Literal: checkLiteral,
      TemplateElement(node) {
        checkLiteral(node);
      },
    };
  },
};
