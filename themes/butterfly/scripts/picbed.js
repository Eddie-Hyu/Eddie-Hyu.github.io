hexo.extend.tag.register('plant', function(args, content){
  var id = args[0];
  return 'http://plant.xxx.com/';
});
hexo.extend.tag.register('animal', function(args, content){
  var id = args[0];
  return 'http://animal.xxx.com/';
});
hexo.extend.tag.register('normal', function(args, content){
  var id = args[0];
  return 'https://jsd.cdn.zzko.cn/gh/Eddie-Hyu/picx-images-hosting@master/';
});
hexo.extend.tag.register('smms', function(args, content){
  var id = args[0];
  return 'https://s2.loli.net/';
});

