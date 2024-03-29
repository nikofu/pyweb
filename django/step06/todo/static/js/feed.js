google.load("feeds", "1");
function initialize(btn_num) {

    //フィードURL
    var my_urls = new Array();

    my_urls[0]='http://kancolle.doorblog.jp/index.rdf';
    my_urls[1]='https://www.jpcert.or.jp/rss/jpcert.rdf';
    my_urls[2]='http://blog.security.biglobe.ne.jp/rss/index.rdf';
    my_urls[3]='https://www.ipa.go.jp/security/rss/alert.rdf';

    var my_author = new Array();

    //my_author['http://kancolle.doorblog.jp/index.rdf']="aaaa";
    //my_author['https://www.jpcert.or.jp/rss/jpcert.rdf']="JPCERT";
    //my_author['http://blog.security.biglobe.ne.jp/rss/index.rdf']="BIGLOBE セキュリティ";
    //my_author[''] = "";

    my_author[0]="aaaa";
    my_author[1]="JPCERT";
    my_author[2]="BIGLOBE セキュリティ";
    my_author[3]="IPA";

    var num = 10; //フィードを読み込む数
    var content = document.getElementById('feed');//フィード表示場所のID名
    var all_feeds = 0;
    //ここからソートのプログラム
    var my_object = new Array();
    var my_title_object = new Array();
    var my_day = new Array();

    for (var feed_num = 0; feed_num < my_urls.length; feed_num++) {
        var url = my_urls[feed_num];
        var html_author = "";
        html_author += '<br>';

        //キャッシュ対策
        var d = new Date();
        var q = d.getMonth()+""+d.getDate()+""+d.getHours();
        var path = new Array(url + "?" + q); //フィードURL+キャッシュ対策

        //var html =""; //表示用HTMLの準備

        var feed = new google.feeds.Feed(path);
        feed.setNumEntries(num);
        feed.load(function(result){
            if (!result.error) {
                for (var i = 0; i < result.feed.entries.length; i++) {
                    var entry = result.feed.entries[i];
                    var title = entry.title; //タイトル取得
                    var link = entry.link; //URL取得
                    var day = new Date(entry.publishedDate); //日付取得
                    var author = result.feed.author;
                    //日付の整理
                    var y = day.getYear();
                    if (y < 2000) y += 1900;
                    var m = day.getMonth() + 1;
                    if (m < 10) {m = "0" + m;}
                    var d = day.getDate();
                    if (d < 10) {d = "0" + d;}
                    var date = y + "."+ m +"."+ d;

                    //ソートする要素を格納
                    all_feeds += 1;

                    //my_object[i] = date + '<p><a href="' + link + '">' + title + '</a></p>';
                    if(btn_num == 1){
                        my_object[date + " " + title] = date + " [ " + author + " ] " + '<p><a href="' + link + '">' + title + '</a></p>';
                        my_day[date + " " + title] = date;
                        my_title_object.push(date + " " + title);
                    }else{
                        html_author += date + " [ " + author + " ] " + '<p><a href="' + link + '">' + title + '</a></p>';
                    }
                }
            }else{
                alert(result.error.code + ":" + result.error.message);
            }

            var day_display = 0;
            var html_new =""; //表示用HTMLの準備
            if(btn_num == 1){
                my_title_object = my_title_object.sort();
                my_title_object = my_title_object.reverse();

                for(var i = 0; i < my_title_object.length; i++) {
                    if(day_display != my_day[my_title_object[i]]){
                        day_display = my_day[my_title_object[i]];
                        html_new += '<br>';
                    }

                    html_new += my_object[my_title_object[i]];

                }
                html_new += '<br>';
                content.innerHTML = html_new; //指定したID内に出力
            }else{
                html_author += '<br>';
                content.innerHTML = html_author;
            }
        });
    }
}
google.setOnLoadCallback(initialize);