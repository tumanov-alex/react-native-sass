export default function ({ types: t }) {
  return {
    visitor: {
      MemberExpression (path) {
        const node = path.node;

        if (node.object.name === 'StyleSheet' && node.property.name === 'create') {
          console.log(node.object.name)
          console.log(node.property.name)

          // "acorn" is wrong, what is right? https://astexplorer.net/
          console.log('\n=========================================')
        }
      },
    },
  };
}
