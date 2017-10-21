var fstorage  = fireApp.storage();
var fdb       = fireApp.database();
var ref_reserves = fdb.ref().child("reserves");

//READ data
ref_reserves.on('value', function (snapshot) {
    var data = (snapshot.val());
    console.log("reserves=!!!");
    console.log(data);
});



function writeNewPost(uid, username, picture, title, body) {
    // A post entry.
    var postData = {
        author: username,
        uid: uid,
        body: body,
        title: title,
        starCount: 0,
        authorPic: picture
    };

    // Get a key for a new Post.
    var newPostKey = fdb.ref().child('reserves').push().key;
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
}


function updatedata(id){
    var dataa = fdb.ref().child(id);
        console.log(dataa);
}

writeNewPost("123","asdf","pic","title","body");

updatedata("-KwzFpT__YikJoIH11-d");