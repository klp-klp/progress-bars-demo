$(function() {
    //button1 click ie. -25
    $('#btn1').click(function () {
        bindProgressIndicator(-25);
    });

    //button2 click ie. -10
    $('#btn2').click(function () {
        bindProgressIndicator(-10);
    });

    //button3 click ie. 10
    $('#btn3').click(function () {
        bindProgressIndicator(10);
    });

    //button4 click ie. 35
    $('#btn4').click(function () {
        bindProgressIndicator(25);
    });
});

function bindProgressIndicator(incrementalValue){
    var progressBar=$( ".progress-changer").val();
    var progressBarId='#progress-bar'+progressBar;

    //get the html value of overlay of the current progressbar
    var previousValue=$('.overlay', progressBarId).html();

    var val=0;

    //if the progress bar is empty

    if(previousValue==""){
        val = incrementalValue;
    }
    else{
        //as the value contains %  as well, remove the % symbol from the progres bar overlay value
        previousValue=previousValue.substring(0,previousValue.length - 1);
        //convert the string into integer
        val = incrementalValue +parseInt(previousValue);
    }

    //progress bar does not go beyond 0
    if(val<0){
        val=0;
    }

    //change the color of the progress bar to red when the value is more than 100
    if(val>100){
        $(progressBarId).css("background-color","red");
    }
    else{
        $(progressBarId).css("background-color","#337ab7");
    }

    //add % at the end of the value
    val=val+ '%';
    //set the value to the progress bar width
    $(progressBarId).width(val);
    //assign the value to the progress bar overlay
    $('.overlay', progressBarId).text(val);

}

function bindProgressIndicatorWithNumber(incrementalValue, $this){
    //get the html value of overlay of the current progressbar
    var previousValue=$('.overlay', $this).html();

    var val=0;

    //if the progress bar is empty

    if(previousValue==""){
        val = incrementalValue;
    }
    else{
        //as the value contains %  as well, remove the % symbol from the progres bar overlay value
        previousValue=previousValue.substring(0,previousValue.length - 1);
        //convert the string into integer
        val = incrementalValue +parseInt(previousValue);
    }

    //progress bar does not go beyond 0
    if(val<0){
        val=0;
    }

    //change the color of the progress bar to red when the value is more than 100
    if(val>100){
        $($this).css("background-color","red");
    }
    else{
        $($this).css("background-color","#337ab7");
    }

    //add % at the end of the value
    val=val+ '%';
    //set the value to the progress bar width
    $($this).width(val);
    //assign the value to the progress bar overlay
    $('.overlay', $this).text(val);
}