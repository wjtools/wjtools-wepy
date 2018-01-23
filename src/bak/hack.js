// import device from 'device'

// 动态设置当前页面的标题
export default function setTitle(title) {
  document.title = title
  // if (device.os.ios) {
  //   var $iframe = $('<iframe src="about:blank" style="display:none;"></iframe>').on('load', function() {
  //     setTimeout(function() {
  //       $iframe.off('load').remove();
  //     }, 0);
  //   }).appendTo('body');
  // }
}