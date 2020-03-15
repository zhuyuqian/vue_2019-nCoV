export const jsonp = function (url, cbKey = 'callback', data = {}) {
    return new Promise((resolve, reject) => {
        // 根据url是否带有参数决定参数前缀符
        let paramFlag = url.indexOf('?') === -1 ? '?' : '&'
        // 定义回调函数名
        let callbackName = `myJson_${new Date().getTime()}`
        // 组装带回调函数和请求参数的url
        url += `${paramFlag}${cbKey}=${callbackName}`
        if (data) {
            for (let i in data) {
                url += `&${i} = ${data[i]}`
            }
        }
        // 动态创建script标签 在回调函数中需要对该动态创建的标签进行删除
        let script = document.createElement('script')
        script.src = url
        // jsonp返回数据到回调函数 需要注意 回调函数必须绑定在window上 且接受数据完毕后要进行回调函数的删除
        window[callbackName] = (res) => {
            // 删除绑定在window上的回调函数
            delete window[callbackName]
            // 删除动态创建的script标签
            document.body.removeChild(script);
            res ? resolve(res) : reject('没有返回数据');
        }
        // 处理动态加载script标签异常的情况
        script.addEventListener('error', () => {
            delete window[callbackName]
            document.body.removeChild(script)
            reject('script资源加载失败')
        }, false)
        // 添加js节点到document上，开始请求
        document.body.appendChild(script)
    })
}