(function () {
  var greetingEl = document.getElementById("time-greeting");
  if (!greetingEl) return;

  function getIndiaTime() {
    var now = new Date();

    var time = now
      .toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase()
      .replace(/\s+/g, "");

    var hour = Number(
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        hourCycle: "h23",
      }).format(now)
    );

    var period = "evening";
    if (hour >= 5 && hour < 12) {
      period = "morning";
    } else if (hour >= 12 && hour < 18) {
      period = "afternoon";
    }

    return { time: time, period: period };
  }

  function updateGreeting() {
    var parts = getIndiaTime();
    greetingEl.textContent = "It's " + parts.time + " IST. Good " + parts.period + ".";
  }

  updateGreeting();
  setInterval(updateGreeting, 1000);
})();
