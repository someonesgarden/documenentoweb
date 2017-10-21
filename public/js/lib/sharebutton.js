//var shareUrl = 'http://docu-memento.com/'; // 現在のページURLを使用する場合 location.href;
//var shareText = 'ドキュ・メメント映画祭へようこそ'; // 現在のページタイトルを使用する場合 document.title;


// SNSボタンを追加するエリア
var snsArea = document.getElementById('sns-area');


generate_share_button(snsArea, shareUrl, shareText);

// シェアボタンを生成する関数
function generate_share_button(area, url, text) {
    // シェアボタンの作成
    var twBtn = document.createElement('div');
    twBtn.className = 'twitter-btn';
    var fbBtn = document.createElement('div');
    fbBtn.className = 'facebook-btn';
    var liBtn = document.createElement('div');
    liBtn.className = 'line-btn';

    // 各シェアボタンのリンク先
    var twHref = 'https://twitter.com/share?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url);
    var fbHref = 'http://www.facebook.com/share.php?u=' + encodeURIComponent(url);
    var liHref = 'https://line.me/R/msg/text/?' + encodeURIComponent(text) + ' ' + encodeURIComponent(url);

    // シェアボタンにリンクを追加
    var clickEv = 'onclick="popupWindow(this.href); return false;"';
    var twLink = '<a href="' + twHref + '" ' + clickEv + ' class="share_button_a"><p class="twitter_icon"></p></a>';
    var fbLink = '<a href="' + fbHref + '" ' + clickEv + 'class="share_button_a"><p class="fb_icon"></p></a>';
    var liLink = '<a href="' + liHref + '" target="_blank" class="share_button_a"><p class="ln_icon"></p></a>';
    twBtn.innerHTML = twLink;
    fbBtn.innerHTML = fbLink;
    liBtn.innerHTML = liLink;

    // シェアボタンを表示
    area.appendChild(twBtn);
    area.appendChild(fbBtn);
    area.appendChild(liBtn);
}

// クリック時にポップアップで表示させる関数
function popupWindow(url) {
    window.open(url, '', 'width=580,height=400,menubar=no,toolbar=no,scrollbars=yes');
}
