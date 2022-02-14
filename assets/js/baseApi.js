$.ajaxPrefilter(function(options){
    // console.log(options.url);
   options.url  = "http://www.liulongbin.top:3008"+options.url
    //添加同意的权限控制 
   if(options.url.indexOf('/my/') != -1){
        options.headers = {
            Authorization: localStorage.getItem("token") || ''
        }
    }
})