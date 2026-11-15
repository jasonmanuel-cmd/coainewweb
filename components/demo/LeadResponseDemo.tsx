"use client";

import Link from "next/link";
import { useState } from "react";
import "./lead-response-demo.css";

export function LeadResponseDemo() {
  const [stage, setStage] = useState(0);
  const [service, setService] = useState("Fence repair");
  const [zip, setZip] = useState("93312");
  const [timing, setTiming] = useState("This week");
  const needsReview = zip === "Outside this example service area";

  function reset() {
    setStage(0);
    setService("Fence repair");
    setZip("93312");
    setTiming("This week");
  }

  return (
    <div className="lead-demo">
      <p className="lead-demo__notice">
        Interactive example with sample data. No calls, texts, emails, or booking requests are sent.
        A client installation needs its own connected accounts, approved messages, and delivery tests.
      </p>
      <ol className="lead-demo__steps" aria-label="Example lead stages">
        {["Capture the inquiry", "Show the reply", "Collect the job details", "Hand off to the owner"].map((label, index) => (
          <li key={label} aria-current={stage === index ? "step" : undefined}>
            <span>{String(index + 1).padStart(2, "0")}</span> {label}
          </li>
        ))}
      </ol>
      <div className="lead-demo__grid">
        <section className="lead-demo__panel" aria-labelledby="demo-customer-heading">
          <p className="lead-demo__label">Customer side · example</p>
          <h2 id="demo-customer-heading">You are on a job. A new customer calls.</h2>
          <p>Walk through what the next step could look like when you cannot answer.</p>
          {stage === 0 ? (
            <button className="m-btn-primary" type="button" onClick={() => setStage(1)}>Simulate a missed call</button>
          ) : (
            <div role="status" className="lead-demo__message">
              <strong>Example acknowledgement</strong>
              <p>Thanks for calling Example Home Services. What service do you need, and which ZIP code is the job in?</p>
              <small>Message preview only · not sent</small>
            </div>
          )}
          {stage === 1 ? (
            <button className="m-btn-primary" type="button" onClick={() => setStage(2)}>Add the job details</button>
          ) : null}
          {stage === 2 ? (
            <form onSubmit={(event) => { event.preventDefault(); setStage(3); }} className="lead-demo__form">
              <label htmlFor="demo-service">Service requested</label>
              <select id="demo-service" value={service} onChange={(event) => setService(event.target.value)}>
                <option>Fence repair</option><option>Plumbing repair</option><option>HVAC service</option><option>Electrical estimate</option>
              </select>
              <label htmlFor="demo-zip">Job ZIP code</label>
              <select id="demo-zip" value={zip} onChange={(event) => setZip(event.target.value)}>
                <option>93312</option><option>93314</option><option>93301</option><option>Outside this example service area</option>
              </select>
              <label htmlFor="demo-timing">Preferred timing</label>
              <select id="demo-timing" value={timing} onChange={(event) => setTiming(event.target.value)}>
                <option>This week</option><option>Next week</option><option>Planning ahead</option>
              </select>
              <button className="m-btn-primary" type="submit">Preview the owner handoff</button>
            </form>
          ) : null}
        </section>
        <section className="lead-demo__panel" aria-labelledby="demo-owner-heading">
          <p className="lead-demo__label">Owner side · example</p>
          <h2 id="demo-owner-heading">One lead. One clear next action.</h2>
          {stage < 3 ? (
            <p className="lead-demo__empty">The owner handoff appears after the sample job details are collected.</p>
          ) : (
            <div role="status" className="lead-demo__handoff">
              <h3>{needsReview ? "Needs service-area review" : "Ready for an owner callback"}</h3>
              <dl>
                <div><dt>Customer</dt><dd>Demo Homeowner · fictional</dd></div>
                <div><dt>Source</dt><dd>Simulated missed call</dd></div>
                <div><dt>Service</dt><dd>{service}</dd></div>
                <div><dt>Job area</dt><dd>{zip}</dd></div>
                <div><dt>Timing</dt><dd>{timing}</dd></div>
                <div><dt>Next action</dt><dd>{needsReview ? "Confirm the job is in your service area before offering an estimate." : "Call the customer to confirm scope and arrange an estimate."}</dd></div>
              </dl>
              <p>No appointment has been booked. An owner confirms the scope and availability.</p>
            </div>
          )}
          <p>Your real workflow is scoped around your service area, availability, and existing tools.</p>
          <div className="lead-demo__actions">
            <Link className="m-btn-primary" href="/intake?pkg=2">Discuss this for my business</Link>
            {stage > 0 ? <button className="m-btn-ghost" type="button" onClick={reset}>Start again</button> : null}
          </div>
        </section>
      </div>
    </div>
  );
}
