/*
  CONNECTIONS ON HOME (shared version 14)
  ---------------------------------------
  Loaded by apps/home/home.js after apps/shared/js/connections.js, in every tool except the Small
  Business Toolkit (its own Connections box reads the same file). Shows how many apps Claude can
  reach and lists them, needing attention first, each with a Fix it link that opens Claude here. A row
  parked while someone else acts ("Waiting on IT") gets a Finish connecting link, and an app Claude
  can't reach live gets a Book a call link (the catalogue's booking link).
*/
(function () {
  "use strict";

  const C = window.TaskListOS.connections;
  const ui = window.TaskListOS.ui, esc = ui.esc;
  let data = null;
  let folder = null;
  let problem = "";
  let booking = null;

  function empty(text) { return '<p class="hbox__empty">' + esc(text) + "</p>"; }
  function claudeLink(prompt) {
    return folder ? "claude://code/new?q=" + encodeURIComponent(prompt) + "&folder=" + encodeURIComponent(folder) : null;
  }
  function action(x) {
    if (x.status === "needs-attention") {
      const fix = claudeLink(C.fixPrompt(x.name));
      return fix ? '<a class="btn btn--sm btn--primary" href="' + esc(fix) + '">Fix it</a>' : "";
    }
    if (x.status === "waiting") {
      const finish = claudeLink(C.finishPrompt(x.name));
      return finish ? '<a class="btn btn--sm btn--primary" href="' + esc(finish) + '">Finish connecting</a>' : "";
    }
    if (booking && C.canBookCall(x)) {
      return '<a class="btn btn--sm" href="' + esc(booking) + '" target="_blank" rel="noopener" title="Want this joined up with something you already use? Book a call with Joey or George">Book a call</a>';
    }
    return "";
  }
  function row(x) {
    const s = C.STATUS[x.status];
    const act = action(x);
    return '<li class="hrow"><span class="hrow__main"><span class="hrow__title">' + esc(x.name) + "</span>" +
      '<span class="hrow__sub"><span class="chip ' + s.chip + '">' + esc(C.label(x)) + "</span></span></span>" +
      (act ? '<span class="hrow__actions">' + act + "</span>" : "") + "</li>";
  }

  function box() {
    if (problem) return empty(problem);
    if (!data) return empty("Claude fills this in when it connects your apps during setup.");
    const n = C.counts(data);
    const shown = C.list(data).filter(function (x) { return x.status !== "not-used"; });
    if (!shown.length) return empty("Claude fills this in when it connects your apps during setup.");
    // The count covers only live connections and ones to fix; export-only and the rest are still listed below it
    const stat = n.total ? '<p class="hstat"><span class="hstat__num">' + n.connected + " of " + n.total + '</span><span class="hstat__label">connected</span></p>' : "";
    return stat + '<ul class="hlist" role="list">' + shown.slice(0, 5).map(row).join("") + "</ul>" +
      (shown.length > 5 ? '<p class="hbox__more">' + esc("and " + (shown.length - 5) + " more") + "</p>" : "");
  }

  window.TaskListOS.home.register("connections", {
    boxes: [{ id: "status", title: "Connections", icon: "external", size: 1, defaultOn: true, render: box }],
    start: function (ctx) {
      const def = this;
      fetch("/api/info", { cache: "no-store" }).then(function (r) { return r.ok ? r.json() : {}; })
        .then(function (info) { folder = info.folder || null; ctx.refresh(); }).catch(function () { folder = null; });
      // The booking link and this tool's id, for the Book a call link's tags
      Promise.all([
        fetch("../shared/catalogue.json", { cache: "no-store" }).then(function (r) { return r.ok ? r.json() : {}; }),
        fetch("../installed.json", { cache: "no-store" }).then(function (r) { return r.ok ? r.json() : {}; })
      ]).then(function (got) {
        const b = got[0] && got[0].booking;
        const tools = got[1] && Array.isArray(got[1].tools) ? got[1].tools : [];
        booking = b && b.url ? C.bookingUrl(b.url, tools.length ? tools[0].id : "") : null;
        ctx.refresh();
      }).catch(function () { booking = null; });
      window.TaskListOS.createStore({
        moduleId: "connections",
        fileName: "connections.json",
        dataPaths: ["data", "", "apps/home/data"],
        api: C.API,
        validate: C.validate,
        onStatus: function (s, detail) {
          if (s !== "error") return;
          const kind = detail && detail.error && detail.error.kind;
          // No file yet just means setup hasn't connected anything
          problem = kind === "missing" ? "" : kind === "bad-file" ? "Your connections file has a small mistake in it. Ask Claude to check it." : "Your connections couldn't be read just now. Reload the page to try again.";
          def.ready = true;
          ctx.refresh();
        },
        onData: function (d) { data = d; problem = ""; def.ready = true; ctx.refresh(); }
      }).start();
    }
  });
})();
