if((Browser.Platform.ios) || (Browser.Platform.android) && (Browser.safari)) {
  window.addEventListener("load",function() {
    setTimeout(function(){
    window.scrollTo(0, 1);
    }, 0);
  });
}