const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,

  onlyId: state => state.user.onlyId,
  name: state => state.user.name,
  phone: state => state.user.phone,
  signature: state => state.user.signature,
  avatar: state => state.user.avatar,
  favicon: state => state.user.favicon,
  email: state => state.user.email,
  roleId: state => state.user.roleId,

  addRouters: state => state.permission.addRouters,
  menus: state => state.permission.menus
}
export default getters