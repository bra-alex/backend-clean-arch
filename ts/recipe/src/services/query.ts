export default function getRecipe(query: { name?: any }) {
  if (Object.keys(query).length === 0) {
    return {}
  }

  const reg = new RegExp(query.name, 'i')
  return { name: reg }
}
