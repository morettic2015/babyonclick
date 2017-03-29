/*
 *   @Morettic
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        //On device ready start
        this.receivedEvent('deviceready');
        //Load events
        $.ajax({
            url: "https://morettic.com.br/babyonclick.php",
            dataType: "jsonp"
        });


        // Set AdMobAds options:
        admob.setOptions({
            bannerAtTop: false, // set to true, to put banner at top
            overlap: true,
            publisherId: "ca-app-pub-5450650045028162/7803935893",
            tappxIdAndroid: "/120940746/Pub-15856-Android-9157",
            tappxShare: 0.3
        });
        admob.createBannerView({
            autoShowBanner: true
        });

        //admob.requestInterstitialAd();
        var notificationOpenedCallback = function (jsonData) {
            console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };

        window.plugins.OneSignal
            .startInit("50f59e82-b395-477c-ace8-46242314afc8")
            .handleNotificationOpened(notificationOpenedCallback)
            .endInit();

        // Call syncHashedEmail anywhere in your app if you have the user's email.
        // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
        // window.plugins.OneSignal.syncHashedEmail(userEmail);
        //
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
         console.log('Received Event: ' + id);
    }
};

var tips = [];
function bbclick(json) {
    console.log(json);
    tips = json;
    for (i = 0; i < json.length; i++) {
        $('#newsCombo').append("<li ><a id=\"" + i + "\" href=\"#popupDialog\" onclick=update(this.id)>" + json[i].title.rendered + "</a></li>");
    }
    $("#newsCombo").listview("refresh");
}

function hidePop() {
    document.getElementById('popupDialog').style.display = 'none';
}

var bannerCont = 0;
function update(id) {
    document.getElementById('popupDialog').style.display = 'block';
    document.getElementById('newsTitle').innerHTML = tips[id].title.rendered;
    document.getElementById('newsContent').innerHTML = tips[id].excerpt.rendered;
    document.getElementById('newsContent').innerHTML += "<br> Date:" + tips[id].date;
    document.getElementById('newsFull').innerHTML = tips[id].content.rendered;
    //Show only two banners timeout 7 seconds
    if (bannerCont < 2) {
        setTimeout(function () {
            bannerCont++;
            admob.requestInterstitialAd({
                autoShowInterstitial: true
            });
        }, 7000);
    }
}
app.initialize();