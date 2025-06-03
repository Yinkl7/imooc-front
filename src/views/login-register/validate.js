export const validateUserName = (value) => {
  if(!value) {
    return '用户名为必填'
  }

  if(value.length < 3 || value.length > 12) {
    return '用户名应该在 3-12 位之间'
  }

  return true
}

export const validatePassword = (value) => {
  if(!value) {
    return '密码为必填'
  }

  if(value.length < 6 || value.length > 12) {
    return '密码应该在 6-12 位之间'
  }

  return true
}
