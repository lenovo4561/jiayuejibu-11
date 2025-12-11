const fs = require('fs')
const path = require('path')

function updatePaths(content) {
  // 更新图片路径
  content = content.replace(
    /src="\/assets\/img\//g,
    'src="/pkg_main/assets/img/'
  )
  content = content.replace(
    /url\('\/assets\/img\//g,
    "url('/pkg_main/assets/img/"
  )
  // 更新路由路径
  content = content.replace(
    /uri:\s*'\/pages\/Web'/g,
    "uri: '/pkg_main/pages/Web'"
  )
  content = content.replace(
    /uri:\s*"\/pages\/Web"/g,
    'uri: "/pkg_main/pages/Web"'
  )
  content = content.replace(/uri:\s*'pages\/Web'/g, "uri: 'pkg_main/pages/Web'")
  return content
}

const files = [
  'src/pkg_main/pages/Demo/Steps.ux',
  'src/pkg_main/pages/Demo/index.ux',
  'src/pkg_main/pages/Demo/Mine.ux',
  'src/pkg_main/pages/Demo/Health.ux',
  'src/pkg_main/pages/Demo/CheckIn.ux',
  'src/pkg_main/pages/Web/index.ux'
]

const basePath = path.join(__dirname, '..')

files.forEach(file => {
  const filePath = path.join(basePath, file)
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8')
    content = updatePaths(content)
    fs.writeFileSync(filePath, content, 'utf8')
    console.log('Updated: ' + file)
  } else {
    console.log('Not found: ' + file)
  }
})
console.log('Done!')
