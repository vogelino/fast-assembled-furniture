export const mapProductToProps = ({ description, ...product }) => ({
  ...product,
  description: description?.markdown || ''
})
