var radioStatus = new Object();

function uncheck(obj)
{
  if (radioStatus[obj.name]==null)
  {
    radioStatus[obj.name] = obj.value;
  }
  else
  {
    if (radioStatus[obj.name] == obj.value)
    {
      obj.checked = false;
      radioStatus[obj.name] = null;
    }
    else
    {
      radioStatus[obj.name] = obj.value;
    }
  }
}

function handleKey(e)
{
  if (e.keyCode == 13) return false;
  else if (e.ctrlKey)
  {
    switch(e.keyCode)
    {
      case 65:   /* C-a */
      case 67:   /* C-c */
      case 70:   /* C-f */
      case 80:   /* C-p */
      case 85:   /* C-u */
      case 88:   /* C-x */
          return false;
    }
  }
  return true;
}


function clickHandler(e) {
  if (e.button > 1) return false;
  if (e.target) targ = e.target;
  else if (e.srcElement) targ = e.srcElement;
  if (targ.nodeType == 3) // defeat Safari bug
    targ = targ.parentNode;
  if (targ.tagName == "INPUT") return true;
  return false;
}
      var maxTime = 25 * 60; // 25 minut w sekundach
      var startTime = -1;
      var informed = false
      function updateClock()
      {
        var time = new Date()
        var hours = time.getHours()
        var minutes = time.getMinutes()
        var seconds = time.getSeconds()
        if (startTime == -1)
        {
          startTime = (hours * 60 + minutes) * 60 + seconds
        }
        var currTime = (hours * 60 + minutes) * 60 + seconds
        var proc = (currTime - startTime) * 50 / 60 / maxTime
        proc = Math.min(proc, 50)
        remainingTime = Math.max(0, (maxTime) - (currTime - startTime))

        var t = document.getElementById("zegarek").firstChild
        minutes=((minutes < 10) ? "0" : "") + minutes
        seconds=((seconds < 10) ? "0" : "") + seconds
        rMin = Math.floor(remainingTime / 60)
        rSec = remainingTime % 60
        rSec=((rSec < 10) ? "0" : "") + rSec
        t.nodeValue = rMin + ":" + rSec + " min"
        if (!informed && remainingTime <= 60)
        {
          //alert("Pozostała ci jeszcze 1 minuta do końca testu.")
          informed = true
		}
	if (remainingTime <= 0)
	{
		startTime = -1
		t.nodeValue = "KONIEC!!!"
	}
        if (remainingTime > 0) setTimeout("updateClock()", 1000);
      }

document.addEventListener("DOMContentLoaded", function() {
  updateClock();
});
