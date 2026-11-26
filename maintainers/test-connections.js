/*
  Checks apps/shared/js/connections.js, the shared rules for apps/home/data/connections.json (shared version 14).
  Run: node maintainers/test-connections.js        Exits 1 if any check fails.
*/
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const sandbox = { window: {}, console: console };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "apps", "shared", "js", "connections.js"), "utf8"), sandbox);
const C = sandbox.window.TaskListOS.connections;

let passed = 0;
function check(name, fn) {
  try { fn(); passed += 1; } catch (e) { console.error("FAILED: " + name + "\n  " + e.message); process.exitCode = 1; }
}
const file = function (connections) { return { version: 1, connections: connections }; };

check("an empty file is valid", function () { assert.ok(C.validate(file({}))); });
check("the 7 statuses are the only ones", function () {
  assert.deepStrictEqual(Object.keys(C.STATUS).sort(), ["connected", "export-only", "needs-attention", "no-connector", "not-connected", "not-used", "waiting"]);
});
check("an unknown status is refused", function () {
  assert.throws(function () { C.validate(file({ gmail: { name: "Gmail", status: "maybe" } })); }, /unknown status/);
});
check("connected without a checked date is refused", function () {
  assert.throws(function () { C.validate(file({ gmail: { name: "Gmail", status: "connected", checked: "" } })); }, /no date/);
});
check("connected with a checked date is fine", function () {
  assert.ok(C.validate(file({ gmail: { name: "Gmail", status: "connected", checked: "2026-10-28" } })));
});
check("a file without connections is refused", function () {
  assert.throws(function () { C.validate({ version: 1 }); }, /connections/);
});
check("list puts needs-attention first, then waiting, then connected, then the rest, and uses the name", function () {
  const d = file({
    xero: { name: "Xero", status: "connected", checked: "2026-10-28" },
    sage: { name: "Sage", status: "export-only" },
    hubspot: { name: "HubSpot", status: "needs-attention" },
    "microsoft-365": { name: "Microsoft 365", status: "waiting", waitingOn: "IT" }
  });
  assert.deepStrictEqual(JSON.parse(JSON.stringify(C.list(d).map(function (x) { return x.name; }))), ["HubSpot", "Microsoft 365", "Xero", "Sage"]);
});
check("a waiting row says who it is waiting on", function () {
  const rows = C.list(file({ "microsoft-365": { name: "Microsoft 365", status: "waiting", waitingOn: "IT" }, x: { name: "X", status: "waiting" } }));
  assert.strictEqual(C.label(rows[0]), "Waiting on IT");
  assert.strictEqual(C.label(rows[1]), "Waiting on someone else");
});
check("a waiting row needs no checked date", function () {
  assert.ok(C.validate(file({ "microsoft-365": { name: "Microsoft 365", status: "waiting", waitingOn: "IT" } })));
});
check("no-connector reads Not supported yet", function () {
  assert.strictEqual(C.label({ status: "no-connector" }), "Not supported yet");
});
check("an entry with no name gets one from its key", function () {
  assert.strictEqual(C.list(file({ "my-booking-system": { status: "no-connector" } }))[0].name, "My booking system");
});
check("counts include only connected, needs-attention and waiting", function () {
  const d = file({
    a: { name: "A", status: "connected", checked: "2026-10-28" },
    b: { name: "B", status: "needs-attention" },
    c: { name: "C", status: "not-used" },
    d: { name: "D", status: "export-only" },
    e: { name: "E", status: "no-connector" },
    f: { name: "F", status: "not-connected" },
    g: { name: "G", status: "waiting", waitingOn: "IT" }
  });
  assert.deepStrictEqual(JSON.parse(JSON.stringify(C.counts(d))), { connected: 1, attention: 1, waiting: 1, total: 3 });
});
check("the fix prompt names the app, the skill and the file", function () {
  const p = C.fixPrompt("Xero");
  assert.ok(/Xero/.test(p) && /connect-a-tool/.test(p) && /apps\/home\/data\/connections\.json/.test(p));
});

check("the finish prompt names the app, the skill and the file", function () {
  const p = C.finishPrompt("Microsoft 365");
  assert.ok(/Microsoft 365/.test(p) && /connect-a-tool/.test(p) && /apps\/home\/data\/connections\.json/.test(p));
});
check("a call can be booked only for apps Claude can't reach live", function () {
  assert.ok(C.canBookCall({ status: "no-connector" }) && C.canBookCall({ status: "export-only" }));
  assert.ok(!C.canBookCall({ status: "connected" }) && !C.canBookCall({ status: "waiting" }) && !C.canBookCall({ status: "not-used" }));
});
check("the booking link carries the tool and the button in its tags", function () {
  assert.strictEqual(C.bookingUrl("https://calendly.com/x/y", "task-list"), "https://calendly.com/x/y?utm_source=task-list&utm_medium=app&utm_campaign=join-it-up");
  assert.strictEqual(C.bookingUrl("https://calendly.com/x/y?a=1", "pipeline"), "https://calendly.com/x/y?a=1&utm_source=pipeline&utm_medium=app&utm_campaign=join-it-up");
  assert.strictEqual(C.bookingUrl("", "task-list"), null);
});

console.log(passed + " connections checks passed");
