import { parse } from 'babylon';
import {
  objectProperty,
  identifier,
  objectExpression,
} from 'babel-types';
import generate from 'babel-generator';

function flattenStyles(styleName, styleProps, mainStyleNode) {
  const styleTransformedProps = [];

  styleProps.map((prop) => {
    const stylePropName = prop.key.name;

    if (prop.value.type === 'ObjectExpression' && stylePropName !== 'transform') {
      const styleTransformedName = `${styleName}_${stylePropName}`;

      const styleTransformed = objectProperty(
        identifier(styleTransformedName),
        objectExpression(
          flattenStyles(styleTransformedName, prop.value.properties, mainStyleNode)));

      mainStyleNode.push(styleTransformed);
      // console.log(styleName)
      // console.log('=========================================')

      // delete mainStyleNode[styleName];
      delete styleProps[styleName]
    }
  });

  return styleTransformedProps;
}

export default function ({ types: t }) {
  return {
    visitor: {
      CallExpression(call) {
        const callee = call.node.callee;

        if (callee.type === 'MemberExpression' &&
          (callee.object.name === 'StyleSheet' && callee.property.name === 'create')
        ) {
          const styleNode = call.node.arguments[0].properties;

          styleNode.map((node) => {
            const name = node.key.name;
            const props = node.value.properties;

            flattenStyles(name, props, styleNode);
          });
          styleNode.map(node => {
            // console.log(node.key.name)
            // console.log('----------------------------')
            // console.log(node.value.properties)
            // console.log('=========================================')
          })
        }
      },
      JSXElement(el) {
        const attr = el.node.openingElement.attributes;
        const style = attr.find(node =>
          node.name.name === 'style');

        // console.log(style && style.value.expression.property.name)

        // console.log(el.node.openingElement.attributes.length &&
        // el.node.openingElement.attributes[0].value.expression)
        // console.log('=========================================')
      },
      JSXAttribute(path) {
        // console.log(path)
        // console.log('=========================================')
      },
    },
  };
}
