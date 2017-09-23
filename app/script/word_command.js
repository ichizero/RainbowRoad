function wordMatch(str) {
    var string = str;
    console.log("loadwordmatch");
    var birthday = "誕生日";
    if(string.indexOf(birthday) > -1){
        console.log("OKKKK");
        happyBirthday();
    }
}

function happyBirthday() {
    createFirework(52,69,7,6,null,null,null,null,false,true);
}