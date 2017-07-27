var http = require('http')
var fs = require('fs')
var url = require('url')

//console.log(Object.keys(http))
var port = process.env.PORT || 8888;

var server = http.createServer(function(request, response){

  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query
  var method = request.method

  //从这里开始看，上面不要看
  if(method === 'GET'){
      if(path === '/'){  // 如果用户请求的是 / 路径
          var string = fs.readFileSync('./index.html');
          response.setHeader('Content-Type', 'text/html;charset=utf-8');
          response.end(string);
      }else if(path === '/xxx'){
          response.setHeader('Content-Type', 'text/html;charset=utf-8');
          if(query.yyy === '1' & query.zzz === '2'){
              response.end('Hello AJAX');
          }else{
              response.statusCode = 404;
              response.end('请求路径错误');
          }

      }else{
          response.statusCode = 404;
          response.setHeader('Content-Type', 'text/html;charset=utf-8');
          response.end('找不到对应的路径，你需要自行修改 index.js');
      }
  } else if (method === 'POST') {
      if(path === '/login'){
          response.setHeader('Content-Type', 'text/html;charset=utf-8')
          readBody(request, function (body) {
              let parts = body.split('&');
              let username = parts[0].split('=')[1];
              let password = parts[1].split('=')[1];
              let errors = {};
              //检查用户名信息
              if (username.trim() === '') {
                  errors['username'] = '用户名不能为空';
              }else if(username === 'greygao'){
                  //检查密码信息
                  if(password === '123456'){
                      response.end(`你好，${username}。`)
                  }else if(password === ''){
                      errors['password'] = '密码不能为空';
                  }else{
                      errors['password'] = '密码错误';
                  }
              }else{
                  errors['username'] = '用户名不存在';
              }

              if (password === '') {
                  errors['password'] = '密码不能为空';
              }

              //检查添加错误对象
              if (Object.keys(errors).length > 0) {
                  response.statusCode = 412;
                  var string = JSON.stringify({errors:errors});
                  response.end(string);
              }else{
                  response.statusCode = 200;
                  response.end(JSON.stringify({userId:1}))
              }
          })
      }else{
          response.statusCode = 404;
          response.setHeader('Content-Type', 'text/html;charset=utf-8');
          response.end('出错了少年！')
      }
  }
  // 代码结束，下面不要看
  console.log(method + ' ' + request.url)
})

server.listen(port)
console.log('监听 ' + port + ' 成功，请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)

function readBody(request, callback) {
    let body = [];
    request.on('error',(err) => {
      console.error(err);
    }).on('data',(chunk) => {
        body.push(chunk);
    }).on('end',() => {
      body = Buffer.concat(body).toString();
      callback.call(null,body)
    })
}