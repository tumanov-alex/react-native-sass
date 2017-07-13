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

      // console.log('=========================================')
      // console.log(styleTransformed)
      // console.log('-----------------')
      // console.log(styleTransformed.value.properties)
      if (styleName === 'customProp') {
        console.log(styleTransformed)
      }
      styleTransformedProps.push(styleTransformed);
      mainStyleNode.push(styleTransformed);
      delete mainStyleNode[styleName];
    } else {
      styleTransformedProps.push(prop);
    }
  });

  // console.log(styleTransformedProps)
  return styleTransformedProps;
}

export default function ({ types: t }) {
  return {
    visitor: {
      CallExpression(call) {
        const callee = call.node.callee;

        if (t.isMemberExpression(callee.type) &&
          (callee.object.name === 'StyleSheet' && callee.property.name === 'create')
        ) {
          const styleNode = call.node.arguments[0].properties;

          styleNode.map((node) => {
            const name = node.key.name;
            const props = node.value.properties;

            flattenStyles(name, props, styleNode);
          });
        }
      },
      JSXElement(el) {
        // console.log(el.node.openingElement)
      },
      JSXAttribute(path) {
        console.log(path.node)
        console.log('=========================================')
      },
    },
  };
}
