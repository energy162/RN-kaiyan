function switchTab(){
  const config = {};
  return {
    type: 'SWITCHTAB',
    config,
  }
}

module.exports = {switchTab};
