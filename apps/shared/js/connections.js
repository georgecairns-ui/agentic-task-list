/*
  CONNECTIONS: which of the person's apps Claude can reach, shared by every tool (shared version 14)
  ------------------------------------------------------------------------------------------------
  The file is apps/home/data/connections.json. Claude writes it in setup and refreshes it on every
  check-in; the app only reads it. "connected" means Claude actually read from that app on the
  date in "checked", so a green tick can be trusted. "waiting" means it is parked until someone else
  acts (an IT administrator approving it, a password reset), named in "waitingOn". Rules only: no screen code in here.
*/
(function () {
  "use strict";

  const TL = window.TaskListOS = window.TaskListOS || {};
  const FILE = "apps/home/data/connections.json";
  const API = "/api/data/home/connections.json";

  const STATUS = {
    "needs-attention": { label: "Needs attention", chip: "chip--warning", rank: 0 },
    "waiting": { label: "Waiting", chip: "chip--warning", rank: 1 },
    "connected": { label: "Connected", chip: "chip--success", rank: 2 },
    "export-only": { label: "Export only", chip: "chip--info", rank: 3 },
    "no-connector": { label: "Not supported yet", chip: "chip--outline", rank: 4 },
    "not-connected": { label: "Not connected", chip: "", rank: 5 },
    "not-used": { label: "Not used", chip: "chip--outline", rank: 6 }
  };

  function isObject(x) { return !!x && typeof x === "object" && !Array.isArray(x); }

  // Throws (with a plain reason) if the file isn't in the shape the app reads
  function validate(d) {
    if (!isObject(d)) throw new Error("The connections file isn't a list of apps");
    if (!isObject(d.connections)) throw new Error("connections must be an object keyed by app id");
    Object.keys(d.connections).forEach(function (id) {
      const c = d.connections[id];
      if (!isObject(c) || !STATUS[c.status]) throw new Error("connections." + id + " has an unknown status");
      if (c.status === "connected" && !/^\d{4}-\d{2}-\d{2}/.test(String(c.checked || ""))) {
        throw new Error("connections." + id + " is connected but has no date it was last checked");
      }
    });
    return d;
  }

  function nameOf(id, c) {
    if (c.name) return String(c.name);
    const words = id.replace(/-/g, " ");
    return words.charAt(0).toUpperCase() + words.slice(1);
  }

  // Needs attention first, then connected, then the rest; by name within each
  function list(d) {
    return Object.keys(d.connections).map(function (id) {
      const c = d.connections[id];
      return { id: id, name: nameOf(id, c), status: c.status, how: c.how || "", checked: c.checked || "", note: c.note || "", waitingOn: c.waitingOn || "" };
    }).sort(function (a, b) { return STATUS[a.status].rank - STATUS[b.status].rank || a.name.localeCompare(b.name); });
  }

  // The words on a row's chip: "Waiting on IT" when we know who it's waiting on
  function label(x) {
    if (x.status === "waiting") return "Waiting on " + (x.waitingOn ? String(x.waitingOn) : "someone else");
    return STATUS[x.status].label;
  }

  // "N of M connected" counts only apps Claude reads live, that need fixing or that are waiting to be finished:
  // export-only, no-connector, not-connected and not-used rows are still listed in the box, but never show as a permanent gap
  function counts(d) {
    let connected = 0, attention = 0, waiting = 0, total = 0;
    list(d).forEach(function (x) {
      if (x.status !== "connected" && x.status !== "needs-attention" && x.status !== "waiting") return;
      total++;
      if (x.status === "connected") connected++;
      if (x.status === "needs-attention") attention++;
      if (x.status === "waiting") waiting++;
    });
    return { connected: connected, attention: attention, waiting: waiting, total: total };
  }

  function fixPrompt(name) {
    return "My " + name + " connection needs attention. Follow .claude/skills/connect-a-tool to fix it, then update " + FILE + ".";
  }
  function finishPrompt(name) {
    return "I'm ready to finish connecting " + name + ". Follow .claude/skills/connect-a-tool to connect it and prove it, read what setup would have read from it, then update " + FILE + ".";
  }

  // Rows where a call can help join up something Claude can't reach live yet
  function canBookCall(x) { return x.status === "no-connector" || x.status === "export-only"; }

  // The catalogue's booking link, tagged so Get AI Powers can see the call came from this button
  function bookingUrl(url, toolId) {
    if (!url) return null;
    return url + (url.indexOf("?") === -1 ? "?" : "&") + "utm_source=" + encodeURIComponent(toolId || "app") + "&utm_medium=app&utm_campaign=join-it-up";
  }

  TL.connections = { FILE: FILE, API: API, STATUS: STATUS, validate: validate, list: list, label: label, counts: counts,
    fixPrompt: fixPrompt, finishPrompt: finishPrompt, canBookCall: canBookCall, bookingUrl: bookingUrl };
})();
