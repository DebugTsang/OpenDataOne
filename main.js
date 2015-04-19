/**
 * Created by Calvin Tsang on 19/4/15.
 * 香港政府通知你: 訊息詳情
 */
var http = require('http');
var _ = require('underscore');
var listUrl = 'http://ogcmn.one.gov.hk/ogcmn/service/list/catwc/OGCMN*?lang=tc&max=10';
var detailUrl = 'http://ogcmn.one.gov.hk/ogcmn/service/noti/detail/';

http.get(listUrl, function(res) {
    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('end', function() {
        var response;
        try {
           response = JSON.parse(body);

        }catch (exception){

           // Remove "NotifList();"

           body = body.replace("NotiList(", "");
           body = body.substring(0, body.length - 2);

           response = JSON.parse(body);

        }finally {
           console.log("List response: ", response);
        }

        var notifications = response.notifications; // array

        // Test all component complete
        // id: number, subject: string, schedule_ts: number, exp_ts: number, source_id: string

        for (var i = 0; i < notifications.length; i++) {
            var isPassed = checkListKey(notifications[i]);
            if (!isPassed) {
                console.log("some key is missing");
            }
        }

        for (var i = 0; i < notifications.length; i++){

            var completeDetailUrl = detailUrl + notifications[i].id;

            //console.log(i + "=" +completeDetailUrl);

            loadDetailUrl(notifications[i].id, completeDetailUrl);

        }
    });
}).on('error', function(e) {
    console.log("Got error: ", e);
});

var loadDetailUrl = function(id, url){

    http.get(url, function(res) {
        var body = '';

        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {
            var response;
            try {
                response = JSON.parse(body);

            } catch (exception) {

                // Remove "NotifList();"

                body = body.replace("NotiDetail(", "");
                body = body.substring(0, body.length - 2);

                response = JSON.parse(body);

            } finally {
                //console.log("id=" + id + ", subject: ", response.subject_tc + "\n" + response.msg_tc);
                //console.log("response=" + JSON.stringify(response));

                var isPassed = checkDetailKey(response);

                if (!isPassed) {
                    console.log("some key is missing in DETAIL");
                }

            }
        });
    }).on('error', function(e) {
        console.log("Got error: ", e);
    });
};

var checkListKey = function(element){

    var error = false;

    if (!element.hasOwnProperty("id")){
        console.log("check list key error: NO KEY 'id' is found");
        error = true;
    }

    if (!element.hasOwnProperty("subject")){
        console.log("check list key error: NO KEY 'subject' is found");
        error = true;

    }
    if (!element.hasOwnProperty("schedule_ts")){
        console.log("check list key error: NO KEY 'schedule_ts' is found");
        error = true;

    }
    if (!element.hasOwnProperty("exp_ts")){
        console.log("check list key error: NO KEY 'exp_ts' is found");
        error = true;

    }
    if (!element.hasOwnProperty("source_id")){
        console.log("check list key error: NO KEY 'source_id' is found");
        error = true;

    }

    if (!error){
        //console.log(element.id + ", check list key - OK!");

    }

    return !error;
}

var checkDetailKey = function(element){

    var error = false;

    if (!element.hasOwnProperty("id")){
        console.log("check detail key error: NO KEY 'id' is found");
        error = true;
    }

    if (!element.hasOwnProperty("subject_en")){
        console.log("check detail key error: NO KEY 'subject_en' is found");
        error = true;
    }

    if (!element.hasOwnProperty("subject_sc")){
        console.log("check detail key error: NO KEY 'subject_sc' is found");
        error = true;
    }

    if (!element.hasOwnProperty("subject_tc")){
        console.log("check detail key error: NO KEY 'subject_tc' is found");
        error = true;
    }

    if (!element.hasOwnProperty("msg_en")){
        console.log("check detail key error: NO KEY 'msg_en' is found");
        error = true;

        if (!element.hasOwnProperty("type")){
            console.log("check detail key error: NO KEY 'type' is found");
            error = true;
        }


        if (!element.hasOwnProperty("body")){
            console.log("check detail key error: NO KEY 'body' is found");
            error = true;
        }else{

            var bodyObject = element.body;

            if (!bodyObject.hasOwnProperty("type")){
                console.log("check detail-body key error: NO KEY 'type' is found");
                error = true;
            }

            if (!bodyObject.hasOwnProperty("val")){
                console.log("check detail-body key error: NO KEY 'val' is found");
                error = true;
            }

            if (!bodyObject.hasOwnProperty("alt")){
                console.log("check detail-body key error: NO KEY 'alt' is found");
                error = true;
            }

        }
    }

    if (!element.hasOwnProperty("msg_sc")){
        console.log("check detail key error: NO KEY 'msg_sc' is found");
        error = true;

        if (!element.hasOwnProperty("type")){
            console.log("check detail key error: NO KEY 'type' is found");
            error = true;
        }


        if (!element.hasOwnProperty("body")){
            console.log("check detail key error: NO KEY 'body' is found");
            error = true;
        }else{

            var bodyObject = element.body;

            if (!bodyObject.hasOwnProperty("type")){
                console.log("check detail-body key error: NO KEY 'type' is found");
                error = true;
            }

            if (!bodyObject.hasOwnProperty("val")){
                console.log("check detail-body key error: NO KEY 'val' is found");
                error = true;
            }

            if (!bodyObject.hasOwnProperty("alt")){
                console.log("check detail-body key error: NO KEY 'alt' is found");
                error = true;
            }

        }
    }

    if (!element.hasOwnProperty("msg_tc")){
        console.log("check detail key error: NO KEY 'msg_tc' is found");
        error = true;

        if (!element.hasOwnProperty("type")){
            console.log("check detail key error: NO KEY 'type' is found");
            error = true;
        }


        if (!element.hasOwnProperty("body")){
            console.log("check detail key error: NO KEY 'body' is found");
            error = true;
        }else{

            var bodyObject = element.body;

            if (!bodyObject.hasOwnProperty("type")){
                console.log("check detail-body key error: NO KEY 'type' is found");
                error = true;
            }

            if (!bodyObject.hasOwnProperty("val")){
                console.log("check detail-body key error: NO KEY 'val' is found");
                error = true;
            }

            if (!bodyObject.hasOwnProperty("alt")){
                console.log("check detail-body key error: NO KEY 'alt' is found");
                error = true;
            }

        }
    }



    if (!error){
        //console.log(element.id + ", check detail key - OK!");
    }

    return !error;
}