const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,

  onlyId: state => state.user.userId,
  name: state => state.user.pickName,
  phone: state => state.user.userPhone,
  signature: state => state.user.signature,
  avatar: state => state.user.userIcon,
  favicon: state => state.user.favicon,
  email: state => state.user.email,
}
export default getters