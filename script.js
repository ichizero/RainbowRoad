let localStream = null;
let peer = null;
let existingCall = null;

let appID = "c1d570f3";
let appKey = "7f0d74dccfff03ac423c6f6c4fb3659f";

navigator.mediaDevices.getUserMedia({video: true, audio: true})
    .then(function (stream) {
        // Success
        $('#my-video').get(0).srcObject = stream;
        localStream = stream;
    }).catch(function (error) {
        // Error
        console.error('mediaDevice.getUserMedia() error:', error);
        return;
    });

peer = new Peer({
    key: '3aa55735-2b38-4905-9d7a-5818bf6fe731',
    debug: 3
});

peer.on('open', function(){
    $('#my-id').text(peer.id);
});

peer.on('error', function(err){
    alert(err.message);
});

peer.on('close', function(){
});

peer.on('disconnected', function(){
});

$('#make-call').submit(function(e){
    e.preventDefault();
    const call = peer.call($('#callto-id').val(), localStream);
    setupCallEventHandlers(call);
});

$('#end-call').click(function(){
    existingCall.close();
});

peer.on('call', function(call){
    call.answer(localStream);
    setupCallEventHandlers(call);
});

function setupCallEventHandlers(call){
    if (existingCall) {
        existingCall.close();
    };

    existingCall = call;

    
    call.on('stream', function(stream){
        addVideo(call,stream);
        setupEndCallUI();
        $('#their-id').text(call.remoteId);
    });

    
    call.on('close', function(){
        removeVideo(call.remoteId);
        setupMakeCallUI();
    });
}

function addVideo(call,stream){
    $('#their-video').get(0).srcObject = stream;
}

function removeVideo(peerId){
    $('#'+peerId).remove();
}

function setupMakeCallUI(){
    $('#make-call').show();
    $('#end-call').hide();
}

function setupEndCallUI() {
    $('#make-call').hide();
    $('#end-call').show();
}

function getSnapShot() {
    // スナップショット
    var context = $('#canv').get(0).getContext('2d');
    context.drawImage($('#my-video').get(0), 0, 0, $('#my-video').width(), $('#my-video').height());
    var snapshot = $('#canv').get(0).toDataURL('image/png');
    document.querySelector('img').src = snapshot;


    snapshot = String(snapshot);
    snapshot = snapshot.replace("data:image/png;base64,", "");

    // Kairos API
    var kairos = new Kairos("c1d570f3", "7f0d74dccfff03ac423c6f6c4fb3659f");


    var options = { "selector" : "FULL"};

    kairos.detect(snapshot, myDetectCallback, options);
       
        

}

function myDetectCallback(response){

    console.info(response.responseText);
    var kairosJSON = JSON.parse(response.responseText);
    
          if(!kairosJSON.images[0].faces[0]){
            console.log('no images in face response');
            return;
          }

          console.info(kairosJSON.images[0].faces[0].attributes.age);


}